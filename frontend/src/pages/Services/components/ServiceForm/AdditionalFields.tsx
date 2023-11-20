import { Input } from '@components/Input';
import { ReactElement } from 'react';

export default function AdditionalFields({
  isLoading,
}: {
  isLoading: boolean;
}): ReactElement {
  return (
    <div className="flex h-[74px] items-center justify-start gap-4 pl-5 pb-4">
      <Input.Wrapper className="w-[140px]">
        <Input.Label label="Desconto" />
        <Input.Field
          name="discount"
          maskType="money"
          className="pl-6"
          disabled={isLoading}
        >
          <div className="text-gray-scale-200 absolute left-2 text-sm">R$</div>
        </Input.Field>
      </Input.Wrapper>

      <Input.Wrapper className="w-[140px]">
        <Input.Label label="Garantia (meses)" required />
        <Input.Field
          name="guaranteePeriod"
          maskType="numberWithoutDecimals"
          placeholder="meses"
          required
          disabled={isLoading}
        />
      </Input.Wrapper>
    </div>
  );
}
