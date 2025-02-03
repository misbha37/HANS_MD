const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const fs = require("fs");
const { runtime } = require('../lib/functions');
const { execSync } = require("child_process");

cmd({
    pattern: "system",
    alias: ["status", "botinfo"],
    desc: "Check bot system details, RAM, CPU, disk usage, uptime, and more",
    category: "main",
    react: "💻",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        // System information
        const cpu = os.cpus()[0]; // First CPU core details
        const cpuUsage = os.loadavg()[0].toFixed(2); // 1-minute load average
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2); // Convert bytes to MB
        const freeMem = (os.freemem() / 1024 / 1024).toFixed(2);
        const usedMem = (totalMem - freeMem).toFixed(2);
        const nodeVersion = process.version;
        const osType = os.type();
        const osRelease = os.release();
        const osArch = os.arch();
        const botUptime = runtime(process.uptime()); // Bot uptime
        const sysUptime = runtime(os.uptime()); // System uptime
        const cpuSpeed = cpu.speed; // CPU speed in MHz
        const processId = process.pid; // Bot's process ID
        const processCount = os.loadavg()[1].toFixed(2); // Avg. processes running

        // Get disk space info (Linux/macOS only)
        let diskUsage = "N/A";
        try {
            diskUsage = execSync("df -h / | tail -1 | awk '{print $3 \" used / \" $2 \" total\"}'").toString().trim();
        } catch (e) {
            console.log("Disk usage check failed.");
        }

        // Get network interface
        const networkInterfaces = os.networkInterfaces();
        let networkInfo = "N/A";
        for (let key in networkInterfaces) {
            if (networkInterfaces[key][0].address) {
                networkInfo = `${key}: ${networkInterfaces[key][0].address}`;
                break;
            }
        }

        let status = `┌───────────────────────
├ ⏰ *Bot Uptime:* ${botUptime}
├ 🖥️ *System Uptime:* ${sysUptime}
├ 📟 *RAM Usage:* ${usedMem}MB / ${totalMem}MB
├ 🆓 *Free RAM:* ${freeMem}MB
├ ⚡ *CPU Model:* ${cpu.model}
├ 🚀 *CPU Speed:* ${cpuSpeed} MHz
├ 📊 *CPU Usage:* ${cpuUsage}%
├ 🏷️ *OS Type:* ${osType} (${osArch})
├ 🔄 *OS Version:* ${osRelease}
├ 💾 *Disk Usage:* ${diskUsage}
├ 🌐 *Network:* ${networkInfo}
├ 🏷️ *Active Processes:* ${processCount}
├ 🔢 *Bot PID:* ${processId}
├ ⚙️ *Node.js Version:* ${nodeVersion}
├ 👨‍💻 *Developer:* Hans Tech
├ 🧬 *Bot Version:* 1.0.0
├  ✞ *Owner:* ${config.OWNER_NAME || "Unknown"}
└───────────────────────

*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ Hans Byte MD*`;

        // Send image with system info as caption
        return await conn.sendMessage(from, { 
            image: { url: "https://i.imghippo.com/files/ra7818HI.webp" }, 
            caption: status 
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
