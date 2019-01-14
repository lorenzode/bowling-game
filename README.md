
# Bowling game

Calculates the points of a 10 frame bowling game using NodeJS. The application prints the resulting score to the console.

## Requirements

You need [NodeJS](https://nodejs.org/en/) to be installed. Tested on Node v11.2.0.

## Install

Install dependencies using the NPM package manager:

`npm install`

## Run tests

Run unit tests:

`npm run test`

## Build

Build and transpile the application into the `_dist` directory:

`npm run build`

Uncomment [this line](https://github.com/lorenzode/bowling-game/blob/cdc8c4bf3f630d7f3021cea5cf5134ed9066975d/src/lib.js#L38) for additional score per frame output.

## CLI usage

Run the `score` command to calculate the score where `results` is an array of frame arrays:

`npm run score <results>`

Example:

`npm run score "[1, 4], [4, 5], [6, 4], [5, 5], [10], [0, 1], [7, 3], [6, 4], [10], [2, 8, 6]"`

## Module usage

Alternatively the functionality can be imported as a module:

```
import calculateScore from 'bowling-game'

calculateScore([[1, 4], [4, 5], [6, 4], [5, 5], [10], [0, 1], [7, 3], [6, 4], [10], [2, 8, 6]])

```
