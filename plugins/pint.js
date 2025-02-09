const { cmd } = require('../command');
const fetch = require('node-fetch');

cmd({
    pattern: "pinterest",
    alias: ["pin"],
    react: "📸",
    desc: "Download Pinterest images",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a search query.");
        
        const response = await fetch(`https://itzpire.com/search/pinterest?q=${encodeURIComponent(q)}`);
        const result = await response.json();
        
        if (result.status !== "success" || !result.data.length) {
            return reply("❌ No images found.");
        }
        
        // Extract the first 5 images
        const images = result.data.slice(0, 5);

        for (const imageData of images) {
            let desc = `
╭═══════════════════⊷❍
┃ *📸 Hans Byte MD Pinterest Downloader 📸*
╰══════════⊷
┃ 👤 *Uploader:* ${imageData.upload_by}
┃ 🏷 *Full Name:* ${imageData.fullname}
┃ 📌 *Followers:* ${imageData.followers}
┃ 📝 *Caption:* ${imageData.caption || "N/A"}
┃ 🔗 *Source:* ${imageData.source}
╰──━━━━━━━━━══━━━━━━━━┈╯

*© Powered by Hans Byte MD*
`;
        
            await conn.sendMessage(from, { image: { url: imageData.image }, caption: desc }, { quoted: mek });
        }
        
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
