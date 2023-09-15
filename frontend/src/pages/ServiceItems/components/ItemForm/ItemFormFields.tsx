import { Input } from '@components/Input';
import {
  CategoryService,
  ItemServiceFields,
  Status,
} from 'pages/ServiceItems/types';
import type { ReactElement } from 'react';

interface ItemFormFieldsProperties {
  defaultValues: ItemServiceFields;
  categories: CategoryService[];
}

export default function ItemFormFields({
  categories,
  defaultValues,
}: ItemFormFieldsProperties): ReactElement {
  return (
    <div className="mb-8 grid grid-flow-row grid-cols-12 gap-6">
      <Input.Wrapper className="col-span-full">
        <Input.Label label="Nome do item" required />
        <Input.Field
          name="name"
          placeholder="Insira um nome para o item"
          required
        />
      </Input.Wrapper>

      <Input.Wrapper className="col-span-full">
        <Input.Label label="Unidade de medição" required />
        <Input.Field name="unit" placeholder="Ex: cm" maxLength={3} required />
      </Input.Wrapper>

      <Input.Wrapper className="col-span-full">
        <Input.Label label="Categoria" required />
        <Input.Select
          name="categoryServiceId"
          defaultValue={
            defaultValues.categoryServiceId
              ? String(defaultValues.categoryServiceId)
              : String(categories[0].id)
          }
          options={categories.map(({ id, name }) => ({
            name,
            value: String(id),
          }))}
        />
      </Input.Wrapper>

      <Input.Wrapper className="col-span-full">
        <Input.Label label="Status" required />
        <Input.Select
          name="status"
          defaultValue={defaultValues.status}
          options={[
            { name: 'Disponível', value: Status.AVAILABLE },
            { name: 'Indisponível', value: Status.UNAVAILABLE },
          ]}
        />
      </Input.Wrapper>

      <Input.Wrapper className="col-span-full">
        <Input.Label label="Descrição" />
        <Input.Field
          name="description"
          placeholder="Adicione uma descrição do item"
        />
      </Input.Wrapper>
    </div>
  );
}
