const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "trt",
    desc: "Translate text to a specified language (e.g., .trt en Bonjour or .trt fr Hello)",
    category: "tools",
    react: "🌐",
    filename: __filename
},
async (conn, mek, m, {
    from,
    quoted,
    body,
    isCmd,
    command,
    args,
    q,
    isGroup,
    sender,
    senderNumber,
    botNumber2,
    botNumber,
    pushname,
    isMe,
    isOwner,
    groupMetadata,
    groupName,
    participants,
    groupAdmins,
    isBotAdmins,
    isAdmins,
    reply
}) => {
    try {
        // Check if language code and text are provided
        if (args.length < 2) {
            return reply("Please provide a language code and text to translate (e.g., .trt en Bonjour).");
        }

        let langCode = args[0]; // The first argument is the language code
        let textToTranslate = args.slice(1).join(" "); // The rest is the text to translate
        
        // Check if valid language code is provided (you can extend this list)
        const supportedLanguages = ['en', 'fr', 'es', 'de', 'it', 'pt', 'ja', 'ko', 'ru', 'zh', 'ar', 'hi', 'bn', 'tr', 'pl', 'nl', 'sv', 'id', 'th'];
        
        if (!supportedLanguages.includes(langCode)) {
            return reply(`Unsupported language code. Supported codes are: ${supportedLanguages.join(", ")}`);
        }

        // Send request to the translation API
        let res = await fetchJson(`https://api.davidcyriltech.my.id/tools/translate?text=${encodeURIComponent(textToTranslate)}&to=${langCode}`);
        
        // Check if the API returned a valid response
        if (res && res.success) {
            return reply(`Translation (${langCode}): ${res.translated_text}`);
        } else {
            return reply("The API did not return a valid response.");
        }
    } catch (e) {
        console.error(e);
        return reply(`Error: ${e.message || e}`);
    }
});
