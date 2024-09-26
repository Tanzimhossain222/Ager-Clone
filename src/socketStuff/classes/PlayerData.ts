import { IPlayerData, ISettings } from "../../interface";
import { getRandomColor } from "../../utils/randomeColor";

export class PlayerData implements IPlayerData {
  name: string;
  locX: number;
  locY: number;
  radius: number;
  color: string;
  score: number;
  isAlive: boolean;
  orbsAbsorbed: number; 

 
  constructor(playerName: string, settings: ISettings) {
    this.name = playerName;
    this.locX = Math.floor(Math.random() * settings.worldWidth);
    this.locY = Math.floor(Math.random() * settings.worldHeight);
    this.radius = settings.defaultGenericSize;
    this.color = getRandomColor();
    this.score = 0;
    this.isAlive = true;
    this.orbsAbsorbed = 0;
  }

  
}