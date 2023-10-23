import { Input } from '@components/Input';
import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import type { ClientFields } from '../types';
import {
  cn,
  isValidCnpj,
  isValidCpf,
  removeSpecialCharacters,
} from '@lib/utils';
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
          maxLength={200}
        />
      </Input.Wrapper>
      <Input.Wrapper className="col-span-full">
        <Input.Label label="Nome do contato" required />
        <Input.Field
          name="contactName"
          placeholder="Insira o nome do contato"
          required
          maxLength={100}
        />
      </Input.Wrapper>
      <Input.Wrapper className="col-span-6">
        <Input.Label label="Celular / Telefone" required />
        <Input.Field
          name="contactPhone"
          placeholder="Contato do cliente"
          maskType="tel"
          required
          rules={{
            validate: (value: string): string | undefined =>
              removeSpecialCharacters(value).length < 10
                ? 'Número inválido'
                : undefined,
          }}
        />
      </Input.Wrapper>

      <hr className="col-span-full w-full" />

      <div className="text-gray-scale-300 col-span-6 mt-0.5 text-sm">
        <div>Tipo do documento do cliente:</div>

        <div className="mt-2 flex items-center gap-4">
          <button
            type="button"
            onClick={onChangeToCpf}
            className="flex items-center gap-2"
          >
            <span
              className={cn(
                'h-5 w-5 rounded-full border-2 border-gray-300',
                documentType === 'cpf' ? 'bg-hidro-blue-300' : 'bg-white',
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
                'h-5 w-5 rounded-full border-2 border-gray-300',
                documentType === 'cnpj' ? 'bg-hidro-blue-300' : 'bg-white',
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
                const valueWithoutSpecialCharacters =
                  removeSpecialCharacters(value);

                if (valueWithoutSpecialCharacters.length < 11)
                  return 'Documento incompleto';

                if (!isValidCpf(valueWithoutSpecialCharacters))
                  return 'CPF inválido';
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
              validate: (value: string): string | undefined => {
                const valueWithoutSpecialCharacters =
                  removeSpecialCharacters(value);

                if (valueWithoutSpecialCharacters.length < 14)
                  return 'Documento incompleto';

                if (!isValidCnpj(valueWithoutSpecialCharacters))
                  return 'CNPJ inválido';
              },
            }}
            maskType="cnpj"
            disabled={!!defaultValues.id}
          />
        </Input.Wrapper>
      )}
    </div>
  );
}
