const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "",  // Put your session id here <3
ALIVE_IMG: process.env.ALIVE_IMG || "https://ibb.co/GvjHR1pp",
ALIVE_MSG: process.env.ALIVE_IMG || "*HEY DEAR* ${pushname}\n *HansByte Md is AlIVE NOW....! 🖐🏻*",
SUDO_NB: process.env.SUDO_NB || "237696900612",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "false",
MODE: process.env.MODE || "public",
AUTO_VOICE:"true"
};
