
# Bowling game

Calculates the points of a 10 frame bowling game based on CLI input using NodeJS. The application prints the resulting score to the console.
Alternatively the functionality can be imported as a module:

```
import calculateScore from 'bowling'

calculateScore([[1, 4], [4, 5], [6, 4], [5, 5], [10], [0, 1], [7, 3], [6, 4], [10], [2, 8])

```

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

## Run

Run the `score` command to calculate the score and add the frames as arrays:

`npm run score <results>`

Example.:

`npm run score "[1, 4], [4, 5], [6, 4], [5, 5], [10], [0, 1], [7, 3], [6, 4], [10], [2, 8]"`
