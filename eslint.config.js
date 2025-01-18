// import js from "@eslint/js";
// import globals from "globals";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
// import tseslint from "typescript-eslint";

// export default tseslint.config(
//   { ignores: ["dist"] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ["**/*.{ts,tsx}"],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       "react-hooks": reactHooks,
//       "react-refresh": reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       "react-refresh/only-export-components": [
//         "warn",
//         { allowConstantExport: true },
//       ],
//     },
//   },
// );

// import js from "@eslint/js";
// import globals from "globals";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
// import tseslint from "typescript-eslint";
// import tailwindcss from "eslint-plugin-tailwindcss"; // Optional for TailwindCSS
// import prettier from "eslint-config-prettier"; // Optional for Prettier

// export default tseslint.config(
//   { ignores: ["dist", "node_modules"] },
//   {
//     extends: [
//       js.configs.recommended,
//       ...tseslint.configs.recommended,
//       prettier, // Disable conflicting Prettier rules (optional)
//     ],
//     files: ["**/*.{ts,tsx,js,jsx}"],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       "react-hooks": reactHooks,
//       "react-refresh": reactRefresh,
//       tailwindcss, // Optional for TailwindCSS
//     },
//     // rules: {
//     //   ...reactHooks.configs.recommended.rules,
//     //   "react-refresh/only-export-components": [
//     //     "warn",
//     //     { allowConstantExport: true },
//     //   ],
//     //   "@typescript-eslint/explicit-function-return-type": "off",
//     //   // "react-hooks/rules-of-hooks": "error",
//     //   // "react-hooks/exhaustive-deps": "warn",
//     // "react/react-in-jsx-scope": "off",
//     // "react/jsx-uses-vars": "error",
//     // "react/jsx-no-undef": "error",
//     // "@typescript-eslint/no-unused-vars": "warn",
//     // "@typescript-eslint/no-var-requires": "error",
//     //   "react-hooks/rules-of-hooks": "warn", // enforce the rules of hooks
//     //   "react-hooks/exhaustive-deps": "warn", // warn about missing dependencies
//     // },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       "react-refresh/only-export-components": [
//         "warn",
//         { allowConstantExport: true },
//       ],
//       "tailwindcss/classnames-order": "warn", // Optional for TailwindCSS
//       "tailwindcss/no-custom-classname": "off", // Optional for custom classes
//       "react-hooks/rules-of-hooks": "warn", // enforce the rules of hooks
//       "react-hooks/exhaustive-deps": "warn", // warn about missing dependencies
//       "react/react-in-jsx-scope": "off",
//       "react/jsx-uses-vars": "error",
//       "react/jsx-no-undef": "error",
//       "@typescript-eslint/no-unused-vars": "warn",
//       "@typescript-eslint/no-var-requires": "error",
//     },
//   },
// );

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tailwindcss from "eslint-plugin-tailwindcss"; // Optional for TailwindCSS
import prettier from "eslint-config-prettier"; // Optional for Prettier
import react from "eslint-plugin-react"; // Add this line

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier, // Disable conflicting Prettier rules (optional)
    ],
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react, // Add this line
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      tailwindcss, // Optional for TailwindCSS
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // "tailwindcss/classnames-order": "warn", // Optional for TailwindCSS
      "tailwindcss/no-custom-classname": "off", // Optional for custom classes
      "react-hooks/rules-of-hooks": "error", // Enforce the rules of hooks
      "react-hooks/exhaustive-deps": "warn", // Warn about missing dependencies
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-vars": "error", // Ensure this rule is enabled
      "react/jsx-no-undef": "warn", // Ensure this rule is enabled
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-var-requires": "error",
    },
  },
);
