
import _ from 'lodash'

/** Calculate the score of a bowling game based on an array with frames
 * @param {array} results - array of frame arrays
 * @returns {number} score
 */
export const calculateScore = results => {
  // Validate input
  const frames = validateResults(results)

  let score = 0
  // Calculate the accumulated scores
  _.forEach(frames, (frame, key) => {
    // Check if this is the last frame in the game
    let isLast = false
    if (key === 9) isLast = true

    // The last frame is validated differently than the first nine
    if (isLast) frame = validateAsLastFrame(frame)
    else frame = validateAsFirstFrame(frame)

    // Get the score for the frame and possible bonuses
    score += scoreForFrame(frame)
    if (isStrike(frame)) {
      if (isLast) score += bonusForStrike(frame)
      else {
        // Cover the case of successive strikes
        if (isStrike(frames[key + 1])) score += 20
        else score += bonusForStrike(frames[key + 1])
      }
    }
    if (isSpare(frame)) {
      if (isLast) score += bonusForSpare(frame, isLast)
      else score += bonusForSpare(frames[key + 1])
    }
    // Uncomment for demonstration purposes
    // console.log(`The score for frame ${key + 1} is ${score}`)
  })

  return score
}

/** Validates a bowling game results array with frames and rolls and returns the argument if valid
 *  otherwise throws an error
 * @param {array} results - array of frame arrays
 * @returns {array} results
 */
export const validateResults = results => {
  if (!_.every(results, r => _.isArray(r))) {
    throw new Error('Result frames must be arrays.')
  } else if (results.length > 10) {
    throw new Error('Result cannot have more than 10 frames.')
  } else return results
}

/** Returns the frame passed as argument if the frame qualifies as being on of the first nine frames in the game
 *  otherwise throws an error
 * @param {array} frame - current frame
 * @returns {array} frame
 */
export const validateAsFirstFrame = frame => {
  if (!_.every(frame, el => _.isNumber(el))) {
    throw new Error('Frame must only consist of numbers')
  } else if (frame.length > 2) {
    throw new Error('Frame cannot have more than 2 rolls.')
  } else if (frame[0] === 10 && frame.length > 1) {
    throw new Error('Frame cannot have second role if first roll striked.')
  } else if (frame[0] + frame[1] > 10) {
    throw new Error('Total number of pins scored per frame cannot be greater than 10.')
  } else return frame
}

/** Returns the frame passed as argument if the frame qualifies as being the last frame in the game
 *  otherwise throws an error
 * @param {array} frame - current frame
 * @param {function} spareValidator - handler to determine if a frame is a spare
 * @param {function} strikeValidator - handler to determine if a frame is a strike
 * @returns {array} frame
 */
export const validateAsLastFrame = (frame, spareValidator = isSpare, strikeValidator = isStrike) => {
  if (!_.every(frame, el => _.isNumber(el))) {
    throw new Error('Frame must only consist of numbers')
  } else if (frame.length > 3) {
    throw new Error('Last frame cannot have more than three rolls.')
  } else if (frame.length === 3) {
    if (spareValidator(frame)) return frame
    else throw new Error('Last frame needs a spare in order to qualify for three rolls.')
  } else if (strikeValidator(frame) && frame.length === 1) {
    throw new Error('Last frame must have two rolls if first roll was a strike.')
  } else return frame
}

/** Determines whether the frame is a spare
 * @param {array} frame - current frame
 * @returns {boolean}
 */
export const isSpare = frame => {
  if (frame[0] === 10) return false
  else if (frame[0] + frame[1] === 10) return true
  else return false
}

/** Determines whether the frame is a strike
 * @param {array} frame - current frame
 * @returns {boolean}
 */
export const isStrike = frame => {
  if (frame[0] === 10) return true
  else return false
}

/** Returns the score of the current frame
 * @param {array} frame - current frame
 * @returns {number}
 */
export const scoreForFrame = frame => {
  if (frame[0] === 10) return 10
  else return (frame[0] + frame[1])
}

/** Returns the spare bonus
 * @param {array} frame - the frame after the current frame
 * or the current frame if it is the last frame
 * @param {boolean} isLastFrame - indicate if this the last frame in the game. Defaults to false.
 * @returns {number}
 */
export const bonusForSpare = (frame, isLastFrame = false) => {
  if (isLastFrame) {
    if (frame.length !== 3) {
      throw new Error('Spare bonus cannot be calculated if the last frame does not have 3 rolls.')
    } else return frame[2]
  } else return frame[0]
}

/** Returns the strike bonus
 * @param {array} frame - the frame after the current frame
 * or the current frame if it is the tenth frame
 * @returns {number}
 */
export const bonusForStrike = (frame) => {
  return frame[0] + frame[1]
}
