const { cmd } = require('../command');
const fetch = require('node-fetch');
const yts = require('yt-search');

cmd({
    pattern: "lyrics",
    alias: ["songlyrics"],
    react: "🎶",
    desc: "🎤 Get lyrics of a song with an image",
    category: "🎵 Music",
    filename: __filename
},
async (conn, mek, m, { from, quoted, args, q, reply }) => {
    try {
        const input = q.split('|').map(i => i.trim());
        if (input.length < 2) return reply("❌ *Please provide both song title and artist!*\n\n*Format:* `.lyrics song title | artist name`");

        const title = input[0];
        const artist = input[1];

        // Fetch lyrics
        const lyricsRes = await fetch(`https://api.davidcyriltech.my.id/lyrics?t=${encodeURIComponent(title)}&a=${encodeURIComponent(artist)}`);
        const lyricsData = await lyricsRes.json();
        
        if (!lyricsData.lyrics) return reply("❌ *Lyrics not found. Try another song!* ❌");

        // Fetch song image using YouTube search
        const ytSearch = await yts(`${title} ${artist}`);
        const video = ytSearch.videos[0];
        const songImage = video ? video.thumbnail : null;
        
        let lyricsMessage = `🎵 *Lyrics for ${lyricsData.title} by ${lyricsData.artist}* 🎵\n\n${lyricsData.lyrics}`;
        
        if (songImage) {
            await conn.sendMessage(from, { image: { url: songImage }, caption: lyricsMessage }, { quoted: mek });
        } else {
            reply(lyricsMessage);
        }
        
    } catch (e) {
        console.error(e);
        reply("❌ *An error occurred while fetching the lyrics!* ❌");
    }
});
