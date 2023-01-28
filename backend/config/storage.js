import path from 'path';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';

const storage = diskStorage({
  destination: function (req, file, cb) {cb(null, 'public');},
  filename: async function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({storage});

export function getImageName(file, name) { return (name || getRandomString()) + '.' + extension(file.mimetype); }

function getRandomString(length = 20) {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++)
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  return result;
}
