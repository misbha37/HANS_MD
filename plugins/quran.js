const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "quran",
    desc: "Receive a blessed Quranic verse",
    category: "religion",
    react: "📖",
    filename: __filename
},
async (conn, mek, m, {
    from,
    args,
    reply
}) => {
    try {
        let surah = args.join(" ").trim(); // Get Surah number from command args

        if (!surah || isNaN(surah)) {
            return reply("🕌 Please provide a valid Surah number (e.g., `.quran 1` for Al-Fatiha).");
        }

        let url = `https://api.davidcyriltech.my.id/quran?surah=${encodeURIComponent(surah)}`;
        let res = await fetchJson(url);
        console.log("API Response:", res); // Debugging

        // Validate response structure
        if (!res || !res.success || !res.surah) {
            return reply("😔 Sorry, no Quranic verse was found. Please try again.");
        }

        let { number, name, type, ayahCount, tafsir, recitation } = res.surah;

        // Construct the response message
        let message = `📖 *Holy Quran - Surah ${number}: ${name.english} (${name.arabic})* 📖\n\n` +
                      `🔹 *Type:* ${type}\n` +
                      `📜 *Total Ayahs:* ${ayahCount}\n\n` +
                      `📖 *Tafsir (Explanation in Indonesian):*\n_${tafsir.id}_\n\n` +
                      `🎧 *Recitation:* [Click to Listen](${recitation})\n\n` +
                      `✨ May this verse bring peace and guidance. Ameen. 🕌`;

        return reply(message);
    } catch (e) {
        console.error("Error in Quran Command:", e);
        return reply(`⚠️ Error: ${e.message || e}\n\n🕌 Please try again later.`);
    }
});
