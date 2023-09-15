import { Input } from '@components/Input';
import { ReactElement } from 'react';

export default function WellFormAddress(): ReactElement {
  return (
    <div className="my-4 w-full">
      <p className="text-gray-scale-300 text-lg font-semibold">Endereço</p>

      <div className="grid grid-flow-row grid-cols-12 gap-4">
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Logradouro" required />
          <Input.Field name="street" />
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Número" />
          <Input.Field name="number" maskType="numberWithoutDecimals" />
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Bairro" />
          <Input.Field name="district" />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="CEP" />
          <Input.Field name="zipcode" maskType="cep" />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Estado" />
          <Input.Field name="uf" />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Cidade" />
          <Input.Field name="city" />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Latitude" />
          <Input.Field name="latitude" />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Longitude" />
          <Input.Field name="longitude" />
        </Input.Wrapper>

        {/* TODO */}
        <div>
          <p className="text-gray-scale-500 text-sm">URL</p>
          <a
            target="_blank"
            href="https://www.google.com"
            className="text-sm text-blue-300 underline"
          >
            https://www.google.com
          </a>
        </div>
      </div>
    </div>
  );
}
