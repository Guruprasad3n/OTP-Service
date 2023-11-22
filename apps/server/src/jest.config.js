module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // other configurations...
};

// module.exports = {
//     testEnvironment: 'node',
//     roots: ['<rootDir>/src'],
//     transform: {
//       '^.+\\.tsx?$': 'ts-jest',
//     },
//     testRegex: '(/_tests_/.*|(\\.|/)(test|spec))\\.tsx?$',
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//   };
// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
//     moduleNameMapper: {
//       '^@/(.*)$': '<rootDir>/src/$1',
//     },
//   };