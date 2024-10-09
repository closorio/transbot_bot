import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from '../config/config.js';
import { translateText } from './translationService.js';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

export async function sendTextMessage(chatId, text, targetLanguage) {
    const translatedText = await translateText(text, targetLanguage);
    await bot.sendMessage(chatId, translatedText);
}

export async function sendMedia(chatId, media, caption, targetLanguage) {
    const options = caption ? { caption: await translateText(caption, targetLanguage) } : {};
    if (media.photo) {
        await bot.sendPhoto(chatId, media.photo.file_id, options);
    } else if (media.video) {
        await bot.sendVideo(chatId, media.video.file_id, options);
    }
}

export function setupStartCommand() {
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        const message = '¿Qué pashó? ¡¡im online bby!!';
        bot.sendMessage(chatId, message);
    });
}

export default bot;


