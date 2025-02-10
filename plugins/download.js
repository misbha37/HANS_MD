const { fetchJson } = require('../lib/functions')
const config = require('../config')
const { cmd, commands } = require('../command')

// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();


const yourName = "*POWERED BY HANS BYTE MD*";



//fb downloader
cmd({
    pattern: "fb",
    alias: ["facebook"],
    desc: "download fb videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("give me fb url")
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)
        reply("*Downloading...*")
        //send video (hd,sd)
        await conn.sendMessage(from, { video: { url: data.data.hd }, mimetype: "video/mp4", caption: `- HD\n\n ${yourName}` }, { quoted: mek })
        await conn.sendMessage(from, { video: { url: data.data.sd }, mimetype: "video/mp4", caption: `- SD \n\n ${yourName}` }, { quoted: mek })  
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})


//twitter dl (x)
cmd({
    pattern: "twitter",
    alias: ["twdl"],
    desc: "download tw videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("give me twitter url")
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/twitterdl?url=${q}`)
        reply("*Downloading...*")
        //send video (hd,sd)
        await conn.sendMessage(from, { video: { url: data.data.data.HD }, mimetype: "video/mp4", caption: `- HD\n\n ${yourName}` }, { quoted: mek })
        await conn.sendMessage(from, { video: { url: data.data.data.SD }, mimetype: "video/mp4", caption: `- SD \n\n ${yourName}` }, { quoted: mek })  
        //send audio    
        await conn.sendMessage(from, { audio: { url: data.data.data.audio }, mimetype: "audio/mpeg" }, { quoted: mek })  
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

// gdrive (google drive) download command
cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    desc: "Download Google Drive files",
    category: "download",
    react: "🔎",
    filename: __filename
  },
  async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      // Validate that a query is provided and that it starts with "https://"
      if (!q || !q.startsWith("https://")) {
        return reply("❌ Please provide a valid Google Drive URL.\nUsage: .gdrive <google drive url>");
      }
  
      // Construct the API URL using the provided drive URL.
      // (Here we use the endpoint from David Cyril's API.)
      let apiEndpoint = `https://api.davidcyriltech.my.id/gdrive?url=${encodeURIComponent(q)}`;
      console.log(`[DEBUG] Fetching data from API: ${apiEndpoint}`);
  
      // fetchJson is assumed to be a helper function that fetches and returns JSON from a URL.
      let data = await fetchJson(apiEndpoint);
      console.log("[DEBUG] API response:", data);
  
      // Check that the API indicates success.
      if (!data.success) {
        return reply("❌ Failed to retrieve file information from the provided Google Drive URL.");
      }
      
      let fileName = data.name || "Unknown File";
    let downloadLink = data.download_link;
    
      // Reply to the user that the download is in progress.
      reply(`
╭✦━━━━━━━━━━━━━━━━━━━━━━━━━━✦╮
┃ 𝒢𝓸𝓸𝓰𝓁𝓮 𝒟𝓇𝒾𝓋𝑒 𝒻𝒾𝓁𝑒 ┃
╰✦━━━━━━━━━━━━━━━━━━━━━━━━━━✦╯

🗂️ 𝒻𝒾𝓁𝑒 𝒩𝒶𝓂𝑒: *${fileName}*
🔗 𝒟𝑜𝓌𝓃𝓁ℴ𝒶𝒹: ${downloadLink}

╭✦━━━━━━━━━━━━━━━━━━━━━━━━━━✦╮
✧ 𝒫ℴ𝓌ℯ𝓇ℯ𝒹 𝒷𝓎 𝒽𝒶𝓃𝓈 𝒷𝓎𝓉ℯ 𝓂𝒹 ✧
╰✦━━━━━━━━━━━━━━━━━━━━━━━━━━✦╯`
      );
  
      // Send the file as a document.
      // The API response is expected to include:
      //   - data.name (the file name)
      //   - data.download_link (the URL to download the file)
      // If your API returns the JSON without a wrapping "data" property,
      // adjust the property access accordingly.
      await conn.sendMessage(from, { 
        document: { url: data.download_link }, 
        fileName: data.name, 
        mimetype: "application/octet-stream", 
        caption: `${data.name}\n\n${yourName || ""}`
      }, { quoted: mek });
      
    } catch (e) {
      console.log(e);
      reply(`❌ An error occurred: ${e}`);
    }
  });
  