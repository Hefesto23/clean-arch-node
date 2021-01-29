module.exports = {
  env: {
    node: true,
    jest: true,
  },
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": ["error", {"eslint-disable-next-line": 'off', "endOfLine":"auto"}],
    "@typescript-eslint/interface-name-prefix": 'off',
    "@typescript-eslint/explicit-function-return-type": 'off',
    "@typescript-eslint/no-explicit-any": 'off',
  },
};
