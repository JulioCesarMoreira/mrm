import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { Attachment } from '@application/core/entities';
import { BadRequestException } from '@src/error/CustomError';
import { FilePolicy } from '../policies/filePolicies';
import type { GetHttpRequest } from './types';

export const HandleFile = createParamDecorator(
  async (_: unknown, context: ExecutionContext): Promise<Attachment> => {
    const attachemnt = await context
      .switchToHttp()
      .getRequest<GetHttpRequest>()
      .file();

    if (!attachemnt) {
      throw new BadRequestException([
        'Error, file not send, please send a single file',
      ]);
    }

    const buffer = await attachemnt.toBuffer();

    const { mimetype, filename } = attachemnt;

    const rigthFileFormat = new FilePolicy().fileTypeFilter(mimetype);

    if (!rigthFileFormat) {
      throw new BadRequestException([
        'File format not allowed, allowed images formats: .jpg, .jpeg, .png, .pdf, .xlsx, .xls, .doc, .docx',
      ]);
    }

    return {
      mimetype,
      filename,
      buffer,
    };
  },
);
