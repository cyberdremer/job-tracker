"use client";

import { createSystem } from "@chakra-ui/react";
import { defineConfig } from "@chakra-ui/react";
import { defaultConfig } from "@chakra-ui/react";

const colors = {
  primary: { value: "#2563eb" },
  accent: { value: "#38bdf8" },
  background: { value: "#0f172a" },
  surface: { value: "#1e293b" },
  text: { value: "#f1f5f9" },
  neutral: { value: "#64748b" },
};

const interConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "Inter Variable" },
        body: { value: "Inter Variable" },
      },
      colors: colors,
    },
  },
});

export const interSystem = createSystem(defaultConfig, interConfig);

