import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

interface MulterCustom {
  storage: StorageEngine;
}

const storageFolder = path.resolve(__dirname, '..', '..', 'tmp');

const directories = {
  users: 'users',
};

export default {
  directories,
  storageFolder,
  upload(directory = ''): MulterCustom {
    let destination = storageFolder;

    if (directory) destination = path.join(destination, directory);

    return {
      storage: multer.diskStorage({
        destination,
        filename(request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('HEX');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
