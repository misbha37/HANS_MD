const axios = require('axios');
const { cmd } = require('../command');
const config = require('../config'); // Ensure any required configurations are set

cmd({
    pattern: "ghstalk",
    desc: "Fetch detailed GitHub profile information.",
    category: "other",
    react: "🐱",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, pushname, reply }) => {
    try {
        // Combine args to get the GitHub username
        const username = args.join(' ');
        if (!username) {
            return reply("👤 Please provide a GitHub username.\nExample: .ghstalk HaroldMth");
        }

        // Build the API URL using the provided username
        const apiUrl = `https://api.davidcyriltech.my.id/githubStalk?user=${encodeURIComponent(username)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Check if the API returned valid data
        if (!data || !data.username) {
            return reply("🚫 Unable to fetch the GitHub profile. Please try again later.");
        }

        // Create a formatted message with the GitHub user details
        const profileInfo = `
👤 *GitHub Profile Information* 👤

🔰 *Username:* ${data.username}
📝 *Nickname:* ${data.nickname}
💬 *Bio:* ${data.bio}
🆔 *ID:* ${data.id}
🔗 *Profile URL:* ${data.url}
📌 *Type:* ${data.type}
📍 *Location:* ${data.location}
📚 *Public Repositories:* ${data.public_repositories}
👥 *Followers:* ${data.followers}
🤝 *Following:* ${data.following}
⏰ *Created At:* ${data.created_at}
🔄 *Updated At:* ${data.updated_at}

*POWERED BY HANS BYTE MD 🤫*
        `;

        // Define the image URL using the profile picture or fallback image from config
        const imageUrl = (data.profile_pic && data.profile_pic !== 'N/A') ? data.profile_pic : config.ALIVE_IMG;

        // Send the GitHub profile details along with the profile picture
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: profileInfo
        }, { quoted: mek });
    } catch (e) {
        console.error("Error fetching GitHub profile:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

/*============================================================================================================================================*/

const pkg = require('api-qasim');
const { igStalk } = pkg;

cmd({
    pattern: "igstalk",
    desc: "Fetch detailed Instagram profile information.",
    category: "other",
    react: "📸",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, pushname, reply }) => {
    try {
        // Combine args to get the Instagram username
        const username = args.join(' ');
        if (!username) {
            return reply("📸 Please provide an Instagram username.\nExample: .igstalk hansbyte");
        }

        // Fetch Instagram profile data
        const data = await igStalk(username);

        // Check if valid data was received
        if (!data || !data.username) {
            return reply("🚫 Unable to fetch the Instagram profile. Please try again later.");
        }

        // Create a formatted message with the Instagram user details
        const profileInfo = `
╭──「 *Instagram Stalker* 」
│ 📛 *Name:* ${res.name || "Unknown"}
│ 🔖 *Username:* ${res.username}
│ 👥 *Followers:* ${res.followers}
│ 🫂 *Following:* ${res.following}
│ 📝 *Bio:* ${res.description || "No Bio"}
│ 📸 *Posts:* ${res.posts}
│ 🔗 *Profile:* https://instagram.com/${res.username.replace(/^@/, '')}
╰──────────────⊷
*© Hans Byte MD*`;

        // Define the image URL using the profile picture or fallback image from config
        const imageUrl = (data.profilePic && data.profilePic !== 'N/A') ? data.profilePic : config.ALIVE_IMG;

        // Send the Instagram profile details along with the profile picture
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: profileInfo
        }, { quoted: mek });
    } catch (e) {
        console.error("Error fetching Instagram profile:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
// WA stalk 
const fetch = require('node-fetch');

cmd({
  pattern: "wastalk",
  alias: ["whatsappstalk"],
  desc: "Stalk a WhatsApp channel using a provided URL",
  category: "info",
  react: "🔍",
  filename: __filename
},
async (conn, mek, m, { reply, sender, args, q }) => {
  try {
    // Use user-supplied URL input
    let inputUrl = args[0];
    if (!inputUrl || !inputUrl.startsWith("https://")) {
      return reply("❌ *Please provide a valid WhatsApp channel URL.*\n\nUsage: `.stalk <channel url>`");
    }
    
    // Construct the API URL using the user URL as a query parameter.
    // (If the API does not support query parameters, you may need to remove this part.)
    let apiUrl = `https://itzpire.com/stalk/whatsapp-channel?url=${encodeURIComponent(inputUrl)}`;
    console.log(`[DEBUG] Fetching WhatsApp channel info from: ${apiUrl}`);
    
    // Fetch channel data from the API
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log("[DEBUG] API response:", data);
    
    // Validate API response
    if (data.status !== "success") {
      return reply("❌ *Failed to retrieve channel info.*\nPlease check the URL and try again.");
    }
    
    const channel = data.data;
    
    // Create a fancy caption styled similar to your Instagram stalker example.
    let fancyCaption =
`╭──「 *WhatsApp Channel Stalker* 」
│ 📛 *Title:* ${channel.title || "Unknown"}
│ 👥 *Followers:* ${channel.followers || "N/A"}
│ 📝 *Description:* ${channel.description || "No Description"}
│ 🖼️ *Image:* ${channel.img || "N/A"}
╰──────────────⊷
*© Hans Byte MD*`;
    
    // Send the channel image with the fancy caption.
    await conn.sendMessage(m.chat, {
      image: { url: channel.img },
      caption: fancyCaption
    }, { quoted: mek });
    
  } catch (e) {
    console.error(e);
    reply(`❌ *An error occurred:*\n\`\`\`${e}\`\`\``);
  }
});
