import { AUX_CHANNEL_ID, PRIVATE_CHANNEL_ID_01, TARGET_LANGUAGE } from './src/config/config.js';
import { forwardChannelPosts } from './src/handlers/messageHandler.js';
import bot, { setupStartCommand } from './src/services/telegramService.js';

async function main() {
    try {
        await forwardChannelPosts(AUX_CHANNEL_ID, PRIVATE_CHANNEL_ID_01, TARGET_LANGUAGE);
        console.log('¡¡El bot se está ejecutando correctamente!!');
    } catch (error) {
        console.error(`Error al iniciar el bot: ${error.message}`);
    }
}

setupStartCommand();
main().catch(console.error);
