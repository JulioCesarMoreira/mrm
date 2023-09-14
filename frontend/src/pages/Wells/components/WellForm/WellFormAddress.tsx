import { Input } from '@components/Input';
import { ReactElement } from 'react';

export default function WellFormAddress(): ReactElement {
  return (
    <div className="my-4 w-full">
      <p className="text-gray-scale-300 text-lg font-semibold">Endereço</p>

      <div className="grid grid-flow-row grid-cols-12 gap-4">
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Logradouro" required />
          <Input.Field id="street" name="street" />
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Número" />
          <Input.Field
            id="number"
            name="number"
            maskType="numberWithoutDecimals"
          />
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Bairro" />
          <Input.Field id="district" name="district" />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="CEP" />
          <Input.Field id="zipcode" name="zipcode" maskType="cep" />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Estado" />
          <Input.Field id="uf" name="uf" />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Cidade" />
          <Input.Field id="city" name="city" />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Latitude" />
          <Input.Field id="latitude" name="latitude" />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Longitude" />
          <Input.Field id="longitude" name="longitude" />
        </Input.Wrapper>

        <div>
          <p className="text-gray-scale-500 text-sm">URL</p>
          <p className="text-sm text-blue-300 underline">url aqui</p>
        </div>
      </div>
    </div>
  );
}
