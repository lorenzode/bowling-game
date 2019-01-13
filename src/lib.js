
import _ from 'lodash'

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

export const validateResults = results => {
  if (!_.every(results, r => _.isArray(r))) {
    throw new Error('Result frames must be arrays.')
  } else if (results.length > 10) {
    throw new Error('Result cannot have more than 10 frames.')
  } else return results
}

export const validateFrame = frame => {
  if (!_.every(frame, el => _.isNumber(el))) {
    throw new Error('Frame must only consist of numbers')
  } else if (frame[0] === 10 && frame.length > 1) {
    throw new Error('Frame cannot have second role if first roll striked.')
  } else if (frame[0] + frame[1] > 10) {
    throw new Error('Total number of pins scored per frame cannot be greater than 10.')
  } else return frame
}

export const validateAsFirstFrame = frame => {
  if (frame.length > 2) throw new Error('Frame cannot have more than 2 rolls.')
  else return frame
}

export const validateAsLastFrame = (frame, spareValidator = isSpare, strikeValidator = isStrike) => {
  if (frame.length === 3) {
    if (spareValidator(frame)) return frame
    else throw new Error('Last frame needs a spare in order to qualify for three rolls.')
  } else if (strikeValidator(frame) && frame.length === 1) {
    throw new Error('Last frame must have two rolls if first roll was a strike.')
  }
}

export const isSpare = frame => {
  if (frame[0] === 10) return false
  else if (frame[0] + frame[1] === 10) return true
  else return false
}

export const isStrike = frame => {
  if (frame[0] === 10) return true
  else return false
}

export const scoreForFrame = frame => {
  return (frame[0] + frame[1])
}

export const bonusForSpare = nextFrame => {
  return nextFrame[0]
}

export const bonusForStrike = nextFrame => {
  return nextFrame[0] + nextFrame[1]
}
