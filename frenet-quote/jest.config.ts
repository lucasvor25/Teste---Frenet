import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    },
    transform: {
        '^.+\\.ts$': ['ts-jest', { tsconfig: './tsconfig.jest.json' }],
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.jest.json' }],
        '^.+\\.vue$': '@vue/vue3-jest',
    },
    moduleFileExtensions: ['js', 'ts', 'vue'],
    testMatch: ['**/tests/**/*.spec.ts', '**/__tests__/**/*.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};

export default config;
