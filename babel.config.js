module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        env: {
            production: {
                plugins: [
                    'react-native-paper/babel',
                    [
                        'formatjs',
                        {
                            idInterpolationPattern: '[sha512:contenthash:base64:6]',
                            ast: true,
                        },
                    ],
                ],
            },
            development: {
                plugins: [
                    [
                        'formatjs',
                        {
                            idInterpolationPattern: '[sha512:contenthash:base64:6]',
                            ast: true,
                        },
                    ],
                ],
            },
        },
    }
}
