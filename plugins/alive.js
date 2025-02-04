const config = require('../config')
const {cmd , commands} = require('../command')

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
return await conn.sendMessage(from,{
    image: {url: "https://i.imghippo.com/files/ra7818HI.webp"},
    caption: `*HEY DEAR* ${pushname}\n*Hans Byte MD ALIVE NOW....! 🤫*`
},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})
