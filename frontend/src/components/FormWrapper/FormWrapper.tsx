import { twMerge } from 'tailwind-merge';
import { FormProperties } from './types';
import { FormProvider, useForm } from 'react-hook-form';
import type { ReactElement } from 'react';
import type { FieldValues } from 'react-hook-form';

export default function FormWrapper<T extends FieldValues>({
  id,
  children,
  className,
  defaultValues,
  onSubmit,
}: FormProperties<T>): ReactElement {
  const form = useForm<T>({
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className={twMerge(className)}
      >
        {children}
      </form>
    </FormProvider>
  );
}
