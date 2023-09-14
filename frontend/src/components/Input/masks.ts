import { NumberFormatProps } from 'react-number-format';

export type MaskTypes =
  | 'cep'
  | 'cnpj'
  | 'cpf-cnpj'
  | 'cpf'
  | 'date'
  | 'hours'
  | 'installmentsNumber'
  | 'intWithLeadingZeros'
  | 'minutes'
  | 'number'
  | 'numberWithoutDecimals'
  | 'onlyNumber'
  | 'percentage'
  | 'percentageWithDecimals'
  | 'tel';

const CPF_LIMIT = 12;
const TEL_LIMIT = 11;
const NUMBER_LIMIT = 11;
const DECIMAL_SCALE = 2;
const PERCENTAGE_LIMIT = 100;
const INSTALLMENTS_NUMBER_MAX_LENGTH = 5;
const PROCEDURE_NUMBER_MAX_LENGTH = 4;
const PROCEDURE_MAX_DURATION = 1439;

export default function generateMaskTypes(
  value: string,
): Record<string, NumberFormatProps> {
  return {
    percentage: {
      placeholder: '00',
      allowNegative: false,
      allowLeadingZeros: true,
      isAllowed: (inputObject: {
        floatValue?: number;
        value: string;
      }): boolean => {
        const { floatValue, value: valueInput } = inputObject;
        if (
          (floatValue !== undefined &&
            (floatValue >= PERCENTAGE_LIMIT || floatValue <= 0)) ||
          valueInput.includes('.')
        )
          return false;
        return true;
      },
    },
    percentageWithDecimals: {
      allowNegative: false,
      decimalSeparator: ',',
      placeholder: '00',
      maxLength: INSTALLMENTS_NUMBER_MAX_LENGTH,
      decimalScale: DECIMAL_SCALE,
      isAllowed: ({ floatValue }: { floatValue?: number }): boolean =>
        !floatValue || floatValue <= PERCENTAGE_LIMIT,
    },
    number: {
      placeholder: '00',
      format: '##',
      isAllowed: ({ floatValue }: { floatValue?: number }): boolean =>
        !floatValue || floatValue > 0,
    },
    cep: { format: '#####-###', placeholder: '00000-000' },
    cnpj: {
      format: '##.###.###/####-##',
      placeholder: '__.___.___/____-__',
    },
    'cpf-cnpj': {
      format:
        value.length < CPF_LIMIT ? '###.###.###-#####' : '##.###.###/####-##',
      placeholder: '___.___.___-__',
    },
    cpf: { format: '###.###.###-##', placeholder: '___.___.___-__' },
    date: { format: '##/##/####', placeholder: '__/__/____' },
    tel: {
      format: value.length < TEL_LIMIT ? '(##) ####-#####' : '(##) #####-####',
      placeholder: '(__) _____-____',
    },
    hours: {
      format: '##:##',
      placeholder: '00:00',
    },
    numberWithoutDecimals: {
      allowNegative: false,
      allowLeadingZeros: false,
      decimalScale: 0,
      isAllowed: ({ floatValue }: { floatValue?: number }): boolean =>
        floatValue !== 0 &&
        (!floatValue || floatValue.toString().length <= NUMBER_LIMIT),
    },
    intWithLeadingZeros: {
      allowNegative: false,
      decimalScale: 0,
    },
    procedureDuration: {
      allowNegative: false,
      allowLeadingZeros: true,
      maxLength: PROCEDURE_NUMBER_MAX_LENGTH,
      isAllowed: (inputObject: {
        floatValue?: number;
        value: string;
      }): boolean => {
        const { floatValue, value: duration } = inputObject;

        return !(
          (floatValue !== undefined &&
            (floatValue <= 0 || floatValue > PROCEDURE_MAX_DURATION)) ||
          duration.includes('.')
        );
      },
    },
  };
}
