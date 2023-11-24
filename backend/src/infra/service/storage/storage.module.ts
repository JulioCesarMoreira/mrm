import { Module } from '@nestjs/common';
import { S3ProposalAttachmentRepository } from './s3/repositories/S3ProposalAttachment.repository';
import { ProposalAttachmentRepository } from '@application/core/repositories/storage';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  providers: [
    S3Client,
    {
      provide: ProposalAttachmentRepository,
      useClass: S3ProposalAttachmentRepository,
    },
  ],
  exports: [
    {
      provide: ProposalAttachmentRepository,
      useClass: S3ProposalAttachmentRepository,
    },
  ],
})
export class StorageModule {}
