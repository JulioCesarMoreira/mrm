import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react';
import type { Attachment, ChildrenProperty } from 'types';
import { SelectedCategory } from '../types';

export interface ServiceContextProperties {
  attachments: Attachment[];
  onSetAttachments: (newAttachments: Attachment[]) => void;
  selectedCategories: SelectedCategory[];
  setSelectedCategories: Dispatch<SetStateAction<SelectedCategory[]>>;
}

export const ServiceContext = createContext<
  ServiceContextProperties | undefined
>(undefined);

export default function ServiceProvider({
  children,
}: ChildrenProperty): ReactElement {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    SelectedCategory[]
  >([]);

  const onSetAttachments = (newFiles: Attachment[]): void =>
    setAttachments((previous) => [...previous, ...newFiles]);

  const value = useMemo(
    () => ({
      attachments,
      onSetAttachments,
      selectedCategories,
      setSelectedCategories,
    }),
    [attachments, onSetAttachments],
  );

  return (
    <ServiceContext.Provider value={value as ServiceContextProperties}>
      {children}
    </ServiceContext.Provider>
  );
}
