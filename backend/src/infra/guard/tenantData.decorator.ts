import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';

export interface RequestTenantDataInterface {
  id: string;
  email: string;
}

export const RequestTentantData = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context
      .switchToHttp()
      .getRequest<{ tenantData: RequestTenantDataInterface }>();
    return request.tenantData;
  },
);
