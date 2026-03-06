import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: "@storybook/nextjs",
  staticDirs: ["..\\public"],
  webpackFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      tls: false,
      perf_hooks: false,
    };
    return config;
  },
};
export default config;
