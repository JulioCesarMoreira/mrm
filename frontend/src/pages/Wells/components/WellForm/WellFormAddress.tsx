import { Input } from '@components/Input';
import { removeSpecialCharacters } from '@lib/utils';
import { Check, Pencil } from 'lucide-react';
import { ReactElement, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export default function WellFormAddress({
  isAdding,
}: {
  isAdding?: boolean;
}): ReactElement {
  const { control } = useFormContext();

  const [isEditingUrl, setIsEditingUrl] = useState(isAdding);

  const formWatch = useWatch({ control });

  const onToggleEditingUrl = () => setIsEditingUrl((previous) => !previous);

  return (
    <div className="my-4 w-full">
      <p className="text-gray-scale-300 text-lg font-semibold">Endereço</p>

      <div className="grid grid-flow-row grid-cols-12 gap-4">
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Logradouro" />
          <Input.Field
            name={isAdding ? 'well.street' : 'street'}
            maxLength={200}
          />
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Número" />
          <Input.Field
            name={isAdding ? 'well.number' : 'number'}
            maskType="numberWithoutDecimals"
            maxLength={10}
          />
        </Input.Wrapper>

        <Input.Wrapper className="col-span-3">
          <Input.Label label="Bairro" />
          <Input.Field
            name={isAdding ? 'well.distric' : 'distric'}
            maxLength={100}
          />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="CEP" />
          <Input.Field
            name={isAdding ? 'well.zipcode' : 'zipcode'}
            maskType="cep"
            rules={{
              validate: (value: string): string | undefined =>
                removeSpecialCharacters(value).length > 0 &&
                removeSpecialCharacters(value).length < 8
                  ? 'CEP inválido'
                  : undefined,
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Estado" />
          <Input.Field name={isAdding ? 'well.city.uf' : 'city.uf'} />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Cidade" />
          <Input.Field
            name={isAdding ? 'well.city.name' : 'city.name'}
            maxLength={100}
          />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Latitude" />
          <Input.Field
            name={isAdding ? 'well.latitude' : 'latitude'}
            maxLength={20}
          />
        </Input.Wrapper>
        <Input.Wrapper className="col-span-3">
          <Input.Label label="Longitude" />
          <Input.Field
            name={isAdding ? 'well.longitude' : 'longitude'}
            maxLength={20}
          />
        </Input.Wrapper>

        <div className="col-span-6 flex h-12 items-center gap-4">
          {isEditingUrl ? (
            <Input.Wrapper className="w-full">
              <Input.Label label="URL para o mapa" />
              <Input.Field
                name={isAdding ? 'well.mapLink' : 'mapLink'}
                maxLength={2000}
              />
            </Input.Wrapper>
          ) : (
            <div className="h-[50px] w-full">
              <p className="text-gray-scale-500 text-sm">URL</p>
              <a
                target="_blank"
                href={isAdding ? formWatch.well.mapLink : formWatch.mapLink}
                className="text-sm text-blue-300 underline"
              >
                {isAdding ? formWatch.well.mapLink : formWatch.mapLink}
              </a>
            </div>
          )}
          <button
            type="button"
            onClick={onToggleEditingUrl}
            className="flex-center group mt-5"
          >
            {isEditingUrl ? (
              <Check
                size={20}
                color="#797E86"
                className="group-hover:stroke-hidro-blue-300 duration-200"
              />
            ) : (
              <Pencil
                size={20}
                color="#797E86"
                className="group-hover:stroke-hidro-blue-300 duration-200"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
