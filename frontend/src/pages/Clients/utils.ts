export function removeSpecialCharacters(inputString: string): string {
  return inputString.replace(/[ ./()\-]/g, '');
}
