import { ReactElement } from 'react';

export default function WellFormClientData(): ReactElement {
  return (
    <div className="my-4 w-full">
      <p className="text-gray-scale-300 text-lg font-semibold">
        Dados do cliente
      </p>

      <div className="flex w-full gap-10">
        <div>
          <p className="text-gray-scale-500 text-sm">Cliente</p>
          <p className="text-gray-scale-200 text-sm">Construtora rotrtas</p>
        </div>
        <div>
          <p className="text-gray-scale-500 text-sm">CPF ou CNPJ</p>
          <p className="text-gray-scale-200 text-sm">Construtora rotrtas</p>
        </div>

        <div>
          <p className="text-gray-scale-500 text-sm">
            Telefone do responsável
            <p className="text-gray-scale-200 text-sm">Construtora rotrtas</p>
          </p>
        </div>
      </div>
    </div>
  );
}
