import { Input } from '@components/Input';
import type { ReactElement } from 'react';
import type { ClientFields } from '../types';

interface ClientFormFieldsProperties {
  defaultValues: ClientFields;
}

export default function ClientFormFields({
  defaultValues,
}: ClientFormFieldsProperties): ReactElement {
  return (
    <div className="mb-8 grid grid-flow-row grid-cols-12 gap-6">
      <Input.Wrapper className="col-span-full">
        <Input.Label label="Nome" required />
        <Input.Field
          name="name"
          placeholder="Insira o nome do cliente"
          required
        />
      </Input.Wrapper>
      <Input.Wrapper className="col-span-full">
        <Input.Label label="Nome do contato" required />
        <Input.Field
          name="contactName"
          placeholder="Insira o nome do contato"
          required
        />
      </Input.Wrapper>

      <Input.Wrapper className="col-span-6">
        <Input.Label label="CPF / CNPJ" required />
        <Input.Field
          name="cpfCnpj"
          placeholder="Documento do cliente"
          disabled={!!defaultValues.id}
          maskType="cpf-cnpj"
          required
        />
      </Input.Wrapper>

      <Input.Wrapper className="col-span-6">
        <Input.Label label="Celular / Telefone" required />
        <Input.Field
          name="contactPhone"
          placeholder="Contato do cliente"
          maskType="tel"
          required
        />
      </Input.Wrapper>
    </div>
  );
}
