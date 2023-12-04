import {
  Select as SelectWrapper,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from '@components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { Fragment, ReactElement, useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { Option } from 'types';

interface SelectProperties {
  name: string;
  options: Option[];
  defaultValue?: string;
  disabled?: boolean;
  loading?: boolean;
  renderOption?: (option: Option) => ReactElement;
  renderValue?: (value: string) => ReactElement;
}

export default function Select({
  name,
  options,
  defaultValue,
  disabled,
  loading,
  renderOption,
  renderValue,
}: SelectProperties): ReactElement {
  const { control, setValue } = useFormContext();

  const { field } = useController({
    name,
    control,
    defaultValue,
  });

  useEffect(() => {
    if (defaultValue) setValue(name, defaultValue);
  }, []);

  return loading ? (
    <div className="h-[30px] w-full animate-pulse rounded-md" />
  ) : (
    <SelectWrapper
      onValueChange={field.onChange}
      defaultValue={defaultValue ?? field.value}
      name="name"
      disabled={disabled}
    >
      <SelectTrigger
        className={twMerge(
          'ring-gray-scale-800 duration-20 focus:ring-hidro-blue-500 bg-gray-scale-900 relative flex  h-[30px] max-h-[30px] w-full cursor-pointer items-center rounded-md p-[2px] py-0.5 px-2 text-sm !shadow-none !outline-none ring-0 focus:ring-1',
          disabled
            ? 'bg-gray-scale-800 !cursor-not-allowed select-none shadow-none'
            : '',
        )}
      >
        <SelectValue
          placeholder={
            renderValue
              ? undefined
              : options.find((option) => option.value === field.value)?.name ??
                'Selecione'
          }
        >
          {renderValue && renderValue(field.value)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[30vh]">
        {options.map(({ name, value }) =>
          renderOption ? (
            <Fragment key={value}>{renderOption({ name, value })}</Fragment>
          ) : (
            <SelectItem
              key={value}
              value={value}
              className="h-[30px] cursor-pointer"
            >
              {name}
            </SelectItem>
          ),
        )}
      </SelectContent>
    </SelectWrapper>
  );
}
