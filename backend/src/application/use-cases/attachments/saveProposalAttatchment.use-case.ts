import { BadRequestException, Injectable } from '@nestjs/common';
import { ProposalAttachmentRepository } from '@application/core/repositories/storage';
import { ProposalRepository } from '@application/core/repositories/database';
import { Attachment } from '@application/core/entities';

@Injectable()
export class SaveProposalAttachmentUseCase {
  constructor(
    private proposalAttatchmentRepository: ProposalAttachmentRepository,
    private proposalDatabaseRepository: ProposalRepository,
  ) {}

  async save(
    proposalId: number,
    tenantId: string,
    mimetype: string,
    buffer: Buffer,
  ): Promise<void> {
    const proposal = await this.proposalDatabaseRepository.get(
      proposalId,
      tenantId,
    );

    if (!proposal) {
      throw new BadRequestException('Proposal do not exists!');
    }

    //monstar input
    const attachment: Attachment = {
      filename: `tenant/${tenantId}proposal/${proposalId}`,
      mimetype,
      buffer,
    };

    const saveObjectResponse =
      await this.proposalAttatchmentRepository.saveObject({
        Bucket: 'mrm-attachments',
        Key: attachment.filename,
        Body: attachment.buffer,
        ContentType: attachment.mimetype,
      });

    console.log('saveObjectResponse', saveObjectResponse);
  }
}
