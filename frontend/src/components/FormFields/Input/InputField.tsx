import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  RegisterOptions,
  useController,
  useFormContext,
} from 'react-hook-form';
import type {
  FocusEvent,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import { PatternFormat } from 'react-number-format';
import { CPF_LIMIT } from 'constants/index';

type MaskTypes = 'cpf-cnpj';

interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  rules?: RegisterOptions;
  maskType?: MaskTypes;
  children?: ReactNode;
}

export default function InputField({
  name,
  disabled,
  loading,
  className,
  rules,
  children,
  maskType,
  ...properties
}: InputProperties): ReactElement {
  const { control } = useFormContext();
  const [mask, setMask] = useState('');
  const [focus, setFocus] = useState<boolean>(false);

  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    rules: disabled ? undefined : { required: true, ...rules },
  });

  const error = errors[name];
  const errorMessage =
    error && error.type === 'required'
      ? 'Campo obrigatório'
      : (error?.message as string);

  const onFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>): void => {
      if (properties.onFocus) {
        properties.onFocus(event);
      }
      setFocus(true);
    },
    [properties],
  );

  const onBlur = useCallback((): void => {
    setFocus(false);
  }, []);

  useEffect(() => {
    if (field.value && field.value.replace(/[^0-9]/g, '').length < CPF_LIMIT) {
      setMask('###.###.###-#####');
      return;
    }
    setMask('##.###.###/####-##');
  }, [field.value]);

  return loading ? (
    <div className="h-[40px] w-full animate-pulse rounded-md" />
  ) : (
    <div className="relative">
      <div
        className={twMerge(
          'bg-gray-scale-900 ring-gray-scale-800 relative flex max-h-[40px] w-full cursor-text items-center rounded-md p-[2px] ring-1 duration-200',
          disabled ? 'bg-gray-scale-800 !cursor-not-allowed shadow-none' : '',
          focus && !error ? 'ring-hidro-blue-500' : '',
          className ?? '',
          error && !disabled ? 'ring-red-auxiliary shadow-shadow-error' : '',
        )}
        onBlur={onBlur}
        role="textbox"
        tabIndex={-1}
      >
        {
          // <PatternFormat
          //   {...properties}
          //   {...field}
          //   defaultValue={field.value}
          //   type="text"
          //   disabled={disabled}
          //   className={twMerge(
          //     'text-body bg-gray-scale-900 h-[40px] max-h-[40px] w-full rounded-md border-0 py-0.5 px-2 !shadow-none ring-0 !ring-transparent focus:outline-none',
          //     disabled
          //       ? 'bg-gray-scale-800 !cursor-not-allowed select-none shadow-none'
          //       : '',
          //   )}
          //   onFocus={onFocus}
          //   format={mask}
          // />
        }
        <input
          {...properties}
          {...field}
          disabled={disabled}
          className={twMerge(
            'text-body bg-gray-scale-900 h-[40px] max-h-[40px] w-full rounded-md border-0 py-0.5 px-2 !shadow-none ring-0 !ring-transparent focus:outline-none',
            disabled
              ? 'bg-gray-scale-800 !cursor-not-allowed select-none shadow-none'
              : '',
          )}
          onFocus={onFocus}
        />
        {children}
      </div>
      {error && errorMessage && (
        <div className="text-red-auxiliary absolute text-xs">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
