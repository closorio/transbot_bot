import { config } from 'dotenv';

config();

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
export const AUX_CHANNEL_ID = -1002036338717; // BCAux (public channel)
export const PRIVATE_CHANNEL_ID_01 = "-1001735518912"; // Krasniok Server -1001972778539 | BC -1001735518912
export const PRIVATE_CHANNEL_ID_02 = "-1001416886100"; // Krasniok Channel

export const TARGET_LANGUAGE = 'es'; // 'es' = Español, 'en' = Inglés, 'ru' = Ruso
