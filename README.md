# AcFun Live ToolBox

<div align="center">
  <img src="./工具箱构架说明.svg" height="450px">
</div>
<div align="center">
  <span><img src="./readme_acfunlogo.svg" height="50px"></span>
  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
  &nbsp; &nbsp; &nbsp; 
  <span><img src="./readme_agpllogo1.png" height="50px"></span>
</div>
<div align="center">
  
  *An AcFun-FOSS project.*
</div>

> 请参阅 [GIT 使用法](./readme_git_usage.md)。

## Prerequisite

-   Node.js LTS latest.
-   Yarn ≥ **3**.

## Setup

### 1. Setup yarn

First, switch to node.js lts latest.

ℹ️ NOTE: It is reported that switching between different version of node with nvm or something else may
needs a restart of shell to take effect.

After that, run

```sh
node --version
```

to check if node is usable.

Then,

```sh
cd acfun-live-toolbox-MKII
corepack enable
yarn set version stable
```

### 2. Setup development environment variables

⚠ ATTENTION: Every time a new shell session is entered, you should always perform this step once as long as you're gonna download anything with yarn.
After perform this step, *don't close your terminal window*, make sure you run `yarn install` or `yarn add` or something else in the same shell session.

_Windows (CMD):_

```batch
CALL dev-tools\setup_dev_envvars
```

_Windows (PowerShell):_

```ps
./dev-tools/setup_dev_envvars.ps1
```

_UNIX (UNIX Shell):_

```sh
source ./dev-tools/setup_dev_envvars.sh
```

### 3. Install dependencies

```sh
yarn install
```

## Run & Debug

### Run the project directly

```sh
yarn run dev
```

### Debug in VSCode or Emacs (dap-mode)

![electron-vite-react-debug.gif](https://github.com/electron-vite/electron-vite-react/blob/main/electron-vite-react-debug.gif?raw=true)

### Debug in other editors

_Windows:_

```batch
node_modules\.bin\electron --remote-debugging-port=9229 .
```

_UNIX:_

```sh
node_modules/.bin/electron --remote-debugging-port=9229 .
```

Then attach your debugger to port 9229.

## Directory

```
  ├─┬ electron        == code that run in electron main thread.
  │ ├─┬ main
  │ │ └── index.ts    entry of Electron-Main
  │ └─┬ preload
  │   └── index.ts    entry of Preload-Scripts
  ├─┬ src             == code that run in electron renderer thread.
  │ └── main.ts       entry of Electron-Renderer
  ├── index.html
  ├── package.json
  └── vite.config.ts
```

## FAQ

-   [C/C++ addons, Node.js modules - Pre-Bundling](https://github.com/electron-vite/vite-plugin-electron-renderer#dependency-pre-bundling)
-   [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron-renderer#dependencies-vs-devdependencies)
