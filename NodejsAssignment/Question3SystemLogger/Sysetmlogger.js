const os = require("os");
const fs = require("fs");

function getSystemInfo() {
  const totalMemory = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
  const freeMemory = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);

  return `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU Cores: ${os.cpus().length}
Total Memory (GB): ${totalMemory}
Free Memory (GB): ${freeMemory}
Uptime (sec): ${os.uptime()}
-----------------------------
`;
}

setInterval(() => {
  const info = getSystemInfo();

  fs.appendFile("system.log", info, (err) => {
    if (err) {
      console.log("Error writing to log file:", err);
      return;
    }
    console.log("System info logged to system.log");
  });
}, 5000);
