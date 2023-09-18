import { ReactElement } from 'react';
import { Well } from '../../types';
import { Input } from '@components/Input';

export default function WellFormFields({
  well,
  isAdding,
}: {
  well: Well;
  isAdding?: boolean;
}): ReactElement {
  return (
    <div className="my-6 w-full">
      <p className="text-gray-scale-300 text-lg font-semibold">Dados do poço</p>
      <div className="grid grid-flow-row grid-cols-12 gap-4">
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Voltagem" required />
          <Input.Select
            name={isAdding ? 'well.voltage' : 'voltage'}
            defaultValue={well.voltage}
            options={[
              { name: 'V110', value: 'V110' },
              { name: 'V220', value: 'V220' },
            ]}
          />
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Profundidade Total" required />
          <Input.Field
            required
            name={isAdding ? 'well.totalDepth' : 'totalDepth'}
            maskType="numberWithoutDecimals"
          >
            <p className="text-gray-scale-300 mr-2 text-xs">metros</p>
          </Input.Field>
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Profundidade de Crivo" required />
          <Input.Field
            required
            name={isAdding ? 'well.sieveDepth' : 'sieveDepth'}
            maskType="numberWithoutDecimals"
          >
            <p className="text-gray-scale-300 mr-2 text-xs">metros</p>
          </Input.Field>
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Profundidade Sedimentar" required />
          <Input.Field
            required
            name={isAdding ? 'well.sedimentaryDepth' : 'sedimentaryDepth'}
            maskType="numberWithoutDecimals"
          >
            <p className="text-gray-scale-300 mr-2 text-xs">metros</p>
          </Input.Field>
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Nível Dinâmico" required />
          <Input.Field
            required
            name={isAdding ? 'well.dynamicLevel' : 'dynamicLevel'}
            maskType="numberWithoutDecimals"
          >
            <p className="text-gray-scale-300 mr-2 text-xs">metros</p>
          </Input.Field>
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Nível Estático" required />
          <Input.Field
            required
            name={isAdding ? 'well.staticLevel' : 'staticLevel'}
            maskType="numberWithoutDecimals"
          >
            <p className="text-gray-scale-300 mr-2 text-xs">metros</p>
          </Input.Field>
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Data de Entrega" required />
          <Input.DatePicker
            name={isAdding ? 'well.deliveryDate' : 'deliveryDate'}
          />
        </Input.Wrapper>
      </div>
    </div>
  );
}
