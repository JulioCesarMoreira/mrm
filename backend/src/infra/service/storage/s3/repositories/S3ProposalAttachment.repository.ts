import { ProposalAttachmentRepository } from '@application/core/repositories/storage';
import { Injectable } from '@nestjs/common';
import {
  PutObjectCommandInput,
  PutObjectCommand,
  S3Client,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3ProposalAttachmentRepository
  implements ProposalAttachmentRepository
{
  async saveObject(
    putObjectCommandInput: PutObjectCommandInput,
  ): Promise<PutObjectCommandOutput> {
    const client = new S3Client({ region: process.env.AWS_REGION });

    const commmand = new PutObjectCommand(putObjectCommandInput);

    const s3Response = await client.send(commmand);

    return s3Response;
  }
}
