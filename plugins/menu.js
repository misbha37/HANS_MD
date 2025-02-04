const {cmd , commands} = require('../command')
const config = require('../config');

// Fonction pour formater l'uptime en HH:MM:SS
function getUptime() {
    let totalSeconds = process.uptime(); // Récupère le temps en secondes depuis le démarrage
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = Math.floor(totalSeconds % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
}

// Stocke l'uptime dans une variable
const uptime = getUptime();

module.exports = { getUptime, uptime };

// Fonction pour récupérer la date actuelle formatée en JJ/MM/AAAA
function getCurrentDate() {
    let date = new Date();
    let day = String(date.getDate()).padStart(2, '0'); // Ajoute un zéro si < 10
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Mois commence à 0
    let year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

// Stocke la date actuelle dans une variable
const currentDate = getCurrentDate();

module.exports = { getCurrentDate, currentDate };


// Fonction pour récupérer l'heure actuelle formatée en HH:MM:SS
function getCurrentTime() {
    let date = new Date();
    let hours = String(date.getHours()).padStart(2, '0'); // Ajoute un zéro si < 10
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

// Stocke l'heure actuelle dans une variable
const currentTime = getCurrentTime();

module.exports = { getCurrentTime, currentTime };






cmd({
    pattern: "menu",
    desc: "menu the bot",
    category: "menu",
    react: "📜",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let dec = `👋 HEY ${pushname} ,
This is my awesome menu 🤫
Consider joining my channel 
> https://whatsapp.com/channel/0029VaZDIdxDTkKB4JSWUk1O


╭━━〔 HANS BYTE X 〕━••═━━━❁ 
│╭━━══─══━━⊛
│║◆┊ *USERNAME* ➻ ${pushname}
│║◆┊ *OWNER* ➻ ${config.OWNER_NAME}
│║◆┊ *UPTIME* ➻ ${uptime}
│║◆┊ *DEVS* ➻ *HANS TECH*
│║◆┊ *DATE* ➻ ${currentDate}
│║◆┊ *MODE* ➻ ${config.MODE}
│║◆┊ *TIME* ➻ ${currentTime} GMT
│║◆┊ *PLUGINS* ➻ 14
┌┤
┊╰─━━═••═━━••═━━••═━━⊛   
╰⊷••HANS BYTE MD ✞••

╭════════════⊷❍
│📌 LIST MENU
╰─────────━⊷

╭════════════⊷❍ 
┊ 1 || MAIN  MENU
┊─────────━⊷
┊ .alive
┊ .menu
┊ .ping
┊ .system
╰══════════⊷


╭════════════⊷❍ 
┊ 2 || DOWNLOAD MENU
┊─────────━⊷
┊ .song
┊ .video
┊ .fb
┊ .mediafire
╰══════════⊷

╭════════════⊷❍ 
┊ 3 || SEARCH MENU
┊─────────━⊷
┊ .yts
╰══════════⊷


╭════════════⊷❍ 
┊ 4 || GROUP MENU
┊─────────━⊷
┊ .promote
┊ .demote
┊ .add
┊ .remove / .kick
┊ .setgoodbye
┊ .setwelcome
┊ .getpic
╰══════════⊷



╭════════════⊷❍ 
┊ 5 || OWNER MENU
┊─────────━⊷
┊ .shutdown
┊ .setpp
┊ .block
┊ .unblock
┊ .clearchats
┊ .restart
┊ .broadcast
╰══════════⊷

╭════════════⊷❍ 
┊ 5 || OTHER MENU
┊─────────━⊷
┊ .ai
┊ .news
╰══════════⊷

Hans Byte Md By HANS TECH


> POWERED BY HANS TECH TEAM `
await conn.sendMessage(from,{image:{url: `https://i.ibb.co/9gCjCwp/OIG4-E-D0-QOU1r4-Ru-CKuf-Nj0o.jpg`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})
