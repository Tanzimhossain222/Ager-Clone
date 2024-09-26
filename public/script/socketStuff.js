import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import { player, players, orbs } from "./uiStuff.js";

const socket = io.connect("http://localhost:8000");

const initSocket = async () => {

  const initData  = await socket.emitWithAck('initialOrbsRequest', {
    playerName: player.name,
  })

  setInterval(() => {
    socket.emit("tock", {
      xVector: player.xVector ? player.xVector : .1,
      yVector: player.yVector ? player.yVector : .1
    });
  }, 33);

  orbs.length = 0; 
  initData.orbs.forEach(orb => orbs.push(orb));
  player.indexInPlayers = initData.indexInPlayers;


  socket.on("tick", (playersArray) => {
    players.length = 0; // Clear current players
    playersArray.forEach(p => players.push(p));

    const currentPlayer = players[player.indexInPlayers];
    if (currentPlayer && currentPlayer.playerData) {
      player.locX = currentPlayer.playerData.locX;
      player.locY = currentPlayer.playerData.locY;
    }
  });

  socket.on("orbSwitch", (orbData) => {
    orbs.splice(orbData.capturedOrbs, 1, orbData.newOrb);
  })

  socket.on("playerAbsorbed", (absorbData) => {
    document.querySelector('#game-message').innerText = `${absorbData.absorbed} was absorbed by ${absorbData.absorbedBy}`;
    setTimeout(() => {
      document.querySelector('#game-message').style.opacity = 0;
    }, 2000);
  });


  socket.on("updateLeaderBoard", (leaderBoardArray) => {
    leaderBoardArray.sort((a, b) => b.score - a.score);
    document.querySelector('.leader-board').innerHTML = leaderBoardArray.map(p => `<li>${p.name} - ${p.score}</li>`).join("");
    const currentPlayer = leaderBoardArray.find(p => p.name === player.name);
    if (currentPlayer) {
      document.querySelector('.player-score').innerText = currentPlayer.score;
    }
  });


}


export { initSocket };
