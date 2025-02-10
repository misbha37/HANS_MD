const { cmd, commands } = require('../command');
const fetch = require('node-fetch');

cmd({
    pattern: "mediafire",
    alias: ["mfdl", "mfire"],
    react: "📂",
    desc: "Download files from Mediafire",
    category: "download",
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
        // Check if a URL is provided
        if (!q) {
            return reply("*❌ Please provide a Mediafire URL!*\nExample: .mediafire <URL>");
        }

        // Basic validation to check if the provided URL is a Mediafire link
        if (!q.includes("mediafire.com/file/")) {
            return reply("*❌ Invalid Mediafire URL!*");
        }

        // Construct the API URL with the encoded Mediafire link
        const apiUrl = `https://api.davidcyriltech.my.id/mediafire?url=${encodeURIComponent(q)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if the API returned a downloadLink
        if (!data.downloadLink) {
            return reply("❌ Failed to fetch Mediafire file information.");
        }

        // Build a descriptive message using the API response data
        let desc = `
╔══✦❘༻ *MEDIAFIRE DOWNLOADER* ༺❘✦══╗
┇  📂 *File Details*
┇╭───────────────────
┇│•🎉  Creator: *HANS TECH*
┇│•📄  File Name: ${data.fileName}
┇│•💾  Mime Type: ${data.mimeType}
┇│•📏  Size: ${data.size}
┇╰───────────────────
╰───────────────────
Powered by HANS BYTE MD <3 `;

        // Send the file as a document (if supported) along with the details as caption.
        // The mimetype is set according to the provided mimeType (e.g., "zip" becomes "application/zip")
        await conn.sendMessage(from, {
            document: { url: data.downloadLink },
            mimetype: `application/${data.mimeType}`,
            fileName: data.fileName,
            caption: desc
        }, { quoted: mek });
        
    } catch (e) {
        console.error("Error fetching Mediafire file:", e);
        reply("⚠️ Error fetching the Mediafire file.");
    }
});
