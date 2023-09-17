import type { Context } from 'react';
import { useContext } from 'react';
import { ServiceContext, ServiceContextProperties } from './ServiceProvider';

export default function useServiceContext(): ServiceContextProperties {
  const value = useContext(
    ServiceContext as unknown as Context<ServiceContextProperties | undefined>,
  );

  if (!value) {
    throw new Error('Fail to create service context');
  }

  return value;
}
