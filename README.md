# aio-app-ts-test

Welcome to my Adobe I/O Application!

## Setup

- Populate the `.env` file in the project root and fill it as shown [below](#env)

## Local Dev

- `aio app run` to start your local Dev server
- App will run on `localhost:9080` by default

By default the UI will be served locally but actions will be deployed and served from Adobe I/O Runtime. To start a
local serverless stack and also run your actions locally use the `aio app run --local` option.

## Test & Coverage

- Run `aio app test` to run unit tests for ui and actions
- Run `aio app test --e2e` to run e2e tests

## Deploy & Cleanup

- `aio app deploy` to build and deploy all actions on Runtime and static files to CDN
- `aio app undeploy` to undeploy the app

## Config

### `.env`

You can generate this file using the command `aio app use`. 

```bash
# This file must **not** be committed to source control

## please provide your Adobe I/O Runtime credentials
# AIO_RUNTIME_AUTH=
# AIO_RUNTIME_NAMESPACE=
```

### `app.config.yaml`

- Main configuration file that defines an application's implementation. 
- More information on this file, application configuration, and extension configuration 
  can be found [here](https://developer.adobe.com/app-builder/docs/guides/appbuilder-configuration/#appconfigyaml)

#### Action Dependencies

- You have two options to resolve your actions' dependencies:

  1. **Packaged action file**: Add your action's dependencies to the root
   `package.json` and install them using `npm install`. Then set the `function`
   field in `app.config.yaml` to point to the **entry file** of your action
   folder. We will use `webpack` to package your code and dependencies into a
   single minified js file. The action will then be deployed as a single file.
   Use this method if you want to reduce the size of your actions.

  2. **Zipped action folder**: In the folder containing the action code add a
     `package.json` with the action's dependencies. Then set the `function`
     field in `app.config.yaml` to point to the **folder** of that action. We will
     install the required dependencies within that directory and zip the folder
     before deploying it as a zipped action. Use this method if you want to keep
     your action's dependencies separated.

## Debugging in VS Code

While running your local server (`aio app run`), both UI and actions can be debugged, to do so open the vscode debugger
and select the debugging configuration called `WebAndActions`.
Alternatively, there are also debug configs for only UI and each separate action.

## Typescript support for UI

To use typescript use `.tsx` extension for react components and add a `tsconfig.json` 
and make sure you have the below config added
```
 {
  "compilerOptions": {
      "jsx": "react"
    }
  } 
```

## Typescript Support (hgpa)

We are testing typescript support out of the box,
as well as edge cases.

We generated this code using `aio app init --standalone-app --no-login`.

We then ran `aio app dev`.

We were able to call generic action via UI.
We modify generic action so  we can call it without auth:

- `require-adobe-auth: false`
- remove `Authorization` check

### TS mods

We then followed the instructions here: <https://github.com/adobe/aio-cli-plugin-app-dev>

Ran `npm install --save-dev ts-loader typescript`

We added the `webpack-config.js` and `tsconfig.json` files.

We then ran `aio app dev`. No problem.

Modified generic to be TS.
No problems.

#### Converting to ESM

```txt
√ aio-app-ts-test (main) %  aio app dev                                                                                                                              24-10-15 17:14:14
Building the app...
 ›   Error: action build failed, webpack compilation errors:
 ›   [
 ›      {
 ›              "file": "/Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/actions/generic/index.ts",
 ›              "loc": "18:21-37",
 ›              "message": "\u001b[90m[tsl] \u001b[39m\u001b[1m\u001b[31mERROR\u001b[39m\u001b[22m\u001b[1m\u001b[31m in 
 ›   \u001b[39m\u001b[22m\u001b[1m\u001b[36m/Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/actions/generic/index.ts(18,22)\u001b[39m\u001b[22m\n\u001b[1m\u001b[31m     
 ›    TS2792: Cannot find module '@adobe/aio-sdk'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?\u001b[39m\u001b[22m",
 ›              "details": "ts-loader-default_e3b0c44298fc1c14",
 ›              "stack": "Error: \u001b[90m[tsl] \u001b[39m\u001b[1m\u001b[31mERROR\u001b[39m\u001b[22m\u001b[1m\u001b[31m in 
 ›   \u001b[39m\u001b[22m\u001b[1m\u001b[36m/Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/actions/generic/index.ts(18,22)\u001b[39m\u001b[22m\n\u001b[1m\u001b[31m     
 ›    TS2792: Cannot find module '@adobe/aio-sdk'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?\u001b[39m\u001b[22m\n    
 ›   at makeError (/Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/node_modules/ts-loader/dist/utils.js:93:19)\n    at 
 ›   /Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/node_modules/ts-loader/dist/utils.js:63:27\n    at Array.map (<anonymous>)\n    at formatErrors 
 ›   (/Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/node_modules/ts-loader/dist/utils.js:46:14)\n    at provideErrorsToWebpack 
 ›   (/Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/node_modules/ts-loader/dist/after-compile.js:167:62)\n    at 
 ›   /Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/node_modules/ts-loader/dist/after-compile.js:36:9\n    at 
 ›   /Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/node_modules/ts-loader/dist/instances.js:206:13\n    at fn 
 ›   (/Users/hgpa/.nvm/versions/node/v20.11.1/lib/node_modules/@adobe/aio-cli/node_modules/webpack/lib/Compilation.js:491:10)\n    at Hook.eval [as callAsync] (eval at create 
 ›   (/Users/hgpa/.nvm/versions/node/v20.11.1/lib/node_modules/@adobe/aio-cli/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:34:1)\n    at Hook.CALL_ASYNC_DELEGATE 
 ›   [as _callAsync] (/Users/hgpa/.nvm/versions/node/v20.11.1/lib/node_modules/@adobe/aio-cli/node_modules/tapable/lib/Hook.js:18:14)"
 ›      }
 ›   ]
 ```

 i  needeed to change `module` and `moduleResolution` to "nodenext"

#### typescript dependencies

What if I add a typescript file that is importe?

```txt
 ›   Error: action build failed, webpack compilation errors:
 ›   [
 ›      {
 ›              "moduleIdentifier": "/Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/node_modules/ts-loader/index.js!/Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/ac
 ›   tions/generic/index.ts",
 ›              "moduleName": "./actions/generic/index.ts",
 ›              "loc": "28:14-31",
 ›              "message": "Module not found: Error: Can't resolve '../foo' in '/Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/actions/generic'",
 ›              "moduleId": 94763,
 ›              "moduleTrace": [],
 ›              "details": "resolve '../foo' in '/Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/actions/generic'\n  using description file: 
 ›   /Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/package.json (relative path: ./actions/generic)\n    using description file: 
 ›   /Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/package.json (relative path: ./actions/foo)\n      no extension\n        
 ›   /Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/actions/foo doesn't exist\n      .js\n        
 ›   /Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/actions/foo.js doesn't exist\n      .json\n        
 ›   /Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/actions/foo.json doesn't exist\n      as directory\n        
 ›   /Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/actions/foo doesn't exist",
 ›              "stack": "ModuleNotFoundError: Module not found: Error: Can't resolve '../foo' in '/Users/hgpa/hgpa/git/git.corp.adobe.com/wcms/aio-app-ts-test/actions/generic'\n    at 
 ›   /Users/hgpa/.nvm/versions/node/v20.11.1/lib/node_modules/@adobe/aio-cli/node_modules/webpack/lib/Compilation.js:2109:28\n    at 
 ›   /Users/hgpa/.nvm/versions/node/v20.11.1/lib/node_modules/@adobe/aio-cli/node_modules/webpack/lib/NormalModuleFactory.js:908:13\n    at eval (eval at create 
 ›   (/Users/hgpa/.nvm/versions/node/v20.11.1/lib/node_modules/@adobe/aio-cli/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:10:1)\n    at 
 ›   /Users/hgpa/.nvm/versions/node/v20.11.1/lib/node_modules/@adobe/aio-cli/node_modules/webpack/lib/NormalModuleFactory.js:333:22\n    at eval (eval at create 
 ›   (/Users/hgpa/.nvm/versions/node/v20.11.1/lib/node_modules/@adobe/aio-cli/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:9:1)\n    at 
 ›   /Users/hgpa/.nvm/versions/node/v20.11.1/lib/node_modules/@adobe/aio-cli/node_modules/webpack/lib/NormalModuleFactory.js:512:22\n    at 
 ›   /Users/hgpa/.nvm/versions/node/v20.11.1/lib/node_modules/@adobe/aio-cli/node_modules/webpack/lib/NormalModuleFactory.js:150:10\n    at 
 ›   /Users/hgpa/.nvm/versions/node/v20.11.1/lib/node_modules/@adobe/aio-cli/node_modules/webpack/lib/NormalModuleFactory.js:775:25\n    at 
 ›   /Users/hgpa/.nvm/versions/node/v20.11.1/lib/node_modules/@adobe/aio-cli/node_modules/webpack/lib/NormalModuleFactory.js:992:8\n    at 
 ›   /Users/hgpa/.nvm/versions/node/v20.11.1/lib/node_modules/@adobe/aio-cli/node_modules/webpack/lib/NormalModuleFactory.js:1121:5"
 ›      }
 ›   ]
 ```

 We needed to add the following to webpack config:

```js
module.exports = {
  // ...
  resolve: {
    extensions: ['.ts']
  }
}
```

Now it builds.

We can edit 'foo.ts' and watcher notices, but the action does not get rebuilt.
If I do a 'fake' edit of generic.js (e.g. add a comment) it "builds" but it looks like it's really using a cached version because the change to foo.ts i not reflected.

Hmm...

See `https://github.com/adobe/aio-cli-plugin-app-dev/blob/21d0f1125ef8fe7d6b3a2dd0921e4cb2eb2a7de9/src/lib/actions-watcher.js`

We see watcher is watching `config.actions.src`.
This is the `actions` key in app.config.yaml.
If the file is not an action it doesn't do anything.

What if add a TS file outside of that actions directory?

Build works but watcher does not see.
Not an issue now but may be in future.

If there is a boo boo then cli stops building. You have to restart:

```txt
2024-10-16T21:41:47.174Z [watcher] error: Error encountered while building actions. Stopping auto refresh.
```
