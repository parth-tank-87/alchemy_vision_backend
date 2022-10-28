module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "test/(.*)": "<rootDir>/test/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
  ]
};