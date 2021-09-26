# exchange-app

- [Prerequisites](#prerequisites)
- [How-To](#how-to)
  - [Do the setup](#do-the-setup)
  - [Start the application](#start-the-application)
  - [Components Visualization](#visualization)
  - [Build the bundle](#build-the-bundle)
  - [Run Tests](#run-tests)
    - [Unit Tests](#unit-tests)
    - [Type Checking](#type-checking)
    - [Linting](#linting)
    - [Basic Test Suite](#basic-test-suite)
  - [Commit](#commit)

## Prerequisites

- Node version equal or greater 14.15
- Yarn version equal or greater 1.22

## How-To

### Do the setup

- clone the exchange-app repo
- switch to folder
- run `yarn` for installing the dependencies

### Start the application

Use `yarn start` for displaying the development page. It has hot reloading and source maps for better debugging.

### Visualization

In order to visualize, develop with hot-reloading and interact with the UI components, we should run the stories using:

`yarn storybook`

### Build the bundle

Use `yarn build` for building the bundle and create the assets.

### Run Tests

#### Unit Tests

`yarn test:unit`

#### Type Checking

`yarn test:types`

#### Linting

`yarn lint`

### Commit

For committing is as easy as running the following:

`yarn git-cz`

It will prompt an interactive CLI menu to know which type of commit you are trying to add. The recommendation for commit messages is to use the third person present like this:

`:rocket: (data-service)  Add new account in GBP`

Recommended before committing or pushing.

`yarn test`
