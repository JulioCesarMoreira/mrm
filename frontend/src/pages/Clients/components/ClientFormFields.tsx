import { Input } from '@components/Input';
import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import type { ClientFields } from '../types';
import { cn, removeSpecialCharacters } from '@lib/utils';
import { useFormContext } from 'react-hook-form';

interface ClientFormFieldsProperties {
  defaultValues: ClientFields;
}

export default function ClientFormFields({
  defaultValues,
}: ClientFormFieldsProperties): ReactElement {
  const { setValue, clearErrors, getValues } = useFormContext<ClientFields>();

  const [documentType, setDocumentType] = useState<'cpf' | 'cnpj'>('cpf');

  const onChangeToCpf = (): void => setDocumentType('cpf');

  const onChangeToCnpj = (): void => setDocumentType('cnpj');

  useEffect(() => {
    clearErrors('cpfCnpj');
    if (documentType === 'cpf')
      setValue('cpfCnpj', getValues('cpfCnpj').substring(0, 14));
  }, [documentType]);

  return (
    <div className="mb-8 grid grid-flow-row grid-cols-12 gap-6">
      <Input.Wrapper className="col-span-full">
        <Input.Label label="Nome do cliente" required />
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
        <Input.Label label="Celular / Telefone" required />
        <Input.Field
          name="contactPhone"
          placeholder="Contato do cliente"
          maskType="tel"
          required
        />
      </Input.Wrapper>

      <hr className="col-span-full w-full" />

      <div
        defaultValue="option-one"
        className="text-gray-scale-300 col-span-6 text-sm"
      >
        <div>Tipo do documento do cliente:</div>

        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={onChangeToCpf}
            className="flex items-center gap-2"
          >
            <span
              className={cn(
                'h-5 w-5 rounded-full border-2 border-gray-400',
                documentType === 'cpf' ? 'bg-gray-600' : 'bg-white',
              )}
            />
            CPF
          </button>
          <button
            type="button"
            onClick={onChangeToCnpj}
            className="flex items-center gap-2"
          >
            <span
              className={cn(
                'h-5 w-5 rounded-full border-2 border-gray-400',
                documentType === 'cnpj' ? 'bg-gray-600' : 'bg-white',
              )}
            />
            CNPJ
          </button>
        </div>
      </div>
      {documentType === 'cpf' ? (
        <Input.Wrapper className="col-span-6">
          <Input.Label label="CPF do cliente" required />
          <Input.Field
            required
            name="cpfCnpj"
            rules={{
              validate: (value: string): string | undefined => {
                console.log('value cpf', value);

                return removeSpecialCharacters(value).length < 11
                  ? 'Documento incompleto'
                  : undefined;
              },
            }}
            maskType="cpf"
            disabled={!!defaultValues.id}
          />
        </Input.Wrapper>
      ) : (
        <Input.Wrapper className="col-span-6">
          <Input.Label label="CNPJ do cliente" required />
          <Input.Field
            required
            name="cpfCnpj"
            rules={{
              validate: (value: string): string | undefined =>
                removeSpecialCharacters(value).length < 14
                  ? 'Documento incompleto'
                  : undefined,
            }}
            maskType="cnpj"
            disabled={!!defaultValues.id}
          />
        </Input.Wrapper>
      )}
    </div>
  );
}
