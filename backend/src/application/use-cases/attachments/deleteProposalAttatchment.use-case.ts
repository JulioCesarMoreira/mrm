import { BadRequestException, Injectable } from '@nestjs/common';
import { ProposalAttachmentRepository } from '@application/core/repositories/storage';
import { ProposalRepository } from '@application/core/repositories/database';
import { DeleteObjectCommandOutput } from '@aws-sdk/client-s3';

@Injectable()
export class DeleteProposalAttachmentUseCase {
  private readonly bucketName: string;

  constructor(
    private proposalAttatchmentRepository: ProposalAttachmentRepository,
    private proposalDatabaseRepository: ProposalRepository,
  ) {
    this.bucketName = 'mrm-attachments';
  }

  async delete(
    proposalId: number,
    tenantId: string,
    filename: string,
  ): Promise<string> {
    const proposal = await this.proposalDatabaseRepository.get(
      proposalId,
      tenantId,
    );

    if (!proposal) {
      throw new BadRequestException('Proposal do not exists!');
    }

    const filenameKey = `tenant/${tenantId}/proposal/${proposalId}/${filename}`;

    const deleteObjectResponse =
      await this.proposalAttatchmentRepository.deleteObject({
        Bucket: this.bucketName,
        Key: filenameKey,
      });

    if (deleteObjectResponse.$metadata.httpStatusCode !== 204) {
      new Error(`Attachment ${filename} are not deleted.`);
    }

    return 'Attachment has been deleted.';
  }
}
