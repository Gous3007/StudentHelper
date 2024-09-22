const cloudinary = require('../config/cloudinary.config');
const path = require('path');
const { promisify } = require('util');

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

async function uploadToCloudinary(filePath, folderName, resourceType, fileSize, retries = 0) {
  try {
    console.log(`Starting upload for file: ${filePath}`);
    let uploadOptions = {
      resource_type: resourceType,
      folder: folderName,
      type: 'authenticated',
      chunk_size: 6000000, // 6MB chunks
      timeout: 120000 // 2 minutes timeout
    };

    if (resourceType === 'auto' && path.extname(filePath).toLowerCase() === '.pdf') {
      uploadOptions.upload_preset = 'StudentHelper';
    }

    let result;
    if (resourceType === 'video' || fileSize > 10 * 1024 * 1024) {
      console.log('Using large file upload method');
      const uploadLarge = promisify(cloudinary.uploader.upload_large);
      result = await uploadLarge(filePath, uploadOptions);
    } else {
      console.log('Using standard upload method');
      const upload = promisify(cloudinary.uploader.upload);
      result = await upload(filePath, uploadOptions);
    }

    console.log(`Cloudinary upload result:`, result);
    if (!result) {
      throw new Error('No result received from Cloudinary');
    }
    if (!result.secure_url) {
      throw new Error('Secure URL not present in Cloudinary response');
    }

    return { secure_url: result.secure_url };
  } catch (err) {
    console.error('Error in uploadToCloudinary:', err);
    console.error('File path:', filePath);
    console.error('Resource type:', resourceType);
    console.error('File size:', fileSize);
    if (err.http_code) {
      console.error(`Cloudinary HTTP Error Code: ${err.http_code}`);
    }
    if (err.error && err.error.message) {
      console.error(`Cloudinary Error Message: ${err.error.message}`);
    }

    if (retries < MAX_RETRIES && (err.message === 'write ECONNRESET' || err.code === 'ECONNRESET')) {
      console.log(`Retry attempt ${retries + 1} for file: ${filePath}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return uploadToCloudinary(filePath, folderName, resourceType, fileSize, retries + 1);
    }

    throw err;
  }
}

module.exports = uploadToCloudinary;