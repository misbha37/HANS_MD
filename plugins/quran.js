const config = require('../config')
const { cmd, commands } = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "quran", // The command trigger (e.g., .quran)
    desc: "Receive a blessed Quranic verse",
    category: "religion",
    react: "📖",
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
        // Combine user-provided arguments into a Surah number (e.g., "1")
        let surah = args.join(" ").trim();

        // Validate that a Surah reference was provided
        if (!surah || surah === "") {
            return reply("🕌 *In the name of Allah, the Most Gracious, the Most Merciful.* Please provide a Surah number (e.g., *1* for Al-Fatiha).");
        }

        // Construct the API URL using the Surah number
        let url = `https://api.davidcyriltech.my.id/quran?surah=${encodeURIComponent(surah)}`;

        // Fetch the Quran verse data from the API
        let res = await fetchJson(url);

        // Check if the response contains the necessary data
        if (res && res.success && res.text) {
            let message = `📖 *Blessings from the Holy Quran: Surah ${res.surah}* 📖\n\n` +
                          `🕋 *Translation:* ${res.translation}\n` +
                          `📜 *Verse Count:* ${res.verses_count}\n\n` +
                          `🔹 *Verse:*\n${res.text ? res.text.trim() : 'No text available'}\n\n` +
                          `✨ *Recite this blessed verse, and may Allah's mercy and guidance be upon you, always.*\n` +
                          `🕌 *Ameen.*`;
            return reply(message);
        } else {
            return reply("😔 *Ya Allah, we seem to have encountered an error. The API did not return a valid response. Please try again later, and may Allah's blessings be with you.*");
        }
    } catch (e) {
        console.error(e);
        return reply(`⚠️ *Error:* ${e.message || e}\n\n🕌 *May Allah grant you patience and understanding.*`);
    }
});
