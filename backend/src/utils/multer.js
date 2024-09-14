import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/temp'); // Destination directory
  },
  filename: function (req, file, cb) {
    // Create a unique filename with a timestamp and random string to avoid conflicts
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// Create the multer instance
export const upload = multer({ storage });
