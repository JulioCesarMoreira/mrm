import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import NumberFormat, {
  NumberFormatProps,
  NumberFormatValues,
} from 'react-number-format';
import generateMaskTypes, { MaskTypes } from './masks';

interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  rules?: RegisterOptions;
  maskType?: MaskTypes;
  children?: ReactNode;
  required?: boolean;
}

export default function InputField({
  name,
  disabled,
  loading,
  className,
  rules,
  children,
  maskType,
  required,
  ...properties
}: InputProperties): ReactElement {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [focus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState(
    (properties.value as string | undefined) ?? '',
  );

  const inputReference = useRef(null);

  const error = errors[name];

  const errorMessage =
    error && error.type === 'required'
      ? 'Campo obrigatório'
      : (error?.message as string);

  const onChangeValue = (data: NumberFormatValues): void => {
    setValue(data.value);
  };

  const onFocus = (): void => setFocus(true);
  const onBlur = (): void => setFocus(false);

  const maskTypes = generateMaskTypes(value);

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
          render={({ field }) =>
            maskType ? (
              <NumberFormat
                {...(properties as NumberFormatProps)}
                {...field}
                disabled={disabled}
                className={twMerge(
                  'bg-gray-scale-900 h-[30px] max-h-[30px] w-full rounded-md border-0 py-0.5 px-2 text-sm !shadow-none ring-0 !ring-transparent focus:outline-none',
                  disabled
                    ? 'bg-gray-scale-800 !cursor-not-allowed select-none shadow-none'
                    : '',
                )}
                onFocus={onFocus}
                {...maskTypes[maskType]}
                onValueChange={onChangeValue}
                getInputRef={inputReference}
                ref={inputReference}
              />
            ) : (
              <input
                {...properties}
                {...field}
                disabled={disabled}
                className={twMerge(
                  'bg-gray-scale-900 h-[30px] max-h-[30px] w-full rounded-md border-0 py-0.5 px-2 text-sm !shadow-none ring-0 !ring-transparent focus:outline-none',
                  disabled
                    ? 'bg-gray-scale-800 !cursor-not-allowed select-none shadow-none'
                    : '',
                )}
                ref={inputReference}
                onFocus={onFocus}
              />
            )
          }
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
