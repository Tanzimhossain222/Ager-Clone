import { init } from "./canvasStuff.js";

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext  (CanvasRenderingContext2D) 

function setCanvasSize() {
  let canvas = document.getElementById("the-canvas");
  let context = canvas.getContext("2d");
  const wWidth = window.innerWidth;
  const wHeight = window.innerHeight;
  canvas.width = wWidth;
  canvas.height = wHeight;
}

// put the modal in a variable so we can call it later
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const spawnModal = new bootstrap.Modal(document.getElementById('spawnModal'));

const orbs = [];

export const player = {};
export const players = [];

  function initializeUI() {
  window.addEventListener('load', () => {
    setCanvasSize();
    loginModal.show();
  });

  document.querySelector('.name-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name-input').value;
    player.name = name;
    document.querySelector('.player-name').innerText = name;
    console.log("name", name);
    loginModal.hide();
    spawnModal.show();
  });

  document.querySelector('.start-game').addEventListener('click', (e) => {
    spawnModal.hide();

    const elArray = Array.from(document.querySelectorAll('.hiddenOnStart'));
    elArray.forEach(el => el.removeAttribute('hidden'));
    init();
  });


}

export { initializeUI, orbs };

