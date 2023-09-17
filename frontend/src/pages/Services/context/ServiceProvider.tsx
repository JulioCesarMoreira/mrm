import { ReactElement, createContext, useMemo, useState } from 'react';
import type { Attachment, ChildrenProperty } from 'types';

export interface ServiceContextProperties {
  attachments: Attachment[];
  onSetAttachments: (newAttachments: Attachment[]) => void;
}

export const ServiceContext = createContext<
  ServiceContextProperties | undefined
>(undefined);

export default function ServiceProvider({
  children,
}: ChildrenProperty): ReactElement {
  const [attachments, setAttachments] = useState<File[]>([]);

  const onSetAttachments = (newFiles: Attachment[]): void =>
    setAttachments((previous) => [...previous, ...newFiles]);

  const value = useMemo(
    () => ({
      attachments,
      onSetAttachments,
    }),
    [attachments, onSetAttachments],
  );

  return (
    <ServiceContext.Provider value={value as ServiceContextProperties}>
      {children}
    </ServiceContext.Provider>
  );
}
