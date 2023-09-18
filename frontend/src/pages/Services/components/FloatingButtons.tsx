import { Button } from '@components/ui/button';
import AttachmentsDialog from './Attachments/AttachmentsDialog';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function FloatingButtons(): ReactElement {
  return (
    <>
      <div className="absolute bottom-0 left-0 mb-6 ml-6">
        <AttachmentsDialog />
      </div>

      <div className="flex-center absolute bottom-0 right-0 mb-6 mr-6 gap-4">
        <Link to="/servicos">
          <Button
            type="button"
            variant={'secondary'}
            className="hover:bg-gray-scale-700 bg-gray-scale-800 border-gray-scale-700 w-28 rounded-full border px-4 py-2 transition-colors duration-200"
          >
            Cancelar
          </Button>
        </Link>
        <Button
          type="submit"
          className="bg-hidro-blue-300 hover:bg-main-blue w-28 rounded-full px-4 py-2 text-white"
        >
          Salvar
        </Button>
      </div>
    </>
  );
}
