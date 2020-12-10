// call with getGazeCoords(document.getElementById("target"), document.getElementById("eye"))
export default (target, pupil, eyeline) => {
  // first, get all elements that we need
  // get eyeline with eyeRadius
  const eyeRadius = parseFloat(eyeline.getAttribute("r"), 10);
  const eyelineCenterX = parseFloat(eyeline.getAttribute("cx"), 10);
  const eyelineCenterY = parseFloat(eyeline.getAttribute("cy"), 10);

  // get pupil with pupilRadius
  const pupilRadius = parseFloat(pupil.getAttribute("r"), 10);
  // pupilCenter should be same as eyelineCenter
  // const pupilCenterX = parseFloat(pupil.getAttribute("cx"), 10)
  // const pupilCenterY = parseFloat(pupil.getAttribute("cy"), 10);

  // define max movement value for eye movement
  const maxEyeMovement = eyeRadius - pupilRadius / 2;

  // define target’s center point
  const targetWidth = parseFloat(target.getAttribute("width"), 10);
  const targetHeight = parseFloat(target.getAttribute("height"), 10);
  const targetX = parseFloat(target.getAttribute("x"), 10);
  const targetY = parseFloat(target.getAttribute("y"), 10);
  const targetCenterX = targetX + targetWidth / 2;
  const targetCenterY = targetY + targetHeight / 2;

  // create line equation for the path on which the pupil can move.
  // that is, path between center of the target and the pupil
  const slope = (eyelineCenterY - targetCenterY) / (eyelineCenterX - targetCenterX);
  const intercept = targetCenterY - slope * targetCenterX;

  // circle equation: (x - m1)^2 + (y - m2)^2 = r^2
  // where m1 is the eyelineCenterX and m2 is eyelineCenterY. so in our case:
  // (x - eyelineCenterX)^2 + (y - eyelineCenterY)^2 = maxEyeMovement^2
  // now, we replace y with our line equation (that we just calculated):
  // (x - eyelineCenterX)^2 + (intercept + slope * x - eyelineCenterY)^2 = maxEyeMovement^2
  // rearranging this formula leads to:
  const gazeX =
    -Math.sqrt(
      (eyelineCenterX ** 2 * slope ** 2 +
        2 * eyelineCenterX * intercept * slope -
        2 * eyelineCenterX * eyelineCenterY * slope +
        intercept ** 2 -
        2 * intercept * eyelineCenterY +
        eyelineCenterY ** 2 -
        maxEyeMovement ** 2 * slope ** 2 -
        maxEyeMovement ** 2) /
        (-(slope ** 4) - 2 * slope ** 2 - 1)
    ) +
    (eyelineCenterX - intercept * slope + eyelineCenterY * slope) /
      (slope ** 2 + 1);

  // to get y coordinate of the wanted eye location, insert just calculated x value into the line equation
  const gazeY = slope * gazeX + intercept;

  // FOR TESTING:
  // pupil should be in the middle
  // pupil.setAttribute('cx', eyelineCenterX);
  // pupil.setAttribute('cy', slope * eyelineCenterX + intercept);

  return [gazeX, gazeY];
};
