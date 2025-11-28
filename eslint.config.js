import { defineConfig } from "eslint/config";
// import js from "@eslint/js";
// import { FlatCompat } from "@eslint/eslintrc";

// const compat = new FlatCompat({
//     baseDirectory: __dirname,
//     recommendedConfig: js.configs.recommended,
//     allConfig: js.configs.all
// });

module.exports = defineConfig([{
    settings: {
        next: {
            rootDir: ["apps/*/"],
        },
    },
}]);
