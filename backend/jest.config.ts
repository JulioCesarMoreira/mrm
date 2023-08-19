import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testRegex: '.*.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s', '!__tests__/*.api.spec.ts'],
  testEnvironment: 'node',
  rootDir: './',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^@infra/service/(.*)$': '<rootDir>/src/infra/service/$1',
    '^@infra/http/(.*)$': '<rootDir>/src/infra/http/$1',
    '^@application/use-cases/(.*)$': '<rootDir>/src/application/use-cases/$1',
    '^@application/core/(.*)$': '<rootDir>/src/application/core/$1',
  },
};

export default config;
