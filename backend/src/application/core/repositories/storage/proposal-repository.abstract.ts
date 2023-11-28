import {
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  PutObjectCommandInput,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';

export abstract class ProposalAttachmentRepository {
  abstract saveObject(
    putObjectCommandInput: PutObjectCommandInput,
  ): Promise<PutObjectCommandOutput>;

  abstract getObjetc(
    getObjectCommandInput: GetObjectCommandInput,
  ): Promise<GetObjectCommandOutput>;

  abstract getObjetcUrl(
    command: GetObjectCommandInput,
    expiration: number,
  ): Promise<string>;

  abstract deleteObject(
    command: DeleteObjectCommandInput,
  ): Promise<DeleteObjectCommandOutput>;
}
