import "dotenv/config";

/**
 * Utility to ensure we don't have 'undefined' strings.
 * If a variable is missing, the test suite fails fast.
 */
function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env var: ${key}`);
  }
  return value;
}

export const ENV = {
  STANDARD_USER: getEnv("STANDARD_USER"),
  LOCKED_OUT_USER: getEnv("LOCKED_OUT_USER"),
  PROBLEM_USER: getEnv("PROBLEM_USER"),
  PERFORMANCE_GLITCH_USER: getEnv("PERFORMANCE_GLITCH_USER"),
  ERROR_USER: getEnv("ERROR_USER"),
  VISUAL_USER: getEnv("VISUAL_USER"),
  PASSWORD: getEnv("PASSWORD"),
  BASE_URL: process.env.BASE_URL,
};
