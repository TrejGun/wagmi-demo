import typescriptRules from "@ethberry/eslint-config/presets/tsx.mjs";

export default [
  {
    ignores: ["**/dist", "webpack.config.ts"],
  },

  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.eslint.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  ...typescriptRules,
];
