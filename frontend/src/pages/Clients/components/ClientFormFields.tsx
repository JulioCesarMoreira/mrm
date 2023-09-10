import { Input } from '@components/FormFields/Input';
import type { ReactElement } from 'react';
import type { ClientFields } from '../types';

interface ClientFormFields {
  defaultValues: ClientFields;
}

export default function ClientFormFields({
  defaultValues,
}: ClientFormFields): ReactElement {
  return (
    <div className="mb-8 grid grid-flow-row grid-cols-12 gap-6">
      <Input.Wrapper className="col-span-full">
        <Input.Label label="Nome" required />
        <Input.Field
          id="name"
          name="name"
          placeholder="Insira o nome do cliente"
        />
      </Input.Wrapper>
      <Input.Wrapper className="col-span-full">
        <Input.Label label="Nome do contato" required />
        <Input.Field
          id="contactName"
          name="contactName"
          placeholder="Insira o nome do contato"
        />
      </Input.Wrapper>

      <Input.Wrapper className="col-span-6">
        <Input.Label label="CPF / CNPJ" required />
        <Input.Field
          id="cpfCnpj"
          name="cpfCnpj"
          placeholder="Documento do cliente"
          disabled={!!defaultValues.id}
          maskType="cpf-cnpj"
        />
      </Input.Wrapper>

      <Input.Wrapper className="col-span-6">
        <Input.Label label="Celular / Telefone" required />
        <Input.Field
          id="contactPhone"
          name="contactPhone"
          placeholder="Contato do cliente"
          maskType="tel"
        />
      </Input.Wrapper>
    </div>
  );
}
