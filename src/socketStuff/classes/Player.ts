import { IPlayerConfig, IPlayerData, ISettings } from "../../interface";
import { PlayerConfig } from './PlayerConfig';

export class Player {
  config: PlayerConfig;
  playerData: IPlayerData;
  socketId: string;
  
  constructor(socketId: string, config: IPlayerConfig, playerData: IPlayerData) {
    this.socketId = socketId;
    this.config = config;
    this.playerData = playerData;
  }
}