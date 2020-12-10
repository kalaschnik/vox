import getGazeCoords from './js/getGazeCoords';

const iris = document.getElementById("iris");
const pupil = document.getElementById("pupil");
const eyeline = document.getElementById("eyeline");
const target = document.getElementById("target");

const gazeCoords = getGazeCoords(target, pupil, eyeline);

// pupil should be on intersection line / circle
pupil.setAttribute("cx", gazeCoords.x);
pupil.setAttribute("cy", gazeCoords.y);
// iris too
iris.setAttribute("cx", gazeCoords.x);
iris.setAttribute("cy", gazeCoords.y);