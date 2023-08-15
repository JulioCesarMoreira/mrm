import { ReactElement, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface InputErrorProperties {
  name: string;
  errorMessage?: string;
}

export default function InputError({
  name,
  errorMessage,
}: InputErrorProperties): ReactElement {
  const { control } = useFormContext();

  const { fieldState } = useController({
    name,
    control,
  });

  const hasHookFormError = !!fieldState.error?.message;
  const hasForcedError = !!errorMessage;

  const memoizedErrorMessage = useMemo(() => {
    if (hasForcedError) {
      return errorMessage;
    }

    if (!!fieldState.error && hasHookFormError) {
      return fieldState.error.message;
    }

    return '';
  }, [errorMessage, fieldState.error, hasForcedError, hasHookFormError]);

  return (
    <div className="text-sub text-red-auxiliary absolute flex w-full pl-2">
      {memoizedErrorMessage}
    </div>
  );
}
