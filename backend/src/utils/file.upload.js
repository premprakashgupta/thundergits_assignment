const multer = require('multer');

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = req.uploadPath;
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '_' + file.originalname;
    cb(null, fileName);
  }
});

// File filter configuration
const fileFilter = function (req, file, cb) {
    console.log(file.mimetype)
  if (!file) {
    cb(new Error('File is not available')); // Reject the file
  }
  if (req.allowedFile.includes(file.mimetype)) {
   
    cb(null, true); // Accept the file
  } else {
    cb(new Error(req.fileTypeErrorMsg)); // Reject the file
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 10240 }, // 1 MB limit
  fileFilter: fileFilter
});

/**
 * 
 * @param {String} fieldName - key name for sending file
 * @param {String} uploadPath - path at which image will upload
 * @param {Array} allowedFile - array which contains file type which will allowed
 * @param {String} fileTypeErrorMsg - error message when file type not matched
 * @returns 
 */

// Middleware function for file upload
exports.fileUpload = (fieldName, uploadPath, allowedFile,fileTypeErrorMsg) => {
  console.log("file upload call")
  return (req, res, next) => {
    req.uploadPath = uploadPath;
    req.allowedFile = allowedFile;
    req.fileTypeErrorMsg = fileTypeErrorMsg;

    const singleUpload = upload.single(fieldName);

    const totalBytes = req.headers['content-length'];
    let uploadedBytes = 0;

    req.on('data', chunk => {
      uploadedBytes += chunk.length;
      const uploadProgress = (uploadedBytes / totalBytes) * 100;
      
    });

    singleUpload(req, res, function (err) {
      if (err) {
        return res.status(400).json(err.message);
      }
      next();
    });
  };
};
