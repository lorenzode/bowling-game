
import _ from 'lodash'

/** Calculate the score of a bowling game based on array with frames
 * @param {array} results - array of frame arrays
 * @returns {number} score
 */
export const calculateScore = results => {
  const frames = validateResults(results)
  let score = 0

  // Calculate the accumulated scores
  _.forEach(frames, (value, key) => {
    // Do a general frame validation
    const frame = validateFrame(value)
    // The last frame is checked by different validation criteria
    if (key < 9) validateAsFirstFrame(frame)
    else validateAsLastFrame(frame)

    score += scoreForFrame(frame)
    if (isStrike(frame)) score += bonusForStrike(frames[key + 1])
    if (isSpare(frame)) score += bonusForSpare(frames[key + 1])
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

/** Returns the frame passed as argument if the frame qualifies as being a frame in a bowling game
 *  otherwise throws an error
 * @param {array} frame - current frame
 * @returns {array} frame
 */
export const validateFrame = frame => {
  if (!_.every(frame, el => _.isNumber(el))) {
    throw new Error('Frame must only consist of numbers')
  } else if (frame[0] === 10 && frame.length > 1) {
    throw new Error('Frame cannot have second role if first roll striked.')
  } else if (frame[0] + frame[1] > 10) {
    throw new Error('Total number of pins scored per frame cannot be greater than 10.')
  } else return frame
}

/** Returns the frame passed as argument if the frame qualifies as being on of the first nine frames in the game
 *  otherwise throws an error
 * @param {array} frame - current frame
 * @returns {array} frame
 */
export const validateAsFirstFrame = frame => {
  if (frame.length > 2) throw new Error('Frame cannot have more than 2 rolls.')
  else return frame
}

/** Returns the frame passed as argument if the frame qualifies as being the last frame in the game
 *  otherwise throws an error
 * @param {array} frame - current frame
 * @param {function} spareValidator - handler to determine if a frame is a spare
 * @param {function} strikeValidator - handler to determine if a frame is a strike
 * @returns {array} frame
 */
export const validateAsLastFrame = (frame, spareValidator = isSpare, strikeValidator = isStrike) => {
  if (frame.length === 3) {
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
  return (frame[0] + frame[1])
}

/** Returns the bonus if a spare happened in the current frame
 * @param {array} nextFrame - the frame after the current frame
 * @returns {number}
 */
export const bonusForSpare = nextFrame => {
  return nextFrame[0]
}

/** Returns the bonus if a strike happened in the current frame
 * @param {array} nextFrame - the frame after the current frame
 * @returns {number}
 */
export const bonusForStrike = nextFrame => {
  return nextFrame[0] + nextFrame[1]
}
