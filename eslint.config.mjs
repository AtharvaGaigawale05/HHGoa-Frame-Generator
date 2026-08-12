import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: [
      "components/Hero.tsx",
      "components/SiteFooter.tsx",
      "components/UploadZone.tsx",
      "components/Header.tsx",
      "components/ResultView.tsx",
      "components/PhotoEditor.tsx",
    ],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
