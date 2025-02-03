const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')

cmd({
    pattern: "song",
    alias: ["play"],
    react: "🎵",
    desc: "downlod song",
    category: "downlod",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return reply("*❌Please give me url or titel*")
const search = await yts(q)
const deta = search.videos[0];
const url = deta.url 

let desc= `
╭═══════════════════⊷❍
┃ *📽️ Hans Byte MD SONG-𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥📽️*
╰══════════⊷
┃ ℹ️ *title* : *${deta.title}*
┃ 📋 *description* : *${deta.description}*
┃ 🕘 *time* : *${deta.timestamp}*
┃ 📌 *ago* : *${deta.ago}*
┃ 📉 *views* : *${deta.views}*
╰──━━━━━━━══━━━━━━━━━┈╯

*©ᴘᴏᴡᴇʀᴅ ʙʏ Hans Byte ᴍᴅ*


`

await conn.sendMessage(from,{image :{ url: deta.thumbnail},caption:desc},{quoted:mek});

//downlod audio+ document

const res = await fetch(`https://api.davidcyriltech.my.id/youtube/mp3?url=${url}`);
const data = await res.json();
if (!data.success) return reply("❌ Failed to fetch audio.");

let downloadUrl = data.result.downloadUrl;

//send audio message 
await conn.sendMessage(from,{audio:{url:downloadUrl},mimetype:"audio/mpeg",caption :"*©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Hans Byte ᴍᴅ*"},{quoted:mek})
await conn.sendMessage(from,{document:{url:downloadUrl},mimetype:"audio/mpeg",fileName:deta.title + ".mp3" ,caption :"*©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Hans Byte ᴍᴅ*"},{quoted:mek})

  

}catch(e){
console.log(e)
reply(`${e}`)
}
})

//========video dl=======

cmd({
    pattern: "video",
    react: "🎥",
    desc: "downlod video",
    category: "downlod",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return reply("❌Please give me url or title")
const search = await yts(q)
const deta = search.videos[0];
const url = deta.url 

let desc= `
╭═══════════════════⊷❍
┃ *📽️ Hans Byte MD 𝗩𝗜𝗗𝗘𝗢-𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥📽️*
╰══════════⊷
┃ ℹ️ *title* : *${deta.title}*
┃ 📋 *description* : *${deta.description}*
┃ 🕘 *time* : *${deta.timestamp}*
┃ 📌 *ago* : *${deta.ago}*
┃ 📉 *views* : *${deta.views}*
╰──━━━━━━━━━══━━━━━━━━┈╯

*©ᴘᴏᴡᴇʀᴅ ʙʏ Hans Byte ᴍᴅ*

`

await conn.sendMessage(from,{image :{ url: deta.thumbnail},caption:desc},{quoted:mek});

//downlod video + document 

const res = await fetch(`https://api.davidcyriltech.my.id/youtube/mp3?url=${url}`);
const data = await res.json();
if (!data.success) return reply("❌ Failed to fetch audio.");

let downloadUrl = data.result.downloadUrl;

//send video  message 
await conn.sendMessage(from,{video:{url:downloadUrl},mimetype:"video/mp4",caption :"*©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Hans Byte ᴍᴅ*"},{quoted:mek})
await conn.sendMessage(from,{document:{url:downloadUrl},mimetype:"video/mp4",fileName:deta.title + ".mp4",caption :"*©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀᴄᴅ-ᴍᴅ*"},{quoted:mek})

  

}catch(e){
console.log(e)
reply(`${e}`)
}
})
