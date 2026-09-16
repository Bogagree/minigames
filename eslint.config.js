import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  unicorn.configs.recommended,
  eslintConfigPrettier,
  {
    linterOptions: {
      noInlineConfig: true,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
);
