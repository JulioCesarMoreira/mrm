import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import type { ReactElement } from 'react';
import type { Option } from 'types';

interface SelectOptionProperties {
  options: Option[];
  label: string;
  placeholder: string;
  open: boolean;
  onToggleOpen: (open: boolean) => void;
  onSelectOption: (option: Option) => void;
}

export default function SelectOptionDialog({
  options,
  placeholder,
  label,
  open,
  onToggleOpen,
  onSelectOption,
}: SelectOptionProperties): ReactElement {
  return (
    <CommandDialog open={open} onOpenChange={onToggleOpen}>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>Nada encontrado.</CommandEmpty>
        <CommandGroup heading={label}>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              className="cursor-pointer"
              onSelect={(): void => onSelectOption(option)}
            >
              {option.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
