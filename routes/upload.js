const express = require('express');
const router = express.Router();
const uploadToCloudinary = require('../utils/uploadToCloudinary');
const UploadedFile = require('../models/uploadedFile');
const fs = require('fs').promises;
const path = require('path');
const internetAvailable = require("internet-available");
const { image } = require('../config/cloudinary.config');

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov', '.avi', '.pdf'];

router.post('/upload-folder', async (req, res) => {
  try {
    // Check internet connectivity
    try {
      await internetAvailable();
    } catch (error) {
      return res.status(503).json({ error: 'No internet connection available' });
    }

    const folderPath = path.join(__dirname, '..', 'uploads');
    console.log(`Checking folder: ${folderPath}`);
    
    const files = await fs.readdir(folderPath);
    console.log(`Found ${files.length} files in the folder`);
    
    const uploadResults = [];
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileExtension = path.extname(file).toLowerCase();
      console.log(`Processing file: ${file}, Extension: ${fileExtension}`);
      
      if (!allowedExtensions.includes(fileExtension)) {
        console.log(`Skipping unsupported file: ${file}`);
        continue;
      }

      const stats = await fs.stat(filePath);
      console.log(`File size: ${stats.size} bytes`);
      
      let cloudinaryFolder;
      let resourceType;
      let fileType;
      
      if (['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension)) {
        cloudinaryFolder = 'images';
        resourceType = 'image';
        fileType = 'image';
      } else if (['.mp4', '.mov', '.avi'].includes(fileExtension)) {
        cloudinaryFolder = 'videos';
        resourceType = 'video';
        fileType = 'video';
      } else if (fileExtension === '.pdf') {
        cloudinaryFolder = 'pdfs';
        resourceType = 'auto';
        fileType = 'pdf';
      } else {
        console.log(`Skipping unsupported file: ${file}`);
        continue;
      }

      try {
        console.log(`Uploading file: ${file} to Cloudinary`);
        const { secure_url } = await uploadToCloudinary(filePath, cloudinaryFolder, resourceType, stats.size);
        if (!secure_url) {
          throw new Error('Secure URL not received from Cloudinary');
        }
        
        console.log(`File uploaded successfully. Secure URL: ${secure_url}`);
        const uploadedFile = new UploadedFile({
          fileName: file,
          fileUrl: secure_url,
          fileType: fileType
        });
        await uploadedFile.save();
        uploadResults.push({ fileName: file, fileUrl: secure_url, fileType: fileType });
        await fs.unlink(filePath);
        console.log(`Uploaded and deleted local file: ${file}`);
      } catch (uploadError) {
        console.error(`Error uploading file ${file}:`, uploadError);
        uploadResults.push({ fileName: file, error: uploadError.message || 'Unknown error during upload' });
      }
    }

    res.json({
      message: 'Files upload process completed',
      uploadedFiles: uploadResults,
      totalFiles: files.length,
      successfulUploads: uploadResults.filter(result => !result.error).length
    });
  } catch (error) {
    console.error('Error handling folder upload:', error);
    res.status(500).json({ error: 'Error in upload process', details: error.message });
  }
});


module.exports = router;