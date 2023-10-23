import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  Controller,
  RegisterOptions,
  useController,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import type { InputHTMLAttributes, ReactElement } from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import generateMaskTypes from './masks';
import { Calendar as CalendarIcon } from 'lucide-react';
import { PopoverContent } from '@components/ui/popover';
import { Calendar } from '@components/ui/calendar';
import { Button } from '@components/ui/button';
import { PopoverTrigger } from '@components/ui/popover';
import { Popover } from '@components/ui/popover';
import { format, isValid } from 'date-fns';
import { removeSpecialCharacters } from '@lib/utils';

interface DatePickerProperties extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  rules?: RegisterOptions;
}

export default function DatePicker({
  name,
  disabled,
  loading,
  className,
  rules,
  required,
  ...properties
}: DatePickerProperties): ReactElement {
  const { control, formState, setValue } = useFormContext();
  const [focus, setFocus] = useState<boolean>(false);
  const [date, setDate] = useState(
    (properties.value as string | undefined) ?? '',
  );

  const [openCalendar, setOpenCalendar] = useState(false);

  const inputReference = useRef(null);

  const nameParts = name.split('.');

  // Use a reducer to access nested fields
  const error = nameParts.reduce(
    (errors, part) => errors && errors[part],
    formState.errors,
  );

  const errorMessage =
    error && error.type === 'required'
      ? 'Campo obrigatório'
      : (error?.message as string);

  const onFocus = (): void => setFocus(true);
  const onBlur = (): void => setFocus(false);

  const onSelectDate = (_: Date | undefined, selectedDay: Date): void => {
    const formattedDate = format(selectedDay, 'ddMMyyyy');
    setValue(name, formattedDate);
    setOpenCalendar(false);
  };

  const fieldValue = useWatch({ control, name });

  useEffect(() => {
    const formattedFieldValue = removeSpecialCharacters(fieldValue ?? '');
    if (formattedFieldValue.length === 8) {
      setDate(formattedFieldValue);
    }
  }, [fieldValue]);

  const newDateValue = new Date(
    parseInt(date.substring(4, 8), 10),
    parseInt(date.substring(2, 4), 10) - 1,
    parseInt(date.substring(0, 2), 10),
  );

  const selected = isValid(newDateValue) ? newDateValue : new Date();

  const mask = generateMaskTypes(date);

  return loading ? (
    <div className="h-[30px] w-full animate-pulse rounded-md" />
  ) : (
    <div className="relative">
      <div
        className={twMerge(
          'bg-gray-scale-900 ring-gray-scale-800 relative flex max-h-[30px] w-full cursor-text items-center rounded-md p-[2px] ring-1 duration-200',
          disabled ? 'bg-gray-scale-800 !cursor-not-allowed shadow-none' : '',
          focus && !error ? 'ring-hidro-blue-500' : '',
          className ?? '',
          error && !disabled ? 'ring-red-auxiliary shadow-shadow-error' : '',
        )}
        onBlur={onBlur}
        role="textbox"
        tabIndex={-1}
      >
        <Controller
          name={name}
          control={control}
          rules={disabled ? undefined : { required, ...rules }}
          render={({ field }) => (
            <NumberFormat
              {...(properties as NumberFormatProps)}
              {...field}
              disabled={disabled}
              className={twMerge(
                'text-body bg-gray-scale-900 h-[30px] max-h-[30px] w-full rounded-md border-0 py-0.5 px-2 !shadow-none ring-0 !ring-transparent focus:outline-none',
                disabled
                  ? 'bg-gray-scale-800 !cursor-not-allowed select-none shadow-none'
                  : '',
              )}
              onFocus={onFocus}
              getInputRef={inputReference}
              ref={inputReference}
              {...mask['date']}
            />
          )}
        />

        <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="group hover:bg-transparent">
              <CalendarIcon
                size={18}
                color="#797E86"
                className="group-hover:stroke-hidro-blue-300 duration-200"
              />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selected}
              defaultMonth={selected}
              onSelect={onSelectDate}
            />
          </PopoverContent>
        </Popover>
      </div>

      {error && errorMessage && (
        <div className="text-red-auxiliary absolute text-xs">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
