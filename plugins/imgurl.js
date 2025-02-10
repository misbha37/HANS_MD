const config = require('../config');
const { cmd, commands } = require('../command');
const fetch = require('node-fetch');

cmd({
  pattern: "url",
  react: "🔗",
  alias: ["tourl"],
  desc: "Converts a replied image to a URL using imgbb (Powered by HANS BYTE MD)",
  category: "tools",
  use: ".url (reply to an image)",
  filename: __filename
},
async (conn, mek, m, { 
  from, l, quoted, body, isCmd, command, args, q, isGroup, sender, 
  senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, 
  groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply 
}) => {
  console.log("---------------------------------------------------");
  console.log(`[INFO] Command '.url' invoked by ${sender}`);
  console.log(`[INFO] Timestamp: ${new Date().toISOString()}`);

  // Ensure that the command is used as a reply.
  if (!m.quoted) {
    console.log("[WARN] No replied message detected.");
    return reply("❌ Please reply to an image message to use this command.");
  }

  // Modified image extraction:
  // First, try to see if the quoted object directly contains an imageMessage.
  // Otherwise, check within m.quoted.message (including ephemeralMessage).
  let imageMessage = m.quoted.imageMessage ||
                     (m.quoted.message && 
                      (m.quoted.message.imageMessage ||
                       (m.quoted.message.ephemeralMessage &&
                        m.quoted.message.ephemeralMessage.message &&
                        m.quoted.message.ephemeralMessage.message.imageMessage)));
  
  if (!imageMessage) {
    console.log("[WARN] The replied message does not contain a valid image.");
    console.log("[DEBUG] Quoted message structure:", JSON.stringify(m.quoted, null, 2));
    return reply("❌ The replied message does not contain a valid image. Please reply to an image.");
  }

  try {
    console.log("[DEBUG] Attempting to download the image from the replied message...");
    // Download the media (assuming conn.downloadMediaMessage returns a Buffer)
    const mediaBuffer = await conn.downloadMediaMessage(m.quoted);
    if (!mediaBuffer) {
      console.log("[ERROR] Media download failed; received empty buffer.");
      return reply("❌ Failed to download the image. Please try again.");
    }
    console.log(`[DEBUG] Media downloaded. Buffer size: ${mediaBuffer.length} bytes.`);

    // Convert the media buffer to a base64 string.
    let base64Image = "";
    try {
      base64Image = mediaBuffer.toString('base64');
      console.log("[DEBUG] Converted media buffer to base64.");
    } catch (conversionError) {
      console.error("[ERROR] Conversion to base64 failed:", conversionError);
      return reply("❌ Error processing the image. Please try again.");
    }

    // Prepare to upload the base64 image to imgbb using your API key.
    const apiKey = "f342084918d24b0c0e18bd4bf8c8594e";
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;
    const formData = new URLSearchParams();
    formData.append("image", base64Image);

    console.log("[DEBUG] Uploading image to imgbb...");
    const response = await fetch(uploadUrl, { method: "POST", body: formData });
    const json = await response.json();
    console.log("[DEBUG] Response from imgbb:", json);

    if (json.success) {
      const imageUrl = json.data.url;
      console.log("[INFO] Image successfully uploaded. URL:", imageUrl);
      return reply(`✅ Image URL: ${imageUrl}\n\nPowered by HANS BYTE MD`);
    } else {
      console.error("[ERROR] Imgbb upload unsuccessful:", json);
      return reply("❌ Failed to upload the image to imgbb. Please try again later.");
    }
  } catch (e) {
    console.error("[ERROR] Exception during command execution:", e);
    return reply("❌ An unexpected error occurred while processing the image.\n\nPowered by HANS BYTE MD");
  }
});
