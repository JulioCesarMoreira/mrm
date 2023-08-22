import { useCallback, useState } from 'react';
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

interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  rules?: RegisterOptions;
  children?: ReactNode;
}

export default function InputField({
  name,
  disabled,
  loading,
  className,
  rules,
  children,
  ...properties
}: InputProperties): ReactElement {
  const { control } = useFormContext();

  const baseRules = {
    required: {
      message: 'Campo obrigatório',
      value: !!properties.required,
    },
  };

  const { field, fieldState } = useController({
    name,
    control,
    rules: disabled ? undefined : { ...baseRules, ...rules },
  });

  const error = fieldState.invalid;

  const [focus, setFocus] = useState<boolean>(false);

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

  return loading ? (
    <div className="h-[40px] w-full animate-pulse rounded-md" />
  ) : (
    <div
      className={twMerge(
        'bg-gray-scale-900 ring-gray-scale-800 relative flex max-h-[40px] w-full cursor-text items-center rounded-md p-[1.75px] ring-1 duration-200',
        disabled ? '!pointer-events-none !cursor-not-allowed shadow-none ' : '',
        focus && !error ? 'ring-hidro-blue-500' : '',
        error && focus ? 'shadow-outline ring-1' : '',
        className ?? '',
      )}
      onBlur={onBlur}
      role="textbox"
      tabIndex={-1}
    >
      <input
        {...properties}
        {...field}
        disabled={disabled}
        className={twMerge(
          'text-body bg-gray-scale-900 h-[40px] max-h-[40px] w-full rounded-md border-0 py-0.5 px-2 !shadow-none ring-0 !ring-transparent focus:outline-none',
          disabled
            ? '!pointer-events-none !cursor-not-allowed select-none shadow-none'
            : '',
        )}
        onFocus={onFocus}
      />
      {children}
    </div>
  );
}
