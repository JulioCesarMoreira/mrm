import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  UnauthorizedErrorException,
} from '@src/error/CustomError';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import type { CognitoJwtVerifierSingleUserPool } from 'aws-jwt-verify/cognito-verifier';
import type { Request } from 'express';
import type { RequestTenantDataInterface } from './tenantData.decorator';

const RADIX = 10;

interface DecodedCognitoIdToken {
  iss: string;
  email: string;
  'custom:firmId': string;
  'custom:firmName': string;
  aud: string;
}

interface VerifyTokenParameters {
  userPoolId: string;
  clientId: string;
  tokenUse: 'id';
}

function isDecodedCognitoIdToken(
  value: unknown,
): value is DecodedCognitoIdToken {
  return (
    typeof value === 'object' &&
    value !== null &&
    'iss' in value &&
    'custom:tenantId' in value
  );
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private async verifyToken(
    userPoolId: string,
    clientId: string,
    token: string,
  ): Promise<void> {
    const verifier: CognitoJwtVerifierSingleUserPool<VerifyTokenParameters> =
      CognitoJwtVerifier.create({
        userPoolId,
        tokenUse: 'id',
        clientId,
      });

    if (userPoolId !== process.env.COGNITO_USERPOOL) {
      throw new UnauthorizedErrorException('Invalid Cognito Id Token');
    }
    try {
      await verifier.verify(token);
    } catch {
      throw new UnauthorizedErrorException('Invalid Cognito Id Token');
    }
  }

  private async extractTenantFromTokenHeader(
    request: Request,
  ): Promise<RequestTenantDataInterface | undefined> {
    const authorizationToken = request.headers['authorization'];

    if (!authorizationToken)
      throw new UnauthorizedErrorException('Provide a Id Token');

    const [type, token] = authorizationToken.split(' ') ?? [];

    if (type !== 'Bearer')
      throw new UnauthorizedErrorException('Invalid Cognito Id Token');

    if (token) {
      try {
        const decodedToken = this.jwtService.decode(token as string, {
          json: true,
        });

        if (!decodedToken) return undefined;

        if (isDecodedCognitoIdToken(decodedToken)) {
          const cognitoUserPool = decodedToken.iss.split('/').at(-1) as string;

          await this.verifyToken(
            cognitoUserPool,
            decodedToken.aud,
            token as string,
          );

          return {
            id: decodedToken['custom:tenantId'],
            email: decodedToken.email,
          };
        }
      } catch (error) {
        console.log('error decoding', error.code);
      }
    }

    return undefined;
  }

  /**
   * @param context Current execution context. Provides access to details about
   * the current request pipeline.
   *
   * @returns Value indicating whether or not the current request is allowed to
   * proceed.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Record<string, unknown>>();

    const tenantDataToken = await this.extractTenantFromTokenHeader(
      context.switchToHttp().getRequest(),
    );

    if (!tenantDataToken) {
      throw new UnauthorizedErrorException(
        'Authentication credentials are missing or invalid.',
      );
    }

    const { id } = tenantDataToken;

    if (!id) {
      throw new BadRequestException(['Validation error, invalid parameters']);
    }

    if (Number.isNaN(Number.parseInt(id, RADIX))) {
      throw new BadRequestException([
        'Validation error, tenant id is not a number',
      ]);
    }

    request.tenantData = tenantDataToken;

    return true;
  }
}
