module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'vue',
        '@stylistic'
    ],
    extends: [
        'eslint:recommended',
        'plugin:vue/essential',
        'plugin:vue/strongly-recommended',
        'plugin:vue/recommended',
    ],
    overrides: [],
    rules: {
        'vue/multi-word-component-names': ['off'],
        'quotes': ['error', 'single'],
        '@stylistic/semi': 'error'
    }
};
