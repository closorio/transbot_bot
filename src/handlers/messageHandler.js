import bot, { sendTextMessage, sendMedia } from '../services/telegramService.js';
import { translateText } from '../services/translationService.js';

export async function forwardChannelPosts(publicChannelId, privateChannelId, targetLanguage) {
    bot.on('channel_post', async (msg) => {
        if (msg.chat.id === publicChannelId) {
            try {
                if (msg.text) {
                    await sendTextMessage(privateChannelId, msg.text, targetLanguage);
                }
                if (msg.photo) {
                    const photo = msg.photo[msg.photo.length - 1];
                    await sendMedia(privateChannelId, { photo }, msg.caption, targetLanguage);
                }
                if (msg.video) {
                    await sendMedia(privateChannelId, { video: msg.video }, msg.caption, targetLanguage);
                }
            } catch (error) {
                console.error(`Error al procesar el post: ${error.message}`);
            }
        }
    });
}
