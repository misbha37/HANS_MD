const ytSearch = require('yt-search');
const { cmd } = require('../command');

cmd({
    pattern: "yts",
    desc: "🔍 𝘼𝘿𝙑𝘼𝙉𝘾𝙀𝘿 𝙔𝙏 𝙎𝙀𝘼𝙍𝘾𝙃",
    category: "main",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { args, reply }) => {
    try {
        let query = args.join(" ");
        if (!query) return reply("⚠️ *『 𝗘𝗡𝗧𝗘𝗥 𝗔 𝗦𝗘𝗔𝗥𝗖𝗛 𝗧𝗘𝗥𝗠! 』*");

        // 🔍 Searching YouTube
        let searchResults = await ytSearch(query);
        if (!searchResults.videos.length) return reply("❌ *『 𝗡𝗢 𝗥𝗘𝗦𝗨𝗟𝗧𝗦 𝗙𝗢𝗨𝗡𝗗! 』*");

        // Get first result
        let vid = searchResults.videos[0];

        // ⚡ 𝙎𝙩𝙮𝙡𝙞𝙨𝙝 𝙏𝙚𝙭𝙩 + 𝘾𝙤𝙤𝙡 𝙁𝙤𝙣𝙩𝙨 ✨
        let message = `┏━━━━━❰ 𝗬𝗼𝘂𝗧𝘂𝗯𝗲 🔥 𝗦𝗲𝗮𝗿𝗰𝗵 ❱━━━━━━┓\n` +
                      `┃ 🎬 *𝗧𝗶𝘁𝗹𝗲:*  𝙁𝙡𝙖𝙨𝙝 ✦ 『 ${vid.title} 』\n` +
                      `┃ 📺 *𝗖𝗵𝗮𝗻𝗻𝗲𝗹:*  💠 『 ${vid.author.name} 』\n` +
                      `┃ ⏳ *𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻:*  ⏰ ${vid.timestamp}\n` +
                      `┃ 👀 *𝗩𝗶𝗲𝘄𝘀:*  🔥 ${vid.views.toLocaleString()}\n` +
                      `┃ 📅 *𝗨𝗽𝗹𝗼𝗮𝗱𝗲𝗱:*  🕰️ ${vid.ago}\n` +
                      `┃ 🔗 *𝗪𝗮𝘁𝗰𝗵 𝗛𝗲𝗿𝗲:*  🌐 ${vid.url}\n` +
                      `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n` +
                      `💎 *BY HANS BYTE* 💎`;

        // Send message with video thumbnail
        await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: message }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`⚠️ *『 𝗘𝗥𝗥𝗢𝗥: ${e.message || e} 』*`);
    }
});
