module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  rules: {
    "no-unused-vars": ["error", { varsIgnorePattern: "^React$" }],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    quotes: [
      2,
      "double",
      "single",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
  },
};
