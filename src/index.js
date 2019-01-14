
import { calculateScore } from 'lib'

// Get the results from the command line as an array of arrays
const results = JSON.parse('[' + process.argv[2] + ']')
console.log('You have entered the following results: ' + results)

// Calculate and print the score of a bowling game
calculateScore(results)

export default calculateScore
