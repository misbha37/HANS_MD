const config = require('../config')
const { cmd, commands } = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "bible",
    desc: "Receive a blessing from the Holy Scriptures",
    category: "religion",
    react: "✝️",
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
        // Combine the arguments to form the Bible reference (e.g., "John 3:16")
        let reference = args.join(" ");
        
        // If no reference provided, ask for one with a prayerful tone
        if (!reference || reference.trim() === "") {
            return reply("🙏 Dear child of God, please provide a Bible reference (e.g., *John 3:16*) so we may meditate upon His Word.");
        }
        
        // Build the API URL with the encoded Bible reference
        let url = `https://api.davidcyriltech.my.id/bible?reference=${encodeURIComponent(reference)}`;
        
        // Fetch data from the API
        let res = await fetchJson(url);
        
        // If the API returns a successful response, format and send a blessed message
        if (res && res.success) {
            let message = `✝️ *Blessings from the Word of God: ${res.reference}* ✝️\n\n` +
                          `📖 *Translation:* ${res.translation}\n` +
                          `📜 *Verse Count:* ${res.verses_count}\n\n` +
                          `🔹 *Scripture:*\n${res.text.trim()}\n\n` +
                          `🕊️ *Reflect upon these words, and may the peace of Christ dwell within you.*\n` +
                          `🙏 *Amen. Praise the Lord for His everlasting mercy!* 🙌`;
            return reply(message);
        } else {
            return reply("😔 O Lord, we seem to have encountered an error. The API did not return a valid response. Please try again later, and may His light guide you.");
        }
    } catch (e) {
        console.error(e);
        return reply(`⚠️ *Error:* ${e.message || e}\n\n🙏 *May God grant you patience and understanding.*`);
    }
});
