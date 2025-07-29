const { defineConfig, globalIgnores } = require("eslint/config");
const globals = require("globals");
const { fixupConfigRules } = require("@eslint/compat");
const tsParser = require("@typescript-eslint/parser");
const reactRefresh = require("eslint-plugin-react-refresh");
const prettier = require("eslint-plugin-prettier");
const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },

    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended"
      )
    ),

    plugins: {
      "react-refresh": reactRefresh,
      prettier,
    },

    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
      "@typescript-eslint/no-empty-interface": [
        "error",
        {
          allowSingleExtends: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": [
        "off",
        {
          ignoreRestArgs: true,
        },
      ],
      "prettier/prettier": [
        "warn",
        {
          printWidth: 145,
          useTabs: true,
          tabWidth: 4,
          bracketSpacing: true,
          semi: true,
          singleQuote: true,
          trailingComma: "none",
          bracketSameLine: true,
          arrowParens: "always",
          endOfLine: "lf",
        },
      ],
    },
  },
  globalIgnores(["**/dist", "**/eslint.config.cjs"]),
]);
