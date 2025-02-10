const { cmd } = require('../command');
const fetch = require('node-fetch');

cmd({
  pattern: "twitter",
  alias: ["tweet"],
  desc: "Download Twitter HD video & audio",
  category: "download",
  react: "🐦",
  filename: __filename
},
async (conn, mek, m, { reply, sender, args, q }) => {
  try {
    // Validate that a Twitter URL is provided.
    if (!q || !q.startsWith("https://")) {
      return reply("❌ *Please provide a valid Twitter URL.*\n📌 Usage: `.twitter <tweet url>`");
    }
    
    // Construct the API URL.
    const apiUrl = `https://api.davidcyriltech.my.id/twitter?url=${encodeURIComponent(q)}`;
    console.log(`[DEBUG] Fetching Twitter data from: ${apiUrl}`);
    
    // Fetch data from the Twitter API.
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log("[DEBUG] Twitter API response:", data);
    
    // Validate the API response.
    if (!data.success) {
      return reply("❌ *Failed to retrieve Twitter data.*");
    }
    
    // Check for the HD video URL.
    const videoHD = data.video_hd;
    if (!videoHD) {
      return reply("❌ *HD Video URL not found in the API response.*");
    }
    
    // Inform the user that the download is in progress.
    reply("*Downloading HD video...*");
    
    // Download the complete HD video as a buffer.
    const videoRes = await fetch(videoHD);
    const videoBuffer = await videoRes.buffer();
    
    // Create a super fancy caption using special characters and stylish fonts.
    const fancyCaption =
`╭──「 *𝓣𝔀𝓲𝓽𝓽𝓮𝓻 𝓓𝓸𝔀𝓷𝓵𝓸𝓪𝓭𝓮𝓻* 」
│ 📄 *Description:* ${data.description || "No Description"}
│ 🎞️ *HD Video:* UPLOADING...
╰──────────────⊷
*© Hans Byte MD*`;
    
    // Send the HD video as a video message.
    await conn.sendMessage(m.chat, {
      video: videoBuffer,
      caption: fancyCaption,
      mimetype: "video/mp4"
    }, { quoted: mek });
    
  } catch (e) {
    console.error(e);
    reply(`❌ *An error occurred:*\n\`\`\`${e}\`\`\``);
  }
});
