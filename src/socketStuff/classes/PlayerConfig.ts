import { IPlayerConfig, ISettings } from "../../interface";


export class PlayerConfig implements IPlayerConfig {
  xVector: number;
  yVector: number;
  speed: number;
  zoom: number;

  constructor(settings: ISettings) {
    this.xVector = 0;
    this.yVector = 0;
    this.speed = settings.defaultSpeed;
    this.zoom = settings.defaultZoom;
  }
}