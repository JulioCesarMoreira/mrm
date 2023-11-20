import { Button } from '@components/ui/button';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import AttachmentsDialog from '../Attachments/AttachmentsDialog';

export default function FloatingButtons({
  isLoading,
}: {
  isLoading: boolean;
}): ReactElement {
  return (
    <>
      <div className="absolute bottom-0 left-0 mb-6 ml-6">
        <AttachmentsDialog />
      </div>

      <div className="flex-center absolute bottom-0 right-0 mb-6 mr-6 gap-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-hidro-blue-300 hover:bg-main-blue w-28 rounded-full px-4 py-2 text-white"
        >
          Salvar
        </Button>
        <Link to="/servicos">
          <Button
            type="button"
            disabled={isLoading}
            variant={'secondary'}
            className="hover:bg-gray-scale-700 bg-gray-scale-800 border-gray-scale-700 w-28 rounded-full border px-4 py-2 transition-colors duration-200"
          >
            Cancelar
          </Button>
        </Link>
      </div>
    </>
  );
}
