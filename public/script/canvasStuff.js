
import { player, players, orbs } from "./uiStuff.js";

let canvas;
let context;
let xVector, yVector;

/* Initialize the canvas and context */
export const init = () => {
  canvas = document.getElementById("the-canvas");
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }
  context = canvas.getContext("2d");

  if (!context) {
    console.error("2D context not available");
    return;
  }

  const wWidth = window.innerWidth;
  const wHeight = window.innerHeight;
  canvas.width = wWidth;
  canvas.height = wHeight;

  draw();
  mouseMove();
};


/*----------  Draw  ----------*/
const draw = () => {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  //clam the screen/view port to the player location
  const camX = - player.locX + canvas.width / 2;
  const camY = - player.locY + canvas.height / 2;
  // translate move the origin to the player location
  context.translate(camX, camY);

  // Draw the player
  players.forEach(player => {
    if (!player.playerData) return;
    context.beginPath();
    context.fillStyle = player.playerData.color;
    context.arc(player.locX, player.locY, player.playerData.radius, 0, Math.PI * 2);
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = 'rgb(0, 255, 0)';
    context.stroke();
  });

  // Draw the orbs
  orbs.forEach(orb => {
    context.beginPath();
    context.fillStyle = orb.color;
    context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
    context.fill();

  });

  requestAnimationFrame(draw); // requestAnimationFrame is a function that calls the draw function again and again
};


/*----------  Mouse Move  ----------*/
const mouseMove = (e) => {
  canvas.addEventListener('mousemove', (event) => {
    const mousePosition = {
      x: event.clientX,
      y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height / 2), mousePosition.x - (canvas.width / 2)) * 180 / Math.PI;
    if (angleDeg >= 0 && angleDeg < 90) {
      xVector = 1 - (angleDeg / 90);
      yVector = -(angleDeg / 90);
    } else if (angleDeg >= 90 && angleDeg <= 180) {
      xVector = -(angleDeg - 90) / 90;
      yVector = -(1 - ((angleDeg - 90) / 90));
    } else if (angleDeg >= -180 && angleDeg < -90) {
      xVector = (angleDeg + 90) / 90;
      yVector = (1 + ((angleDeg + 90) / 90));
    } else if (angleDeg < 0 && angleDeg >= -90) {
      xVector = (angleDeg + 90) / 90;
      yVector = (1 - ((angleDeg + 90) / 90));
    }
    player.xVector = xVector || 0.1;
    player.yVector = yVector || 0.1;
  })
};





export { draw };

