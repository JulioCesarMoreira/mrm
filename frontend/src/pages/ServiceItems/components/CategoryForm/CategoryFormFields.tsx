import { Input } from '@components/Input';
import { SubCategory } from '../../types';
import type { ReactElement } from 'react';
import { SelectItem } from '@components/ui/select';
import { categoryColorNames, categoryColorOptions } from 'constants/index';

export default function CategoryFormFields({
  defaultColor,
}: {
  defaultColor?: string;
}): ReactElement {
  return (
    <div className="mb-8 grid grid-flow-row grid-cols-12 gap-6">
      <Input.Wrapper className="col-span-full">
        <Input.Label label="Nome" required />
        <Input.Field name="name" placeholder="Ex.: Ferramentas" required />
      </Input.Wrapper>

      <Input.Wrapper className="col-span-full">
        <Input.Label label="Subcategoria" required />
        <Input.Select
          name="subCategory"
          options={[
            { name: 'Serviço', value: SubCategory.SERVICE },
            { name: 'Suprimento', value: SubCategory.SUPLIE },
          ]}
        />
      </Input.Wrapper>

      <Input.Wrapper className="col-span-full">
        <Input.Label label="Selecione uma cor" required />
        <Input.Select
          name="color"
          options={categoryColorOptions}
          defaultValue={defaultColor ?? categoryColorOptions[0].value}
          renderOption={({ value }): ReactElement => (
            <SelectItem
              value={value}
              className="my-1 h-[30px] cursor-pointer"
              style={{ backgroundColor: value }}
            />
          )}
          renderValue={(value): ReactElement => (
            <div className="flex gap-4">
              <div
                className="h-5 w-5 rounded-full"
                style={{ backgroundColor: value }}
              />
              <span>{categoryColorNames.get(value)}</span>{' '}
            </div>
          )}
        />
      </Input.Wrapper>
    </div>
  );
}
