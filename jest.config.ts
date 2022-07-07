import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*'],
  coverageReporters: ['json', 'lcov', 'cobertura'],
  extensionsToTreatAsEsm: ['.mts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleFileExtensions: ['mts', 'mjs', 'ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.m?js$': '$1',
  },
  preset: 'ts-jest',
  resetMocks: true,
  restoreMocks: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.*'],
  transform: {},
}

export default config
