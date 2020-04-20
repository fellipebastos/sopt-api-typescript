import fs from 'fs';
import path from 'path';
import uploadConfig from '../../config/upload';

class RemoveFileService {
  public async execute(filepath: string): Promise<void> {
    const fullPath = path.join(uploadConfig.storageFolder, filepath);
    const fileExists = await fs.promises.stat(fullPath);

    if (fileExists) {
      await fs.promises.unlink(fullPath);
    }
  }
}

export default RemoveFileService;
