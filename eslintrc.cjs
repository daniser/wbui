module.exports = {
  extends: ["@nuxtjs/eslint-config-typescript", "prettier"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  root: true,
};
