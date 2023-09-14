import { ReactElement } from 'react';
import { Well } from '../../types';
import { Input } from '@components/Input';

export default function WellFormFields({ well }: { well: Well }): ReactElement {
  return (
    <div className="my-6 w-full">
      <p className="text-gray-scale-300 text-lg font-semibold">Dados do poço</p>
      <div className="grid grid-flow-row grid-cols-12 gap-4">
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Voltagem" required />
          <Input.Field id="voltage" name="voltage" />
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Profundidade Total" required />
          <Input.Field
            id="totalDepth"
            name="totalDepth"
            maskType="numberWithoutDecimals"
          >
            <p className="text-gray-scale-300 mr-2 text-xs">metros</p>
          </Input.Field>
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Profundidade de Crivo" required />
          <Input.Field
            id="sieveDepth"
            name="sieveDepth"
            maskType="numberWithoutDecimals"
          >
            <p className="text-gray-scale-300 mr-2 text-xs">metros</p>
          </Input.Field>
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Profundidade Sedimentar" required />
          <Input.Field
            id="sedimentaryDepth"
            name="sedimentaryDepth"
            maskType="numberWithoutDecimals"
          >
            <p className="text-gray-scale-300 mr-2 text-xs">metros</p>
          </Input.Field>
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Nível Dinâmico" required />
          <Input.Field
            id="dynamicLevel"
            name="dynamicLevel"
            maskType="numberWithoutDecimals"
          >
            <p className="text-gray-scale-300 mr-2 text-xs">metros</p>
          </Input.Field>
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Nível Estático" required />
          <Input.Field
            id="staticLevel"
            name="staticLevel"
            maskType="numberWithoutDecimals"
          >
            <p className="text-gray-scale-300 mr-2 text-xs">metros</p>
          </Input.Field>
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Data de Entrega" required />
          <Input.DatePicker id="deliveryDate" name="deliveryDate" />
        </Input.Wrapper>
      </div>
    </div>
  );
}
