const path = require('path');

module.exports = {
    mode: 'production',
    entry: './scripts/index_1.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    }
}