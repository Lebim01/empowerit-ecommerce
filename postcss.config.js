// postcss.config.js
module.exports = {
  plugins: {
    "postcss-import": {
      addModulesDirectories: ["./public/assets/"],
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};
