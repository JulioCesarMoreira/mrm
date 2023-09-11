function getModule(dividend: number, divisor: number): number {
  return Math.round(dividend - Math.floor(dividend / divisor) * divisor);
}

function getRandomNumberBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomNumbers(total: number): number[] {
  const numbers = [];

  const lastDigit = 9;

  for (let index = 0; index < total; index += 1) {
    numbers.push(getRandomNumberBetween(1, lastDigit));
  }
  return numbers;
}

function getVerificationDigitCpf(numbers: number[] = []): number {
  let digit = 0;
  let counter = 0;

  const arraySize = numbers.length + 1;

  for (const number of numbers) {
    digit += number * (arraySize - counter);

    counter += 1;
  }

  const cpfSize = 11;

  digit = cpfSize - getModule(digit, cpfSize);
  return digit >= cpfSize - 1 ? 0 : digit;
}

export default function generateFakeCpf(): string {
  const lastDigit = 9;

  const numbers = getRandomNumbers(lastDigit);

  numbers.push(getVerificationDigitCpf(numbers));
  numbers.push(getVerificationDigitCpf(numbers));

  return numbers.join('');
}
