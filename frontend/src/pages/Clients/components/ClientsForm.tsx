import FormWrapper from '@components/FormWrapper/FormWrapper';
import { ReactElement } from 'react';
import { ClientFields } from '../types';
import { Input } from '@components/FormFields/Input';
import { Button } from '@components/ui/button';
import { DialogTrigger } from '@components/ui/dialog';

interface ClientsFormProperties {
  defaultValues: ClientFields;
}

export default function ClientsForm({
  defaultValues,
}: ClientsFormProperties): ReactElement {
  function onSubmit(data: ClientFields): void {
    console.log('data', data);
  }

  return (
    <FormWrapper<ClientFields>
      id="client-form"
      onSubmit={onSubmit}
      className="py-4"
      defaultValues={defaultValues}
    >
      <div className="mb-4 grid grid-flow-row grid-cols-12 gap-4">
        <Input.Wrapper className="col-span-full">
          <Input.Label label="Nome" required />
          <Input.Field
            id="name"
            name="name"
            placeholder="Insira o nome do cliente"
          />
        </Input.Wrapper>

        <Input.Wrapper className="col-span-6">
          <Input.Label label="CPF / CNPJ" required />
          <Input.Field
            id="cpfCnpj"
            name="cpfCnpj"
            placeholder="Insira o documento do cliente"
          />
        </Input.Wrapper>

        <Input.Wrapper className="col-span-6">
          <Input.Label label="Celular / Telefone" required />
          <Input.Field
            id="contactPhone"
            name="contactPhone"
            placeholder="Insira o celular ou telefone do cliente"
          />
        </Input.Wrapper>
      </div>

      <hr className="w-full" />

      <div className="-mb-4 flex w-full flex-row-reverse gap-4 pt-4">
        <Button
          type="submit"
          variant={'default'}
          className="bg-hidro-blue-300 hover:bg-main-blue text-white"
        >
          Salvar
        </Button>
        <DialogTrigger>
          <Button
            variant={'secondary'}
            className="hover:bg-gray-scale-700 transition-colors duration-200"
          >
            Cancelar
          </Button>
        </DialogTrigger>
      </div>
    </FormWrapper>
  );
}
