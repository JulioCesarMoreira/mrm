import { ReactElement } from 'react';
import { Well } from '../../types';
import NumberFormat from 'react-number-format';
import { CPF_LIMIT, formatPhone } from 'constants/index';

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
          <p className="text-gray-scale-200 text-sm">{well.client.name}</p>
        </div>
        <div>
          <p className="text-gray-scale-500 text-sm">CPF ou CNPJ</p>
          <NumberFormat
            displayType="text"
            value={well.client.cpfCnpj}
            className="text-gray-scale-200 text-sm"
            format={
              well.client.cpfCnpj.length < CPF_LIMIT
                ? '###.###.###-#####'
                : '##.###.###/####-##'
            }
          />
        </div>

        <div>
          <p className="text-gray-scale-500 text-sm">Telefone do responsável</p>
          <div className="text-gray-scale-200 text-sm">
            {formatPhone(well.client.contactPhone)}
          </div>
        </div>
      </div>
    </div>
  );
}
