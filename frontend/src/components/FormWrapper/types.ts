import { ReactNode } from 'react';
import { FieldValues, SubmitHandler, UseFormProps } from 'react-hook-form';

export interface FormProperties<T extends FieldValues> extends UseFormProps<T> {
  id: string;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  className?: string;
}
