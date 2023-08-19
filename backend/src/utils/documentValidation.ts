import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidCnpj, isValidCpf } from './validation';

@ValidatorConstraint({ name: 'cpfValidate', async: false })
export class CpfValidation implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    return isValidCpf(cpf);
  }

  defaultMessage(): string {
    return 'Invalid cpf';
  }
}

@ValidatorConstraint({ name: 'cnpjValidate', async: false })
export class CnpjValidation implements ValidatorConstraintInterface {
  validate(cnpj: string): boolean {
    return isValidCnpj(cnpj);
  }

  defaultMessage(): string {
    return 'Invalid cnpj';
  }
}

@ValidatorConstraint({ name: 'cpfCnpjValidate', async: false })
export class CpfCnpjValidation implements ValidatorConstraintInterface {
  validate(cpfCnpj: string): boolean {
    switch (cpfCnpj.length) {
      case 11:
        return isValidCpf(cpfCnpj);

      case 14:
        return isValidCnpj(cpfCnpj);

      default:
        return false;
    }
  }

  defaultMessage(): string {
    return 'Invalid cpf or cnpj';
  }
}
