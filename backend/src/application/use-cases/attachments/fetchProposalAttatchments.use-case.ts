import { BadRequestException, Injectable } from '@nestjs/common';
import { ProposalAttachmentRepository } from '@application/core/repositories/storage';
import { ProposalRepository } from '@application/core/repositories/database';
import { Attachment } from '@application/core/entities';

@Injectable()
export class FetchProposalAttachmentsUseCase {
  private readonly bucketName: string;

  constructor(
    private proposalAttatchmentRepository: ProposalAttachmentRepository,
    private proposalDatabaseRepository: ProposalRepository,
  ) {
    this.bucketName = 'mrm-attachments';
  }

  async fetch(proposalId: number, tenantId: string): Promise<string[]> {
    const proposal = await this.proposalDatabaseRepository.get(
      proposalId,
      tenantId,
    );

    if (!proposal) {
      throw new BadRequestException('Proposal do not exists!');
    }
    const s3Folder = `tenant/${tenantId}/proposal/${proposalId}`;

    const listObjectResponse =
      await this.proposalAttatchmentRepository.listObjetcs({
        Bucket: this.bucketName,
        Delimiter: '/',
        Prefix: `${s3Folder}/`,
      });

    const keyList = [];
    if (listObjectResponse.Contents) {
      for (const object of listObjectResponse.Contents) {
        keyList.push(object.Key);
      }

      if (keyList.length === 0) return keyList;

      const urlList = await this.getListObjectUrl(keyList);

      return urlList;
    }
  }

  private async getListObjectUrl(keys: string[]): Promise<string[]> {
    const promises = [];

    for (const key of keys) {
      promises.push(
        this.proposalAttatchmentRepository.getObjetcUrl(
          {
            Bucket: this.bucketName,
            Key: key,
          },
          1800,
        ),
      );
    }

    const urlList = await Promise.all(promises);

    return urlList;
  }
}
