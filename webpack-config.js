const fs = require('fs');
const path = require('path');

/**
 * Custom Webpack plugin to log build info that aio isn't giving us.
 */
class CustomStatsPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('CustomStatsPlugin', (stats) => {
      const log = (msg) => console.log(`\n\t${msg}`);

      const mainEntry = stats.compilation.entrypoints.get('main');
      if (!mainEntry) {
        log('Main entry not found. Weird.');
        return;
      }
      const outputPath = stats.compilation.outputOptions.path;
      const chunks = mainEntry.chunks;
      chunks.forEach(chunk => {
        chunk.files.forEach(file => {
          const fullPath = path.resolve(outputPath, file);
          const relativePath = path.relative(process.cwd(), fullPath);
          const fileSize = (fs.statSync(fullPath).size / 1024 / 1024).toFixed(2);
          const duration = stats.endTime - stats.startTime;
          log(`Built ${relativePath} (${fileSize} MB) in ${duration} ms`);
        });
      });
    });
  }
}

/**
 * @param {object} env - the environment variables
 * @param {object} argv - the command line arguments
 * @see https://developer.adobe.com/app-builder/docs/guides/configuration/webpack-configuration/
 * @see https://webpack.js.org/configuration/
 */
module.exports = (/*env, argv*/) => {
  return {
    // devtool: 'inline-source-map',
    module: {
      rules: [
        {
          // includes, excludes are in tsconfig.json
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        }
      ]
    },
    optimization: {
      minimize: false
    },
    plugins: [
      new CustomStatsPlugin()
    ],
    resolve: {
      extensions: [
        '.js',
        '.json',
        '.ts',
      ],
      mainFields: [
        'main'
      ],
    },
    target: 'node',
  }
}
