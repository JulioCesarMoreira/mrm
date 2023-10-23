import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeSpecialCharacters(inputString: string): string {
  return inputString.replace(/[ ./()\-]/g, '');
}

export const normalizeString = (value: string): string =>
  value
    ? value
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
    : '';

export function getFileType(name: string): string {
  return name.split('.')[name.split('.').length - 1];
}

export function isFileAnImage(name: string): boolean {
  return (
    getFileType(name) === 'svg' ||
    getFileType(name) === 'jpg' ||
    getFileType(name) === 'jpeg' ||
    getFileType(name) === 'png'
  );
}

export function formatMoneyString(moneyString: string) {
  // Remove all dots and replace commas with dots
  return moneyString.replace(/\./g, '').replace(/,/g, '.');
}

export function isValidCpf(inputCpf: string): boolean {
  if (typeof inputCpf !== 'string') return false;

  const formattedCpf = inputCpf.replace(/\D+/g, '');

  const cpfLength = 11;
  const lengthPlusOne = 12;
  const lengthMinusOne = 10;
  const lengthMinusTwo = 9;

  if (formattedCpf.length !== cpfLength || !!/(\d)\1{10}/.test(formattedCpf))
    return false;

  const cpf = [...formattedCpf].map(Number);

  const rest = (count: number): number =>
    ((cpf
      .slice(0, count - lengthPlusOne)
      .reduce((sum, element, index) => sum + element * (count - index), 0) *
      lengthMinusOne) %
      cpfLength) %
    lengthMinusOne;

  return (
    rest(lengthMinusOne) === cpf[lengthMinusTwo] &&
    rest(cpfLength) === cpf[lengthMinusOne]
  );
}

export function isValidCnpj(inputCnpj: string): boolean {
  const cnpj = inputCnpj.replace(/\D+/g, '');
  const EXPECTED_LENGTH = 14;
  const TWO = 2;
  const SEVEN = 7;
  const ELEVEN = 11;
  const NINE = 9;

  if (cnpj === '') {
    return false;
  }

  if (cnpj.length !== EXPECTED_LENGTH) {
    return false;
  }

  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  ) {
    return false;
  }

  let length = EXPECTED_LENGTH - TWO;
  let numbers = cnpj.slice(0, Math.max(0, length));
  let sum = 0;
  let position = length - SEVEN;

  const digits = cnpj.slice(Math.max(0, length));

  for (let index = length; index >= 1; index -= 1) {
    sum += Number(numbers.charAt(length - index)) * position;
    position -= 1;
    if (position < TWO) position = NINE;
  }

  let result = sum % ELEVEN < TWO ? 0 : ELEVEN - (sum % ELEVEN);

  if (result.toString() !== digits.charAt(0)) {
    return false;
  }

  length += 1;
  numbers = cnpj.slice(0, Math.max(0, length));
  sum = 0;
  position = length - SEVEN;

  for (let index = length; index >= 1; index -= 1) {
    sum += Number(numbers.charAt(length - index)) * position;
    position -= 1;
    if (position < TWO) position = NINE;
  }
  result = sum % ELEVEN < TWO ? 0 : ELEVEN - (sum % ELEVEN);

  if (result !== Number(digits.charAt(1))) {
    return false;
  }

  return true;
}
