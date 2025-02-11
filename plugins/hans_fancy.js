const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "fancy",
    desc: "Generate fancy text",
    category: "text",
    react: "✨",
    filename: __filename
},
async (conn, mek, m, {
    args,
    reply
}) => {
    try {
        if (args.length === 0) {
            // If no arguments, show available fonts
            let res = await fetchJson("https://www.dark-yasiya-api.site/other/font?text=Hello");
            if (!res || !res.result) return reply("Failed to fetch font list.");
            
            let fontList = res.result.map((f, index) => `${index + 1}. ${f.name}`).join("\n");
            return reply(`*Available Fancy Fonts:*\n\n${fontList}\n\nUsage: .fancy <font_id> <text>`);
        }
        
        // Check if font ID and text are provided
        if (args.length < 2) return reply("Usage: .fancy <font_id> <text>");
        
        let fontId = parseInt(args[0]);
        if (isNaN(fontId) || fontId < 1) return reply("Invalid font ID.");
        
        let text = args.slice(1).join(" ");
        let res = await fetchJson(`https://www.dark-yasiya-api.site/other/font?text=${encodeURIComponent(text)}`);
        
        if (!res || !res.result || fontId > res.result.length) return reply("Invalid font ID.");
        
        let fancyText = res.result[fontId - 1].result;
        reply(`*Fancy Text:*\n\n${fancyText}`);
    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || e}`);
    }
});
