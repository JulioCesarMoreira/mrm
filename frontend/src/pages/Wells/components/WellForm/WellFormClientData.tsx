import { ReactElement } from 'react';
import { Well } from '../../types';

export default function WellFormClientData({
  well,
}: {
  well: Well;
}): ReactElement {
  return (
    <div className="my-4 w-full">
      <p className="text-gray-scale-300 text-lg font-semibold">
        Dados do cliente
      </p>

      <div className="flex w-full gap-10">
        <div>
          <p className="text-gray-scale-500 text-sm">Cliente</p>
          <p className="text-gray-scale-200 text-sm">
            {well.clientName ?? 'nome do cliente aqui'}
          </p>
        </div>
        <div>
          <p className="text-gray-scale-500 text-sm">CPF ou CNPJ</p>
          <p className="text-gray-scale-200 text-sm">
            {
              // well.cpfCnpj ??
              'documento do cliente aqui'
            }
          </p>
        </div>

        <div>
          <p className="text-gray-scale-500 text-sm">Telefone do responsável</p>
          <p className="text-gray-scale-200 text-sm">
            {
              // well.contactPhone ??
              'telefone do cliente aqui'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
