const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "quote",
    desc: "Get a random motivational quote.",
    category: "other",
    react: "💡",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Fetch quote from the API
        const response = await axios.get('https://api.davidcyriltech.my.id/random/quotes');
        const data = response.data;

        if (!data.success) {
            return reply("❌ Failed to fetch a quote. Please try again.");
        }

        // Format the quote response
        const quoteMessage = `💬 *Quote of the Day* 💬\n\n_"${data.response.quote}"_\n\n- *${data.response.author}*`;

        // Send the quote as a reply
        reply(quoteMessage);
    } catch (error) {
        console.error("Error fetching quote:", error);
        reply(`❌ Error: ${error.message}`);
    }
});
