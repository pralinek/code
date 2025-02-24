declare global {
  interface Window {
    runtime_config?: Record<string, string>;
  }
}

/**
 * Extracts all variables from process.env and merges them with window.runtime_config
 */
export const getConfig = (): Record<string, string> => {
  // Extract all process.env variables
  const envVariables = Object.keys(process.env)
    .reduce((acc, key) => {
      acc[key] = process.env[key] || "";
      return acc;
    }, {} as Record<string, string>);

  // Merge with window.runtime_config (which is injected at runtime)
  return {
    ...envVariables,
    ...window.runtime_config,
  };
};