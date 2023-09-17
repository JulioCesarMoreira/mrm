import { ReactNode } from 'react';

export interface ChildrenProperty {
  children: ReactNode;
}

export interface Option {
  name: string;
  value: string;
}

export interface Attachment extends File {
  url: string;
}
