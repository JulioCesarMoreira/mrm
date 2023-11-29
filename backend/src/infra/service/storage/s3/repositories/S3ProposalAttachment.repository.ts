import { ProposalAttachmentRepository } from '@application/core/repositories/storage';
import { Injectable } from '@nestjs/common';
import {
  PutObjectCommandInput,
  PutObjectCommand,
  S3Client,
  PutObjectCommandOutput,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  GetObjectCommand,
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3ProposalAttachmentRepository
  implements ProposalAttachmentRepository
{
  private readonly client: S3Client;
  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION,
    });
  }

  async saveObject(
    putObjectCommandInput: PutObjectCommandInput,
  ): Promise<PutObjectCommandOutput> {
    const commmand = new PutObjectCommand(putObjectCommandInput);

    const putObjetcResponse = await this.client.send(commmand);

    return putObjetcResponse;
  }

  async getObjetc(
    getObjectCommandInput: GetObjectCommandInput,
  ): Promise<GetObjectCommandOutput> {
    const command = new GetObjectCommand(getObjectCommandInput);

    const getObejectResponse = await this.client.send(command);

    return getObejectResponse;
  }

  async getObjetcUrl(
    getObjectCommandInput: GetObjectCommandInput,
    expiration: number,
  ): Promise<string> {
    const command = new GetObjectCommand(getObjectCommandInput);

    const url = await getSignedUrl(this.client, command, {
      expiresIn: expiration,
    });

    return url;
  }

  async deleteObject(
    deleteObjectCommandInput: DeleteObjectCommandInput,
  ): Promise<DeleteObjectCommandOutput> {
    const command = new DeleteObjectCommand(deleteObjectCommandInput);

    const deleteObjectResponse = this.client.send(command);

    return deleteObjectResponse;
  }
}
