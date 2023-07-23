import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testRegex: '(.*|(\\.|/)(test|spec))\\.[jt]s?$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s', '!_tests/*.api.spec.ts'],
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
};

export default config;
