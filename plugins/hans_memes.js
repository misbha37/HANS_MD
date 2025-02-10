const { cmd } = require('../command');
const fetch = require('node-fetch');

cmd({
  pattern: "meme",
  alias: ["randommeme"],
  desc: "Sends a random meme image from the Meme API",
  category: "fun",
  react: "🤣",
  filename: __filename
},
async (conn, mek, m, { reply, sender, args, q }) => {
  try {
    // Define the Meme API URL.
    const apiUrl = "https://meme-api.com/gimme";
    console.log(`[DEBUG] Fetching meme from: ${apiUrl}`);

    // Fetch meme data from the API.
    const res = await fetch(apiUrl);
    const json = await res.json();
    console.log("[DEBUG] Meme API response:", json);

    // Extract details from the API response.
    const title = json.title || "Random Meme";
    const imageUrl = json.url;
    const postLink = json.postLink || "https://reddit.com";

    // Create an ultra-stylish caption with extra special characters and a cool signature.
    const fancyCaption =
`╭✦━━━━━━━━━━━━━━━━━━━━━━╮
┃ 𝓡𝓪𝓷𝓭𝓸𝓶 𝓜𝓮𝓶𝓮 𝓕𝓾𝓷  ┃
╰✦━━━━━━━━━━━━━━━━━━━━━━╯

✧ *Title:* ${title}
✧ *Post Link:* ${postLink}

✦ 𝒫ℴ𝓌ℯ𝓇ℯ𝒹 𝒷𝓎 𝒽𝒶𝓃𝓈 𝒷𝓎𝓉ℯ 𝓂𝒹 ✦`;

    // Send the meme image with the fancy caption.
    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: fancyCaption
    }, { quoted: m });
    
  } catch (e) {
    console.error(e);
    reply(`❌ An error occurred: ${e}`);
  }
});
