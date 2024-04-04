import { config } from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Translate } = require('@google-cloud/translate').v2;

// Carga de las variables de entorno
config();
console.group('Inicio del Programa . . .\n');

// Crea una instancia del bot de Telegram
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Crea una instancia del servicio de traducción de Google Cloud
const translate = new Translate();


// Función para traducir un texto a un idioma objetivo
async function translateText(text, targetLanguage) {
    try {
        let [translation] = await translate.translate(text, targetLanguage);
        return translation;
    } catch (error) {
        console.error(`Error al traducir el texto: ${error.message}`);
        throw error;
    }
}

// Función para enviar un mensaje de texto a un chat de Telegram
async function sendTextMessage(chatId, text, targetLanguage) {
    const translatedText = await translateText(text, targetLanguage);
    await bot.sendMessage(chatId, translatedText);
}

// Función para enviar un medio (foto o video) a un chat de Telegram
async function sendMedia(chatId, media, caption, targetLanguage) {
    const options = caption ? { caption: await translateText(caption, targetLanguage) } : {};
    if (media.photo) {
        await bot.sendPhoto(chatId, media.photo.file_id, options);
    } else if (media.video) {
        await bot.sendVideo(chatId, media.video.file_id, options);
    }
}

// Función para reenviar los posts de un canal público a un canal privado
async function forwardChannelPosts(publicChannelId, privateChannelId, targetLanguage) {
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

// Función principal que inicia el bot
async function main() {
    const publicChannelId = -1002036338717; // BCAux -2036338717
    const privateChannelId = "-1001972778539"; // Krasniok Server -1972778539
    const targetLanguage = 'es'; // 'es' = Español, 'en' = Inglés, 'ru' = Ruso

    try {
        await forwardChannelPosts(publicChannelId, privateChannelId, targetLanguage);
    } catch (error) {
        console.error(`Error al iniciar el bot: ${error.message}`);
    }
        console.log('¡¡El bot se está ejecutando correctamente!!');
}

// Inicia el bot
main().catch(console.error);
console.groupEnd();

// Configura el bot para responder al comando /start e indique que está Online
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const message = '*Online*';
    bot.sendMessage(chatId, message);
});
