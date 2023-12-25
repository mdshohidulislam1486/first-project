import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
cloudinary.config({
  cloud_name: 'daxj3l4ed',
  api_key: '597623775953897',
  api_secret: '4LbvXjc3Vl2EBe3P6HrQ3NRSf0Q',
});

export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        fs.unlink(path, function (err) {
          if (err) throw err;
          reject(err);
          // if no error, file has been deleted successfully
          console.log('File deleted!');
        });
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
