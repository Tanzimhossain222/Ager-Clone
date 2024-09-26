import { ISettings } from "../interface";
import { app, io } from "../Server";
import {
  checkForOrbCollisions,
  checkForPlayerCollisions,
} from "./checkCollisions";
import { Orb } from "./classes/Orb";
import { Player } from "./classes/Player";
import { PlayerConfig } from "./classes/PlayerConfig";
import { PlayerData } from "./classes/PlayerData";

interface IOrbs {
  orbs: Orb[];
  players: Player[];
  playersForUser: Player[];
}

// on server start to make initial orbs
const orbs: Orb[] = [];
const players: Player[] = [];
const playersForUser: Player[] = [];

const settings: ISettings = {
  defaultOrbCount: 5000,
  defaultSize: 6,
  defaultSpeed: 6,
  defaultZoom: 1.5,
  worldWidth: 5000,
  worldHeight: 5000,
  defaultGenericSize: 5,
};

const initGame = () => {
  for (let i = 0; i < settings.defaultOrbCount; i++) {
    const orb = new Orb(settings);
    orbs.push(orb);
  }
  return orbs;
};

initGame();

let tickInterval: NodeJS.Timeout;

const getLeaderboard = () => {



  const leaderBoardArray = players.map((player) => {
    if (player.playerData){
    return {
      name: player.playerData.name,
      score: player.playerData.score,
      };
    } else {
      return 
    }


  });
  return leaderBoardArray;
};

io.on("connection", (socket) => {
  let player: Player;
  socket.on("initialOrbsRequest", (playerObj, callback) => {
    // 30 fps
    if (players.length === 0) {
      tickInterval = setInterval(() => {
        io.to("game").emit("tick", playersForUser);
      }, 33);
    }

    socket.join("game");

    const playerName = playerObj.playerName ?? socket.id.slice(0, 6);

    const playerConfig = new PlayerConfig(settings);
    const playerData = new PlayerData(playerName, settings);
    player = new Player(socket.id, playerConfig, playerData);
    players.push(player); // server side
    playersForUser.push(player); // client side

    callback({ orbs, indexInPlayers: playersForUser.length - 1 });
  });

  socket.on("tock", (data) => {
    if (!player) return;
    if (!player.config) return;

    const speed = player.config.speed;
    const xV = (player.config.xVector = data.xVector);
    const yV = (player.config.yVector = data.yVector);

    if (
      (player.playerData.locX > 5 && xV < 0) ||
      (player.playerData.locX < settings.worldWidth && xV > 0)
    ) {
      player.playerData.locX += speed * xV;
    }
    if (
      (player.playerData.locY > 5 && yV > 0) ||
      (player.playerData.locY < settings.worldHeight && yV < 0)
    ) {
      player.playerData.locY -= speed * yV;
    }

    const capturedOrbs = checkForOrbCollisions(
      player.playerData,
      player.config,
      orbs,
      settings
    );

    if (capturedOrbs !== null) {
      orbs.splice(capturedOrbs, 1, new Orb(settings));
      const orbData = {
        capturedOrbs,
        newOrb: orbs[capturedOrbs],
      };

      io.to("game").emit("orbSwitch", orbData);
      io.to("game").emit("updateLeaderBoard", getLeaderboard());
    }

    //check for player collisions
    const absorbedPlayer = checkForPlayerCollisions(
      player.playerData,
      player.config,
      players,
      playersForUser,
      socket.id
    );

    if (absorbedPlayer !== null) {
      io.to("game").emit("playerAbsorbed", absorbedPlayer);
      io.to("game").emit("updateLeaderBoard", getLeaderboard());
    }
  });

  socket.on("disconnect", () => {

    for (let i = 0; i < players.length; i++) {
      if (players[i].socketId === player.socketId) {
        players.splice(i, 1);
        playersForUser.splice(i, 1);
        break;
      }
    }


    if (players.length === 0) {
      clearInterval(tickInterval);
    }
  });
});

export { app, io };

