module.exports = {
  // context: path.resolve(__dirname),
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

/*
  @adobe/aio-lib-runtime:action-builder:debug merged webpack config : {
  @adobe/aio-lib-runtime:action-builder:debug   "devtool": "inline-source-map",
  @adobe/aio-lib-runtime:action-builder:debug   "module": {
  "rules": [
    {
      "test": {},
      "exclude": {},
      "use": "ts-loader"
    }
  ]
  @adobe/aio-lib-runtime:action-builder:debug   },
  @adobe/aio-lib-runtime:action-builder:debug   "resolve": {
  "extensions": [
    ".ts",
    ".js",
    ".json"
  ],
  "mainFields": [
    "main"
  ]
  @adobe/aio-lib-runtime:action-builder:debug   },
  @adobe/aio-lib-runtime:action-builder:debug   "entry": [
  "/Users/hgpa/hgpa/git/github.com/hparra/aio-app-ts-test/actions/generic/index.ts"
  @adobe/aio-lib-runtime:action-builder:debug   ],
  @adobe/aio-lib-runtime:action-builder:debug   "output": {
  "libraryTarget": "commonjs2",
  "path": "/Users/hgpa/hgpa/git/github.com/hparra/aio-app-ts-test/dist/application/actions/aio-app-ts-test/generic-temp",
  "filename": "index.js"
  @adobe/aio-lib-runtime:action-builder:debug   },
  @adobe/aio-lib-runtime:action-builder:debug   "target": "node",
  @adobe/aio-lib-runtime:action-builder:debug   "mode": "production",
  @adobe/aio-lib-runtime:action-builder:debug   "optimization": {
  "minimize": false
  @adobe/aio-lib-runtime:action-builder:debug   },
  @adobe/aio-lib-runtime:action-builder:debug   "plugins": [
  {
    "definitions": {
      "WEBPACK_ACTION_BUILD": "true",
      "process.env.AIO_CLI_ENV": "\"prod\""
    }
  }
  @adobe/aio-lib-runtime:action-builder:debug   ]
  @adobe/aio-lib-runtime:action-builder:debug }
*/