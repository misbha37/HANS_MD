const { cmd, commands } = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "fact",
    desc: "Get a random fact",
    category: "main",
    react: "📜",
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
        // Fetch a fact from the API
        let res = await fetchJson('https://api.davidcyriltech.my.id/fact');
        
        // Check if the response is successful and contains a fact
        if (res && res.success && res.fact) {
            return reply(`Fact: ${res.fact}`);
        } else {
            return reply("No fact found. Please try again later.");
        }
    } catch (e) {
        console.error(e);
        return reply(`Error: ${e.message || e}`);
    }
});
