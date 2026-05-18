import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverage: !!process.env.CI,
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "libs/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,jsx,ts,tsx}",
    "models/**/*.{js,jsx,ts,tsx}",
    "!app/**/*.test.{js,jsx,ts,tsx}",
    "!libs/**/*.test.{js,jsx,ts,tsx}",
    "!lib/**/*.test.{js,jsx,ts,tsx}",
    "!models/**/*.test.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
  ],
  coverageReporters: ["text", "lcov"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      tsconfig: "tsconfig.json",
    }],
  },
};

export default createJestConfig(customJestConfig);