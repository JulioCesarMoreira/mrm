import { useToast } from '@components/ui/use-toast';
import { Download } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import { Attachment } from 'types';

interface FileDropProperties {
  filesLength: number;
  onSetFiles: (newAttachments: Attachment[]) => void;
}

export default function FileDrop({
  filesLength,
  onSetFiles,
}: FileDropProperties) {
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    if (acceptedFiles.length + filesLength > 20) {
      toast({
        title: 'Você excedeu o número máximo de 20 arquivos.',
        className: 'dark bg-dark-blue text-white stroke-white',
      });
      return;
    }

    onSetFiles(acceptedFiles.map((file) => ({ file, key: nanoid() })));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 20,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/vnd.ms-excel': ['.xls'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
  });

  const onMaxLength = (): void => {
    if (filesLength === 20) {
      toast({
        title: 'Você excedeu o número máximo de 20 arquivos.',
        className: 'dark bg-dark-blue text-white stroke-white',
      });
    }
  };

  return (
    <div
      className="flex-col-center cursor-pointer gap-2 p-2"
      {...(filesLength === 20
        ? {
            onClick: onMaxLength,
            onDrop: onMaxLength,
          }
        : getRootProps())}
    >
      <input {...(filesLength === 20 ? {} : getInputProps())} />
      <Download
        size={40}
        color="#2788B1"
        className={twMerge(isDragActive && 'animate-bounce')}
      />
      <p className="text-gray-scale-300">Selecione arquivos ou arraste aqui</p>
      <div className="text-gray-scale-400 text-center text-sm">
        {filesLength > 1 ? `${filesLength} arquivos selecionados` : ''} <br />
        Número máximo de arquivos: <b>20</b>
        <br />
        Tipos de arquivos aceitos:{' '}
        <b>.png, .jpg, .jpeg, .pdf, .xlsx, .xls, .doc, .docx</b>
      </div>
    </div>
  );
}
