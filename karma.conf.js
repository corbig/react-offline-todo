const webpackConfiguration = require('./config/webpack.config.test');

module.exports = function (config) {
    config.set({

        frameworks: ['mocha'],

        browsers: ['Chrome'],

        files: [
            'src/setupTests.tsx'
        ],

        preprocessors: {
            'src/setupTests.tsx': ['webpack', 'sourcemap']
        },

        webpack: webpackConfiguration,

        reporters: ['mocha']
    });
};