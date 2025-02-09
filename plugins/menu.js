const { cmd, commands } = require('../command');
const config = require('../config');

// Uptime function
function getUptime() {
    let totalSeconds = process.uptime();
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
}

const uptime = getUptime();

// Current date function
function getCurrentDate() {
    let date = new Date();
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const currentDate = getCurrentDate();

// Current time function
function getCurrentTime() {
    let date = new Date();
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

const currentTime = getCurrentTime();

module.exports = { getUptime, uptime, getCurrentDate, currentDate, getCurrentTime, currentTime };

cmd({
    pattern: "menu",
    desc: "Display the bot menu",
    category: "menu",
    react: "📜",
    filename: __filename
},

async (conn, mek, m, { from, pushname, reply }) => {
    try {
        let dec = `
✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧
   🚀 *𝐇𝐀𝐍𝐒 𝐁𝐘𝐓𝐄 𝐗 𝐌𝐃* 🚀
✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧

   👋 *𝐇𝐄𝐘 ${pushname}*! 
   🤖 *𝐓𝐇𝐈𝐒 𝐈𝐒 𝐌𝐘 𝐂𝐎𝐎𝐋 𝐌𝐄𝐍𝐔* 🤫
   📅 *𝐃𝐀𝐓𝐄*: ${currentDate}
   ⏰ *𝐓𝐈𝐌𝐄*: ${currentTime}
   ⏳ *𝐔𝐏𝐓𝐈𝐌𝐄*: ${uptime}
   👑 *𝐎𝐖𝐍𝐄𝐑*: ${config.OWNER_NAME}
   💻 *𝐌𝐎𝐃𝐄*: ${config.MODE}
   🛠️ *𝐏𝐋𝐔𝐆𝐈𝐍𝐒*: 20+
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📌 *𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   .alive
   .menu
   .ping
   .system

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📥 *𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   .song <query>
   .video <query>
   .fb <link>
   .mediafire <link>
   .ig <link>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🔍 *𝐒𝐄𝐀𝐑𝐂𝐇 𝐌𝐄𝐍𝐔* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   .yts <query>
   .img <query>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   👥 *𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   .promote
   .demote
   .add
   .remove / .kick
   .setgoodbye
   .setwelcome
   .getpic

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   👑 *𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   .shutdown
   .setpp
   .block
   .unblock
   .clearchats
   .restart
   .broadcast

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🛠️ *𝐓𝐎𝐎𝐋𝐒 𝐌𝐄𝐍𝐔* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   .ai <query>
   .news <query>
   .hack
   .trt <.trt info>
   .shorten <url>
   .fact
   .dalle <query>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🕵️ *𝐒𝐓𝐀𝐋𝐊 𝐌𝐄𝐍𝐔* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   .ghstalk <username>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📖 *𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍 𝐌𝐄𝐍𝐔* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   .bible <chapter>:<verse>
   .quran <surah number>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   *𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐇𝐀𝐍𝐒 𝐓𝐄𝐂𝐇 𝐓𝐄𝐀𝐌* 
   *FOLLOW OUR WHATSAPP CHANNEL*
> https://whatsapp.com/channel/0029VaZDIdxDTkKB4JSWUk1O
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

        await conn.sendMessage(from, { image: { url: `https://i.ibb.co/9gCjCwp/OIG4-E-D0-QOU1r4-Ru-CKuf-Nj0o.jpg` }, caption: dec }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});