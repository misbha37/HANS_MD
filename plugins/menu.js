const {cmd , commands} = require('../command')

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
