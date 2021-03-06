module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*'],
  coverageReporters: ['json', 'lcov', 'cobertura'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  preset: 'ts-jest',
  resetMocks: true,
  restoreMocks: true,
  testEnvironment: 'node',
}
