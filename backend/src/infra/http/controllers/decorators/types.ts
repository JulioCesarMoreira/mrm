import type { Stream } from 'form-data';

export interface GetHttpRequest {
  file: () => Promise<GetRequestFile | undefined>;
}

export interface GetRequestFile {
  type: string;
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  file: Stream;
  fields: {
    documentFile: [];
  };
  toBuffer: () => Promise<Buffer>;
}
