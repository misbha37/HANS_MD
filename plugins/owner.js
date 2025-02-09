const {cmd , commands} = require('../command')

cmd({
    pattern: "owner",
    desc: "owner the bot",
    category: "main",
    react: "👨‍💻",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*👋 Hello ${pushname}*

> *MY OWNER INFO 👨‍💻* 

*🔥 ᴏᴡɴᴇʀ ɴᴀᴍᴇ -: Hans Byte MD*
🔥 *ɴᴜᴍʙᴇʀ* -: 237696900612
🔥 *ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ-:* https://whatsapp.com/channel/0029VaZDIdxDTkKB4JSWUk1O

*©ᴘᴏᴡᴇʀᴇᴅ ʙʏ  Hans Tech*
`
await conn.sendMessage(from,{image:{url: `https://i.imghippo.com/files/ra7818HI.webp`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
<<<<<<< HEAD
})
=======
})
>>>>>>> 0bb5c2f (HANS BYTE :))
