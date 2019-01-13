import assert from 'assert'
import _ from 'lodash'

import {
  calculateScore,
  validateResults,
  validateFrame,
  validateAsFirstFrame,
  validateAsLastFrame,
  isSpare,
  isStrike,
  scoreForFrame,
  bonusForSpare,
  bonusForStrike
} from '../src/lib'

// describe('#calculateScore', (done) => {
//   it('should return the score as integer if all validations passed', (done) => {
//     // This is a valid results array
//     const results = [[1, 4], [4, 5], [6, 4], [5, 5], [10], [0, 1], [7, 3], [6, 4], [10], [2, 8]]
//     done()
//   })
// })

describe('#validateResults', (done) => {
  it('should receive results as an array with maximum 10 frames', (done) => {
    // This results array is not valid because it has 11 frames
    const results = [[1, 4], [4, 5], [6, 4], [5, 5], [10], [0, 1], [7, 3], [6, 4], [10], [2, 8], [1, 1]]
    assert.throws(() => validateResults(results), Error)
    done()
  })

  it('should receive results as an array of frame arrays', (done) => {
    // This results array is not valid because it does not only consist of arrays
    const results = [[1, 4], 'string', [6, 4], [5, 5], [10], [0, 1], [7, 3], [6, 4], [10], [2, 8]]
    assert.throws(() => validateResults(results), Error)
    done()
  })

  it('should return results received as arguments if the results are valid', (done) => {
    // This is a valid results array
    const results = [[1, 4], [4, 5], [6, 4], [5, 5], [10], [0, 1], [7, 3], [6, 4], [10], [2, 8]]
    assert.ok(_.isEqual(validateResults(results), results))
    done()
  })
})

describe('#validateFrame', (done) => {
  it('should throw error if frame is not array of numbers', (done) => {
    assert.throws(() => validateFrame([1, 'string']), Error)
    done()
  })

  it('should throw error if frame has second roll after having already one roll with 10 points', (done) => {
    assert.throws(() => validateFrame([10, 1]), Error)
    done()
  })

  it('should throw error if frame has more than 10 pins scored', (done) => {
    assert.throws(() => validateFrame([5, 6]), Error)
    done()
  })

  it('should return argument if received valid frame as argument', (done) => {
    assert.ok(_.isEqual(validateFrame([1, 2]), [1, 2]))
    done()
  })
})

describe('#validateAsFirstFrame', (done) => {
  it('should throw error if frame has more than 2 rolls', (done) => {
    assert.throws(() => validateAsFirstFrame([1, 2, 3]), Error)
    done()
  })
})

describe('#validateAsLastFrame', (done) => {
  it('should return frame if it has 3 rolls and the first two rolls are a spare', (done) => {
    assert.ok(_.isEqual(validateAsLastFrame([5, 5, 3]), [5, 5, 3]))
    done()
  })

  it('should throw error if it has three rolls and the first two rolls are not a spare', (done) => {
    assert.throws(() => validateAsLastFrame([1, 5, 3]), Error)
    done()
  })

  it('should throw error if it has one roll and that roll was a strike', (done) => {
    assert.throws(() => validateAsLastFrame([10]), Error)
    done()
  })
})

describe('#isSpare', (done) => {
  it('should return true if a number of 10 pins was scored for rolls in a given frame', (done) => {
    assert.ok(isSpare([5, 5]))
    done()
  })

  it('should return false if a number of 10 pins were scored in the first roll', (done) => {
    assert.equal(isSpare([10]), false)
    done()
  })
})

describe('#isStrike', (done) => {
  it('should return true if 10 pins are scored in first roll of a frame', (done) => {
    assert.ok(isStrike([10]))
    done()
  })

  it('should return false if a frame consists of two rolls of 5 pins', (done) => {
    assert.equal(isStrike([5, 5]), false)
    done()
  })
})

describe('#scoreForFrame', (done) => {
  it('should be the amount of pins scored in the first roll plus the number of pins scored in the second roll', (done) => {
    assert.equal(scoreForFrame([3, 4]), 7)
    done()
  })
})

describe('#bonusForSpare', (done) => {
  it('should be the amount of pins scored in the first roll of the next frame', (done) => {
    assert.equal(bonusForSpare([5, 1]), 5)
    done()
  })
})

describe('#bonusForStrike', (done) => {
  it('should be the amount of pins scored in the next two rolls', (done) => {
    assert.equal(bonusForStrike([5, 1]), 6)
    done()
  })
})
