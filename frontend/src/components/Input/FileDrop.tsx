import { Download } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import { Attachment } from 'types';

interface FileDropProperties {
  files: Attachment[];
  onSetFiles: (newAttachments: Attachment[]) => void;
}

export default function FileDrop({ files, onSetFiles }: FileDropProperties) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('acceptedFiles', acceptedFiles);

    onSetFiles(
      acceptedFiles.map((file) => ({
        ...file,
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex-col-center cursor-pointer gap-4 p-4"
    >
      <input {...getInputProps()} />
      <Download
        size={40}
        color="#2788B1"
        className={twMerge(isDragActive && 'animate-bounce')}
      />
      <p className="text-gray-scale-300">Selecione arquivos ou arraste aqui</p>
    </div>
  );
}
