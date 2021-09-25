module.exports = {
  testEnvironment: 'jsdom',
  resetModules: true,
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)(test).(ts|tsx)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/__snapshots__/',
    'coverage',
    'test/cypress',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: [
    '__stories__',
    'index.ts',
    'stories.ts',
    'stories.tsx'
  ],
  coverageDirectory: '<rootDir>/coverage',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
};
