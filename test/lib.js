import assert from 'assert'
import _ from 'lodash'

import {
  calculateScore,
  validateResults,
  validateAsFirstFrame,
  validateAsLastFrame,
  isSpare,
  isStrike,
  scoreForFrame,
  bonusForSpare,
  bonusForStrike
} from '../src/lib'

describe('#calculateScore', (done) => {
  it('should return the expected score if no frames have spares and strikes', (done) => {
    const results = [[1, 4], [4, 5], [6, 1], [5, 1], [1, 1], [0, 1], [7, 2], [6, 1], [1, 1], [2, 1]]
    const expectedScore = 51
    assert.equal(calculateScore(results), expectedScore)
    done()
  })

  it('should return the expected score if some of the frames have spares and strikes', (done) => {
    const results = [[1, 4], [4, 5], [6, 4], [5, 5], [10], [0, 1], [7, 3], [6, 4], [10], [2, 8, 6]]
    const expectedScore = 133
    assert.equal(calculateScore(results), expectedScore)
    done()
  })

  it('should return the expected score if the last frame has three rolls because of a spare', (done) => {
    const results = [[1, 4], [4, 5], [6, 1], [5, 1], [1, 1], [0, 1], [7, 2], [6, 1], [1, 1], [5, 5, 1]]
    const expectedScore = 59
    assert.equal(calculateScore(results), expectedScore)
    done()
  })

  it('should return the expected score if the last frame has a strike', (done) => {
    const results = [[1, 4], [4, 5], [6, 1], [5, 1], [1, 1], [0, 1], [7, 2], [6, 1], [1, 1], [10, 1]]
    const expectedScore = 69
    assert.equal(calculateScore(results), expectedScore)
    done()
  })

  it('should return the expected score for a perfect game', (done) => {
    const results = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10, 10]]
    const expectedScore = 300
    assert.equal(calculateScore(results), expectedScore)
    done()
  })
})

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
    const results = [[1, 4], [4, 5], [6, 4], [5, 5], [10], [0, 1], [7, 3], [6, 4], [10], [2, 8, 1]]
    assert.ok(_.isEqual(validateResults(results), results))
    done()
  })
})

describe('#validateAsFirstFrame', (done) => {
  it('should throw error if frame has more than 2 rolls', (done) => {
    assert.throws(() => validateAsFirstFrame([1, 2, 3]), Error)
    done()
  })

  it('should throw error if frame is not array of numbers', (done) => {
    assert.throws(() => validateAsFirstFrame([1, 'string']), Error)
    done()
  })

  it('should throw error if frame has second roll after having already one roll with 10 points', (done) => {
    assert.throws(() => validateAsFirstFrame([10, 1]), Error)
    done()
  })

  it('should throw error if frame has more than 10 pins scored', (done) => {
    assert.throws(() => validateAsFirstFrame([5, 6]), Error)
    done()
  })

  it('should return argument if received valid frame as argument', (done) => {
    assert.ok(_.isEqual(validateAsFirstFrame([1, 2]), [1, 2]))
    done()
  })
})

describe('#validateAsLastFrame', (done) => {
  it('should throw error if frame is not array of numbers', (done) => {
    assert.throws(() => validateAsLastFrame([1, 'string']), Error)
    done()
  })

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

  it('should throw error if it has more than 3 rolls', (done) => {
    assert.throws(() => validateAsLastFrame([1, 5, 2, 4]), Error)
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

  it('should be the score of the first roll only if first roll is a strike', (done) => {
    assert.equal(scoreForFrame([10]), 10)
    done()
  })
})

describe('#bonusForSpare', (done) => {
  it('should be the amount of pins scored in the first roll of the next frame if this is not the last frame', (done) => {
    assert.equal(bonusForSpare([5, 1]), 5)
    done()
  })

  it('should be the amount of pins scored in the third roll if this is the last frame', (done) => {
    assert.equal(bonusForSpare([5, 1, 2], true), 2)
    done()
  })

  it('should throw an error if this is the last frame and the frame does not have three rolls', (done) => {
    assert.throws(() => bonusForSpare([5, 1], true), Error)
    done()
  })
})

describe('#bonusForStrike', (done) => {
  it('should be the amount of pins scored in the first two rolls of the frame passed as argument', (done) => {
    assert.equal(bonusForStrike([5, 1]), 6)
    done()
  })
})
