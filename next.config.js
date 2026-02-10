/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { readdir } from "fs";

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config, { isServer }) => {
    // Fix Windows permission issues with system directories
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/node_modules", "**/.git"],
    };

    return config;
  },
};

export default config;
