const mongoose = require('mongoose');

const uploadedFileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['pdf', 'image', 'video'],
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const UploadedFile = mongoose.model('UploadedFile', uploadedFileSchema);

module.exports = UploadedFile;