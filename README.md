# Example Rush Monorepo

This template is part of the documentation of the [Rush](https://rushjs.io/) tool. It contains documented templates for all the standard Rush configuration files. It also includes three barebones projects that illustrate some dependency relationships in a Rush repo:

- **apps/my-app**: The web application
- **libraries/my-controls**: A control library used by the application
- **tools/my-toolchain**: A NodeJS build tool used to compile the other projects

(These projects are NOT meant to provide a realistic toolchain.)

# Building this repo

To build the projects in this repo, try these shell commands:

```
npm install -g @microsoft/rush
rush install
rush build
```

For more information, see the documentation at: https://rushjs.io/

# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

# How It Works

To truly understand a mono repo, you need to understand how a single application is built, watched, served, and seen by your code editor. Each of these steps are interdependent and defined inside a myriad of config files.

## Steps In The Process

### Building A FE app

1. Bundle Dependent Code -> package.json/tsconfig.json

- description
  - Our app has dependencies. We need to get these dependencies on our computer for it to run.
  - Our dependencies have dependencies. These need to be flattened/optimized/deduped
- configs
  - package.json
  - tsconfig.json
- runners/packages
  - npm
  - pnpm
  - yarn
- commands
  - npm install

2. Configure Code Locations -> package.json/tsconfig.json

- description
  - Our Editor, Compiler, and Builder need to know where to look to find the code
- configs
  - package.json
  - tsconfig.json
- commands/runners that use this
  - tsc
  - rollup
  - webpack
  - vite
  - vscode
  - esbuild

2. Lint Your Code -> eslint/tslint

- description
  - defines how our code looks in the editor
  - defines what code we are allowed to write
- configs
  - eslint.config.js -> what is allowed
  - prettier.config.js -> how it looks
  - tsconfig.json -> what is allowed
  - tailwind.config.js -> additional autocompletion options
- commands/runners
  - npm run lint

3. Test Your Code -> jest/cypress/enzyme

- description
  - we need to emulate an environment that runs our code in order to check if it actually works
  - we need to tell the editor/test runner what files define the tests(i.e. .spec, .test, etc.)
  - we need to tell the bundler to not compile these files at build time, since our consumers don't give a fuck about them.
  - we need to configure how the test runner acts(concurrency, startup/pre run scripts, etc.)
  - jest, cypress, enzyme, mocha, chai, etc. are all "test runners" that can be individually configured and run
  - We often use coverage reports and/or push this coverage to certain technologies that check our coverage
- configs
  - jest.config.js || package.json
  - (rollup|webpack|vite).config.js
- commands/runners
  - jest
  - cypress
  - codcov, coverall, nyc

4. Build Final Dependencies -> npm/pnpm/yarn

- description
  - dev dependencies
    - Our project is being built for a consumer. That could be a library, a server, or a JS application.
    - This consumer does not give a fuck about our development environment
    - All packages/techologies that we have to make our dev environment nicer need to be removed
  - peer dependencies
    - our project doesn't use lodash, but it uses material-ui. material-ui uses lodash. To build the correct MUI code, we need to also have lodash's code.
  - duplicate dependencies
    - duplicate dependencies come from peer dependencies.
    - our project might have lodash. it might also have material-ui, which uses lodash as well.
    - we don't want a bunch of duplicate code in production, so we want to remove these where we can.
    - Semvar claims that a library will not contain any breaking changes unless the first number changes.
      - In a perfect world, we can use the same version of a library as long as the first number isn't different.
      - the world is not perfect.
      - npm/yarn/pnpm all suck dick and frequently fuck your world up as a result of this.
  - unused dependencies
    - our app might have lodash, and not use it anywhere.
    - this dependency will be built anyway, because this step does not do anything but see what's in your package.json and then build it.
- configs
  - package.json
- commands/runners
  - npm/pnpm/yarn

5. Compile Javascript Code So that Our Consumer Can Understand It -> tsc/babel

- description
  - many systems don't know how to compile typescript, we we have to change it to node
  - many systems don't know how to compile newer versions of node, so we have to change it to an older version
  - Babel is a compiler that does this, the tsc compiler can also accomplish this.
  - Babel has a larger ecosystem of plugins that allow you more fine grained control over this part of the process configs
  - We also want to do this for all the dependencies we've added.
- configs
  - tsconfig.json
  - babel.config.js -> transform to older version of node commands/runners
- commands/runners
  - tsc build --flags
  - npx babel --flgs
  - rollup --flags

6. Compile React Code so that Our Consumer can understand it -> rollup/webpack/babel

- description
  - browsers don't give a fuck about react. it's a toolchain used to make development easier.
  - we need to transform react code into pure JS code
- configs
  - babel.config.js
  - rollup.config.js
- runners
  - rollup
  - babel

7. Tree Shake Application: Remove Unused Javascript Code -> rollup/webpack

- description
  - Sometimes we write a function/make a file and then we don't delete it.
  - Sometimes we import a library with 600 functions, but only use 3 of them.
  - Tree Shaking removes unused code
- configs
  - rollup.config.js
- runners
  - rollup/webpack/vite

8. Minify Javascript Code -> uglifyJS/terser

- description
  - We want our bundle as small as possible
  - characters take up space
  - our compiler doesn't give a fuck about spaces or newline characters
  - to make things more efficient, we deleted all spaces/new lines when it makes sense.
- configs
  - uglifyJS/terser
- runners/commands

7. Compile CSS files so that our javascript/the browser can understand it -> postcss/node-sass/autoprefixer/tailwind

- descriptions
  - sass/scss isn't supported by default. we need to compile this so that it can be understood
  - we also need to put all our separate css files into one big css file
  - sometimes browsers want different versions of css classes, we want to add those extra versions automatically.
  - we also want our editor to understand any css libraries(i.e. tailwind)
- configs?
  - postcss.config.js

8. Remove CSS classes that we don't use -> purgecss

- description
  - sometimes we make 200 classes and only use 3
  - tailwind gives like 10000 classes, we'll never use all of them
  - we don't want to serve all that shit, so we remove the classes that aren't used.
- configs
  - purceCSS
  - tailwind.config.js
- runners
  - purgeCss is often used in rollup/webpack/vite

# Build Stages

## Transpile

- description Change Code to JavaScript that can be understood
- technologies
  - babel
  - typescript
  - flow

## Pre Process / Compile

- technologies
  - sass / less
  - postcsss

## Uglify / minify / optimize

- technologies
  - uglifyJS
  - terser

## Bundle

- Description
  - Tree Shake -> Remove Unused Code
  - Concat -> take all code across all files in the app and put it in a single file
- technologies
  - rollup
  - webpack
  - vite

## Compress

## Organize / Analyze

- description
  - Copy / Delete / Move Files
  - Check Bundle Size
  - Strip Unused Code(typescript types, etc.)

## Push To Github

## Publish To NPM

## Deploy

- heroku, firebase, netlify, etc.

## Top Level Config

### package.json

### tsconfig.json

## Builders

### rollup

### webpack

### vite

$(git diff --name-only . | grep src | sed 's/.\*\(src\)/\1/')
