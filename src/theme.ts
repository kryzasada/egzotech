"use client";

import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary: { value: "#089bab" },
        secondary: { value: "#7ac9d2" },
        background: { value: "#ebf5f7" },
        text: { value: "#000000" },
        textSecondary: { value: "#838996" },

        success: { value: "#51c032" },
        danger: { value: "#ed575f" },
        warning: { value: "#f36a1b" },
        info: { value: "#28b1bf" },
      },
      fonts: {
        heading: { value: "var(--font-poppins)" },
        body: { value: "var(--font-poppins)" },
      },
    },
  },
});
