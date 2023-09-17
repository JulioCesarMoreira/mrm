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
