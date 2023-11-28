import { BadRequestException, Injectable } from '@nestjs/common';
import { ProposalAttachmentRepository } from '@application/core/repositories/storage';
import { ProposalRepository } from '@application/core/repositories/database';
import { Attachment } from '@application/core/entities';

@Injectable()
export class SaveProposalAttachmentUseCase {
  private readonly bucketName: string;

  constructor(
    private proposalAttatchmentRepository: ProposalAttachmentRepository,
    private proposalDatabaseRepository: ProposalRepository,
  ) {
    this.bucketName = 'mrm-attachments';
  }

  async save(
    proposalId: number,
    tenantId: string,
    filename: string,
    mimetype: string,
    buffer: Buffer,
  ): Promise<string> {
    console.log('Ai meu deus');

    const proposal = await this.proposalDatabaseRepository.get(
      proposalId,
      tenantId,
    );
    console.log('proposal', proposal);

    if (!proposal) {
      throw new BadRequestException('Proposal do not exists!');
    }

    const attachment: Attachment = {
      filename: `tenant/${tenantId}/proposal/${proposalId}/${filename}`,
      mimetype,
      buffer,
    };

    const saveObjectResponse =
      await this.proposalAttatchmentRepository.saveObject({
        Bucket: this.bucketName,
        Key: attachment.filename,
        Body: attachment.buffer,
        ContentType: attachment.mimetype,
      });

    console.log('saveObjectResponse', saveObjectResponse);

    if (saveObjectResponse.$metadata.httpStatusCode !== 200) {
      new Error(`Attachmento ${filename} are not saved.`);
    }

    const url = await this.proposalAttatchmentRepository.getObjetcUrl(
      {
        Bucket: this.bucketName,
        Key: attachment.filename,
      },
      1800,
    );
    console.log('url', url);

    return url;
  }
}
