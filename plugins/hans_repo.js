const axios = require('axios');
const { cmd, commands } = require("../command");

cmd({
    pattern: "srepo",
    alias: ["repo", "githubrepo"],
    react: "🍃",
    desc: "Get information about the official bot repository.",
    category: "other",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const repoUrl = "https://api.github.com/repos/HaroldMth/HANS_MD";
        const response = await axios.get(repoUrl);
        const repoData = response.data;

        let repoInfo = `
╔══✦❘༻ *HANS BYTE MD* ༺❘✦══╗
┇  📁 *GITHUB REPOSITORY* 📁
┇╭───────────────────
┇│•📌 *Name*: ${repoData.name}
┇│•🔗 *URL*: ${repoData.html_url}
┇│•📝 *Description*: ${repoData.description || "No description provided"}
┇│•⭐ *Stars*: ${repoData.stargazers_count}
┇│•🍴 *Forks*: ${repoData.forks_count}
┇│•👤 *Owner*: ${repoData.owner.login}
┇│•📅 *Created At*: ${new Date(repoData.created_at).toDateString()}
┇│•📌 *Default Branch*: ${repoData.default_branch}
╰─・─・─・─・─・─・─・─╯
✅ *This is the official repository to deploy HANS BYTE MD.*
> *Powered By HANS BYTE MD*
        `;

        await conn.sendMessage(from, { text: repoInfo }, { quoted });
    } catch (e) {
        console.error("Error fetching repository info:", e);
        reply("⚠️ Error fetching repository information.");
    }
});
