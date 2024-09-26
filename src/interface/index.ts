export interface ISettings {
  defaultOrbCount: number;
  defaultSize: number;
  defaultSpeed: number;
  defaultZoom: number;
  worldWidth: number;
  worldHeight: number;
  defaultGenericSize: number;
}

export interface IPlayerData {
  name: string;
  locX: number;
  locY: number;
  radius: number;
  color: string;
  score: number;
  isAlive: boolean;
  orbsAbsorbed: number; 
}

export interface IPlayerConfig {
  xVector: number;
  yVector: number;
  speed: number;
  zoom: number;
}
