const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new ESLintPlugin({
            extensions: ['js'],
            exclude: 'node_modules',

            // ESLint options
            fix: true,
            emitWarning: true,
            failOnError: false,
            failOnWarning: false,


            // ESLint CLIEngine options
            cwd: process.cwd(),
            resolvePluginsRelativeTo: __dirname,
            baseConfig: {
                extends: ['eslint:recommended'],
                parserOptions: {
                    ecmaVersion: 2018,
                    sourceType: 'module',
                },
                env: {
                    browser: true,
                    es6: true,
                },
                rules: {
                    'no-console': 'off',
                },
            },
        }),
    ],
};
