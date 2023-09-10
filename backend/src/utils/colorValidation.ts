import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'hexColorValidate', async: false })
export class ColorValidation implements ValidatorConstraintInterface {
  validate(hexColor: string): boolean {
    return this.isValidHexColor(hexColor);
  }

  defaultMessage(): string {
    return 'Invalid hexadecimal for color';
  }

  private isValidHexColor(hexColor: string): boolean {
    // Define a regular expression pattern for a valid hexadecimal color code
    const hexPattern = /^#[0-9A-Fa-f]{6}$/;

    // Check if the input matches the pattern and has a length of 7 characters
    if (hexPattern.test(hexColor) && hexColor.length === 7) {
      return true; // Valid hexadecimal color code
    } else {
      return false; // Invalid hexadecimal color code
    }
  }
}
