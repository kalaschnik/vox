import getGazeCoords from './js/getGazeCoords';

const target = document.getElementById('balloon');

const iris_left = document.getElementById('sheep-iris-left');
const pupil_left = document.getElementById('sheep-pupil-left');
const eyeline_left = document.getElementById('sheep-eyeline-left');

const iris_right = document.getElementById('sheep-iris-right');
const pupil_right = document.getElementById('sheep-pupil-right');
const eyeline_right = document.getElementById('sheep-eyeline-right');

// calculate position for left eye
const gazeCoords_left = getGazeCoords(target, pupil_left, eyeline_left);

// pupil should be on intersection line / circle
pupil_left.setAttribute('cx', gazeCoords_left.x);
pupil_left.setAttribute('cy', gazeCoords_left.y);
// iris too
iris_left.setAttribute('cx', gazeCoords_left.x);
iris_left.setAttribute('cy', gazeCoords_left.y);

// calculate position for right eye
const gazeCoords_right = getGazeCoords(target, pupil_right, eyeline_right);

// pupil should be on intersection line / circle
pupil_right.setAttribute('cx', gazeCoords_right.x);
pupil_right.setAttribute('cy', gazeCoords_right.y);
// iris too
iris_right.setAttribute('cx', gazeCoords_right.x);
iris_right.setAttribute('cy', gazeCoords_right.y);
