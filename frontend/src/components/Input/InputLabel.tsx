import { ReactElement } from 'react';

interface InputLabelProperties {
  label: string;
  required?: boolean;
}

export default function InputLabel({
  label,
  required,
}: InputLabelProperties): ReactElement {
  return (
    <div className="text-body text-gray-scale-300 my-1 flex">
      {label}
      {required && '*'}
    </div>
  );
}
