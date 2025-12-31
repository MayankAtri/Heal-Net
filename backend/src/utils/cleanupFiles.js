const fs = require('fs').promises;
const path = require('path');

/**
 * Delete a file from the filesystem
 * @param {string} filePath - Path to the file to delete
 */
const cleanupFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(`File cleaned up: ${filePath}`);
  } catch (error) {
    // File might already be deleted or doesn't exist
    if (error.code !== 'ENOENT') {
      console.error(`Error cleaning up file ${filePath}:`, error.message);
    }
  }
};

/**
 * Clean up old files in the uploads directory
 * Removes files older than the specified number of hours
 * @param {number} hoursOld - Age threshold in hours (default: 24)
 */
const cleanupOldFiles = async (hoursOld = 24) => {
  try {
    const uploadsDir = path.join(__dirname, '../../uploads');
    const files = await fs.readdir(uploadsDir);

    const now = Date.now();
    const maxAge = hoursOld * 60 * 60 * 1000; // Convert hours to milliseconds

    let deletedCount = 0;

    for (const file of files) {
      // Skip .gitkeep files
      if (file === '.gitkeep') continue;

      const filePath = path.join(uploadsDir, file);
      const stats = await fs.stat(filePath);

      // Check if file is older than threshold
      if (now - stats.mtimeMs > maxAge) {
        await cleanupFile(filePath);
        deletedCount++;
      }
    }

    if (deletedCount > 0) {
      console.log(`Cleaned up ${deletedCount} old file(s) from uploads directory`);
    }

  } catch (error) {
    console.error('Error during old files cleanup:', error.message);
  }
};

module.exports = {
  cleanupFile,
  cleanupOldFiles
};
