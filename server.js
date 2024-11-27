import express from 'express';
import { main as startBot } from './index.js';
import { stopBot } from './src/services/telegramService.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let botRunning = false;

app.post('/start-bot', async (req, res) => {
    if (botRunning) {
        return res.status(400).send('Bot is already running');
    }
    try {
        await startBot();
        botRunning = true;
        res.status(200).send('Bot started successfully');
    } catch (error) {
        res.status(500).send(`Error starting bot: ${error.message}`);
    }
});

app.post('/stop-bot', async (req, res) => {
    if (!botRunning) {
        return res.status(400).send('Bot is not running');
    }
    try {
        stopBot();
        botRunning = false;
        res.status(200).send('Bot stopped successfully');
    } catch (error) {
        res.status(500).send(`Error stopping bot: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});