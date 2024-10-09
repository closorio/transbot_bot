import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate();

export async function translateText(text, targetLanguage) {
    try {
        const [translation] = await translate.translate(text, targetLanguage);
        return translation;
    } catch (error) {
        console.error(`Error al traducir el texto: ${error.message}`);
        throw error;
    }
}
