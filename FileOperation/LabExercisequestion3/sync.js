const fs = require("fs");
const path = require("path");

const sourceDir = "./source";
const destDir = "./destination";

// Ensure destination exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

// Read source directory
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.log("Error reading source directory:", err.message);
    return;
  }

  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);

    try {
      // Check if file exists in destination
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log("Copied:", file);
      } else {
        // Compare modified time
        const srcStat = fs.statSync(sourcePath);
        const destStat = fs.statSync(destPath);

        if (srcStat.mtime > destStat.mtime) {
          fs.copyFileSync(sourcePath, destPath);
          console.log("Updated:", file);
        }
      }
    } catch (error) {
      console.log("Error syncing file:", file, "-", error.message);
    }
  });

  console.log("\nSynchronization Complete ✅");
});
