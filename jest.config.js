module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
      'pages/*.{tsx,js}',
      'pages/**/*.{tsx,js}',
      'server/*.{tsx,js}',
      'server/**/*.{tsx,js}',
      'components/*.{tsx,js}',
      'components/**/*.{tsx,js}',
    ],
    setupFilesAfterEnv: ['./test/setup-env.tsx'],
    setupFiles: ['./jest.polyfills.js'],
    testMatch: [
      '<rootDir>/__tests__/**/*.spec.js',
      '<rootDir>/__tests__/**/*.spec.tsx',
    ],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.tsx?$': 'babel-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
    moduleNameMapper: {
        '^axios$': require.resolve('axios'),
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  }
