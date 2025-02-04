const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "img",
    desc: "Search for images from Google",
    category: "main",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, {
    from,
    quoted,
    body,
    isCmd,
    command,
    args,
    q,
    isGroup,
    sender,
    senderNumber,
    botNumber2,
    botNumber,
    pushname,
    isMe,
    isOwner,
    groupMetadata,
    groupName,
    participants,
    groupAdmins,
    isBotAdmins,
    isAdmins,
    reply
}) => {
    try {
        // Use args to get the query text
        let query = args.join(" ");
        
        // Check if query text was provided
        if (!query || query.trim() === "") {
            return reply("Please provide some text for image search.");
        }

        // Fetch image search results from the API
        let res = await fetchJson(`https://api.davidcyriltech.my.id/googleimage?query=${encodeURIComponent(query)}`);

        // Check if the response contains results
        if (res && res.success && res.results && res.results.length > 0) {
            // Prepare to send the images with captions
            let images = res.results.slice(0, 5); // Limiting to 5 images

            for (let img of images) {
                await conn.sendMessage(from, { 
                    image: { url: img }, 
                    caption: "*BY HANS BYTE MD🤫*" 
                }, { quoted: mek });
            }
        } else {
            return reply("No images found for your query.");
        }
    } catch (e) {
        console.error(e);
        return reply(`Error: ${e.message || e}`);
    }
});
