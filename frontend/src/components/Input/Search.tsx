import { Button } from '@components/ui/button';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from '@components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { cn, normalizeString } from '@lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState, type ReactElement, useEffect, ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { Option } from 'types';

interface SearchProperties {
  name: string;
  placeholder: string;
  options: Option[];
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  defaultValue?: string;
}

export default function Search({
  name,
  options,
  placeholder,
  defaultValue,
  disabled,
  loading,
  required,
}: SearchProperties): ReactElement {
  const { control, setValue, clearErrors } = useFormContext();
  const [openOptions, setOpenOptions] = useState(false);

  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    defaultValue,
    rules: disabled ? undefined : { required },
  });

  function onSelectOption(value: string): void {
    console.log('value', value);
    setValue(name, value);
    setOpenOptions(false);
  }

  const error = errors[name];
  const errorMessage =
    error && error.type === 'required'
      ? 'Campo obrigatório'
      : (error?.message as string);

  useEffect(() => {
    if (defaultValue) setValue(name, defaultValue);
  }, []);

  useEffect(() => {
    if (field.value) clearErrors(name);
  }, [field.value]);

  return loading ? (
    <div className="h-[30px] w-full animate-pulse rounded-md" />
  ) : (
    <Popover open={openOptions} onOpenChange={setOpenOptions}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          aria-expanded={openOptions}
          className={cn(
            'relative h-[30px] justify-between font-normal disabled:select-none',
            error ? 'border-red-auxiliary' : '',
          )}
        >
          {field.value
            ? options.find((option) => option.value === field.value)?.name
            : 'Selecione um cliente'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          {error && errorMessage && (
            <div className="text-red-auxiliary absolute top-8 left-0 text-xs">
              {errorMessage}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-[30px]" />

          <CommandList>
            <CommandEmpty>Nada encontrado.</CommandEmpty>
            {options.map(({ name, value }) => (
              <CommandItem
                onSelect={(currentValue): void => onSelectOption(currentValue)}
                key={value}
              >
                <Check
                  className={cn(
                    'stroke-dark-blue mr-2 h-4 w-4',
                    value === field.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
