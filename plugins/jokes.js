const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "jokes",
    desc: "Fetch a random joke",
    category: "fun",
    react: "😂",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        // Fetch a random joke from the API
        let res = await fetchJson("https://official-joke-api.appspot.com/random_joke");

        // Check if the response is valid
        if (res && res.setup && res.punchline) {
            return reply(`${res.setup}\n\n👉 ${res.punchline}`);
        } else {
            return reply("Couldn't fetch a joke at the moment. Try again later!");
        }
    } catch (e) {
        console.error(e);
        return reply(`Error: ${e.message || e}`);
    }
});
