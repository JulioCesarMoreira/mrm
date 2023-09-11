import { ReactElement } from 'react';
import WellFormClientData from './WellFormClientData';

export default function WellFormFields(): ReactElement {
  return (
    <div className="mb-4">
      <hr className="w-full" />

      <WellFormClientData />

      <hr className="w-full" />

      <div className="my-4 w-full">
        <p className="text-gray-scale-300 text-lg font-semibold">
          Dados do poço
        </p>
      </div>

      <hr className="w-full" />

      <div className="my-4 w-full">
        <p className="text-gray-scale-300 text-lg font-semibold">Endereço</p>
      </div>
    </div>
  );
}
