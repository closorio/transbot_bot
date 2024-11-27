import { AUX_CHANNEL_ID, PRIVATE_CHANNEL_ID_01, PRIVATE_CHANNEL_ID_02, TARGET_LANGUAGE } from './src/config/config.js';
import { forwardChannelPosts } from './src/handlers/messageHandler.js';
import { initializeBot } from './src/services/telegramService.js';

export async function main() {
    try {
        initializeBot();
        const privateChannelIds = [PRIVATE_CHANNEL_ID_01, PRIVATE_CHANNEL_ID_02]; // IDs de los canales privados
        await forwardChannelPosts(AUX_CHANNEL_ID, privateChannelIds, TARGET_LANGUAGE);
        console.log('¡¡El bot se está ejecutando!!');
    } catch (error) {
        console.error(`Error al iniciar el bot: ${error.message}`);
    }
}