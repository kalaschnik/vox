import print from './js/print';
import myMean from './js/mymean';

console.log(print);
console.log(myMean(5));

// get all screens
const instructions = document.querySelector('#instructions');
const startscreen = document.querySelector('#startscreen');
const goodbye = document.querySelector('#goodbye');

// auto-process
// atach a "slide" class to all children from main experiment
[...document.querySelector('svg').children].forEach((s) => s.classList.add('slides'));

// "auto" hide all parents
instructions.setAttribute('visibility', 'hidden');
startscreen.setAttribute('visibility', 'hidden');
goodbye.setAttribute('visibility', 'hidden');

// Define your procedure
// show instructions
instructions.setAttribute('visibility', 'visible');
// go to start screen using click
instructions.addEventListener('click', () => { showSlide('startscreen'); });
// get change gaze button
const gazeButton = document.querySelector('#startscreen-foreground-button-changegaze');
// get gazing eyes
const gazeEyes = document.querySelector('#eyes');
// initially hide gazing eyes
gazeEyes.setAttribute('visibility', 'hidden');
gazeButton.addEventListener('click', () => gazeEyes.setAttribute('visibility', 'visible'));

// use next button to go to goodbye slide
const nextButton = document.querySelector('#startscreen-foreground-button-next');
nextButton.addEventListener('click', () => {
  showSlide('goodbye');
  gazeEyes.setAttribute('visibility', 'hidden');
});