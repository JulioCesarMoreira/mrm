import { ReactElement } from 'react';
import { ChildrenProperty } from '../../types';

export default function LoginCard({
  children,
}: ChildrenProperty): ReactElement {
  return (
    <div className="flex-center h-full w-full">
      <div className="bg-gray-d9 flex-col-center rounded-lg p-6">
        <p className="text-dark-blue text-2xl font-bold">Login</p>

        <div className="flex-center h-full w-full">{children}</div>
      </div>
    </div>
  );
}
