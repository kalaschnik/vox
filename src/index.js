import getGazeCoords from './js/getGazeCoords';

const iris = document.getElementById("iris");
const pupil = document.getElementById("pupil");
const eyeline = document.getElementById("eyeline");
const target = document.getElementById("target");

const gazeCoords = getGazeCoords(target, pupil, eyeline);

// pupil should be on intersection line / circle
pupil.setAttribute("cx", gazeCoords[0]);
pupil.setAttribute("cy", gazeCoords[1]);
// iris too
iris.setAttribute("cx", gazeCoords[0]);
iris.setAttribute("cy", gazeCoords[1]);