// import print from './js/print';
// import myMean from './js/mymean';

// console.log(print);
// console.log(myMean(5));

// // get all screens
// const instructions = document.querySelector('#instructions');
// const startscreen = document.querySelector('#startscreen');
// const goodbye = document.querySelector('#goodbye');

// // auto-process
// // atach a "slide" class to all children from main experiment
// [...document.querySelector('svg').children].forEach((s) => s.classList.add('slides'));

// // "auto" hide all parents
// instructions.setAttribute('visibility', 'hidden');
// startscreen.setAttribute('visibility', 'hidden');
// goodbye.setAttribute('visibility', 'hidden');

// // Define your procedure
// // show instructions
// instructions.setAttribute('visibility', 'visible');
// // go to start screen using click
// instructions.addEventListener('click', () => { showSlide('startscreen'); });
// // get change gaze button
// const gazeButton = document.querySelector('#startscreen-foreground-button-changegaze');
// // get gazing eyes
// const gazeEyes = document.querySelector('#eyes');
// // initially hide gazing eyes
// gazeEyes.setAttribute('visibility', 'hidden');
// gazeButton.addEventListener('click', () => gazeEyes.setAttribute('visibility', 'visible'));

// // use next button to go to goodbye slide
// const nextButton = document.querySelector('#startscreen-foreground-button-next');
// nextButton.addEventListener('click', () => {
//   showSlide('goodbye');
//   gazeEyes.setAttribute('visibility', 'hidden');
// });

// get boundary
const eyeline = document.getElementById('eyeline');
const pupil = document.getElementById('pupil');

// get eye radius
const eyeRadius = eyeline.getAttribute('r');
// get pupil radius
const pupilRadius = pupil.getAttribute('r');

// define max movement value for eye movement
const maxEyeMovement = eyeRadius - pupilRadius / 2;
console.log(maxEyeMovement);

// get target object
const target = document.getElementById('target');
console.log(target);

// define target’s center point
const targetWidth = parseInt(target.getAttribute('width'), 10);
const targetHeight = parseInt(target.getAttribute('height'), 10);
const targetX = parseInt(target.getAttribute('x'), 10);
const targetY = parseInt(target.getAttribute('y'), 10);

const targetCenterX = targetX + targetWidth / 2;
const targetCenterY = targetY + targetHeight / 2;

const pupilCenterX = parseInt(pupil.getAttribute('cx'), 10);
const pupilCenterY = parseInt(pupil.getAttribute('cy'), 10);

const slope = (pupilCenterY - targetCenterY) / (pupilCenterX - targetCenterX);
const intercept = targetCenterY - slope * targetCenterX;
console.log('slope', slope);
console.log('intercept', intercept);

console.log('moveto', slope * pupilCenterX + intercept);
console.log('pupilCenterY', pupilCenterY);

const xIntercept = -Math.sqrt(
  ((intercept ** 2) * -1 - 2 * intercept * pupilCenterX * slope - pupilCenterX ** 2 * slope ** 2 + maxEyeMovement ** 2 * slope ** 2 + maxEyeMovement ** 2) / (slope ** 4 + 2 * slope ** 2 + 1),
) + ((-intercept * slope + pupilCenterX) / (slope ** 2 + 1));

console.log(xIntercept);

pupil.setAttribute('cx', xIntercept);
pupil.setAttribute('cy', slope * xIntercept + intercept);

// get pupil radius
// const pupilRadius =

//
// const hypotenuse = Math.sqrt((targetCenterX - pupilCenterX) ** 2 + (targetCenterY - pupilCenterY) ** 2);
// const centerPointX = pupilCenterX;
// const centerPointY =
// console.log(targetCenterX);
// console.log(pupilCenterX);
// console.log(hypotenuse);
