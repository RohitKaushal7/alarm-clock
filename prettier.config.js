/** @type {import('prettier').Config} */
export default {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],

  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  endOfLine: "auto",

  // @trivago/prettier-plugin-sort-imports CONFIG
  importOrder: [
    "^react$",
    "^react-native$",
    "^expo-(.*)$",
    "^config(.*)$",
    "^components(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^services(.*)$",
    "^locale(.*)$",
    "^store(.*)$",
    "^hooks(.*)$",
    "^assets(.*)$",
    "^types(.*)$",
    "^data(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
