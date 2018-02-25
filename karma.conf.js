const paths = require('./config/paths');
const autoprefixer = require('autoprefixer');

module.exports = function (config) {
    config.set({

        frameworks: ["mocha", "karma-typescript"],

        files: [
            { pattern: "src/**/*.tsx" }
        ],

        preprocessors: {
            "**/*.tsx": ["karma-typescript"]
        },

        webpack: { // kind of a copy of your webpack config
            devtool: 'inline-source-map', // just do inline source maps instead of the default
            module: {
                rules: [
                    {
                        test: /\.(ts|tsx)$/,
                        loader: require.resolve('tslint-loader'),
                        enforce: 'pre',
                        include: paths.appSrc,
                    },
                    {
                        test: /\.(ts|tsx)$/,
                        include: paths.appSrc,
                        loader: require.resolve('ts-loader'),
                    },
                    {
                        test: /\.js$/,
                        exclude: /\/node_modules\//,
                        loader: 'babel',
                        query: {
                            presets: ['airbnb'],
                        },
                    },
                    {
                        test: /\.css$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                },
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    // Necessary for external CSS imports to work
                                    // https://github.com/facebookincubator/create-react-app/issues/2677
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 4 versions',
                                                'Firefox ESR',
                                                'not ie < 9', // React doesn't support IE8 anyway
                                            ],
                                            flexbox: 'no-2009',
                                        }),
                                    ],
                                },
                            },
                        ],
                    },

                ],
            },
            resolve: {
                // Add `.ts` and `.tsx` as a resolvable extension.
                extensions: ['.ts', '.tsx', '.js']
            },
        },

        karmaTypescriptConfig: {
            tsconfig: './tsconfig.test.json',
        },

        browsers: ["PhantomJS"]
    });
};