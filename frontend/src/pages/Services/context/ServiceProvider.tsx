import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react';
import type { Attachment, ChildrenProperty } from 'types';
import { DefaultAttachment, SelectedCategory } from '../types';
import { useParams } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { authenticatedUserAtom } from 'constants/atoms';

export interface ServiceContextProperties {
  attachments: Attachment[];
  onSetAttachments: (newAttachments: Attachment[]) => void;
  selectedCategories: SelectedCategory[];
  setSelectedCategories: Dispatch<SetStateAction<SelectedCategory[]>>;
  onRemoveAttachment: (name: string) => void;
  onRemoveAllAttachments: () => void;
  defaultAttachments: DefaultAttachment[];
  isLoadingAttachments: boolean;
}

export const ServiceContext = createContext<
  ServiceContextProperties | undefined
>(undefined);

export default function ServiceProvider({
  children,
}: ChildrenProperty): ReactElement {
  const { proposalId } = useParams<{ proposalId?: string }>();

  const { idToken } = useAtomValue(authenticatedUserAtom);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [defaultAttachments, setDefaultAttachments] = useState<
    DefaultAttachment[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    SelectedCategory[]
  >([]);
  const [isLoadingAttachments, setIsLoadingAttachments] = useState(false);

  const onSetAttachments = (newFiles: Attachment[]): void =>
    setAttachments((previous) => [...previous, ...newFiles]);

  const onRemoveAttachment = (key: string): void => {
    setAttachments((previous) =>
      previous.filter((attachment) => attachment.key !== key),
    );
    setDefaultAttachments((previous) =>
      previous.filter((attachment) => attachment.key !== key),
    );
  };

  useAsyncEffect(async () => {
    if (proposalId) {
      setIsLoadingAttachments(true);
      const { data } = await axios.get<{ objetcUrls: string[] }>(
        `${import.meta.env.VITE_API_URL}/proposal/${proposalId}/attachment`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );

      if (data.objetcUrls) {
        const blobPromises = [];

        for (const url of data.objetcUrls) {
          blobPromises.push(
            fetch(url, {
              method: 'GET',
              cache: 'no-cache',
              mode: 'cors',
            }),
          );
        }

        const blobResults = await Promise.all(blobPromises);

        const blobsFinally = await Promise.all(
          blobResults.map((result) => result.blob()),
        );

        setDefaultAttachments(
          data.objetcUrls.map((url, index) => {
            const nameWithKey = url.split('?')[0].split('/').at(-1);

            const name = nameWithKey?.slice(21) ?? '';
            const key = nameWithKey?.slice(0, 21) ?? '';

            return { url, key, name, file: blobsFinally[index] };
          }),
        );
      }
      setIsLoadingAttachments(false);
    }
  }, []);

  const onRemoveAllAttachments = (): void => {
    setAttachments([]);
    setDefaultAttachments([]);
  };
  const value: ServiceContextProperties = useMemo(
    () => ({
      attachments,
      defaultAttachments,
      onSetAttachments,
      selectedCategories,
      setSelectedCategories,
      onRemoveAttachment,
      onRemoveAllAttachments,
      isLoadingAttachments,
    }),
    [attachments, onSetAttachments],
  );

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
}
