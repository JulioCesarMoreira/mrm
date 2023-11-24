import {
  PutObjectCommandInput,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';

export abstract class ProposalAttachmentRepository {
  abstract saveObject(
    putObjectCommandInput: PutObjectCommandInput,
  ): Promise<PutObjectCommandOutput>;
}
