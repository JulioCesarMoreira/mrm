import { Attachment } from './attachment.interface';

export class Proposal {
  id: number;

  sendDate: Date;

  installmentsBalance: number;

  periodValidity: Date;

  discount: number;

  percentageEntry: number;

  guaranteePeriod: number;

  approved: boolean;

  clientId: number;

  tenantId: string;

  attachements?: ProposalAttachment[];
}

export class ProposalAttachment implements Attachment {
  buffer?: Buffer;
  filename: string;
  mimetype?: string;
}
