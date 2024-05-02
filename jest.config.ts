import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*'],
  coverageReporters: ['json', 'lcov', 'cobertura'],
  extensionsToTreatAsEsm: ['.mts'],
  moduleFileExtensions: ['mts', 'mjs', 'ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/build'],
  preset: 'ts-jest',
  resetMocks: true,
  restoreMocks: true,
  resolver: '<rootDir>/jest-resolver.cjs',
  testEnvironment: 'node',
  testRegex: '.*\\.test\\.mts$',
  transform: {
    '^.+\\.(mt|t|cj|j)s$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
}

export default config
