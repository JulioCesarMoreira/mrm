import { Injectable } from '@nestjs/common';

@Injectable()
export class FilePolicy {
  fileTypeFilter(mimetype: string): boolean {
    const allowedImageTypes = /image\/(jpeg|jpg|png)/;
    const allowedDocumentTypes =
      /application\/(pdf|vnd.openxmlformats-officedocument.wordprocessingml.document|vnd.openxmlformats-officedocument.spreadsheetml.sheet|msword)/;

    if (mimetype.includes('image')) {
      if (!allowedImageTypes.test(mimetype)) {
        return false;
      }
    } else if (mimetype.includes('application')) {
      if (!allowedDocumentTypes.test(mimetype)) {
        return false;
      }
    } else {
      return false;
    }

    return true;
  }
}
