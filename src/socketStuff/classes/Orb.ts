export class Orb {
  color: string;
  locX: number;
  locY: number;
  radius: number;
  constructor(settings:any){
    this.color = this.getRandomColor();
    this.locX = Math.floor(Math.random() * settings.worldWidth);
    this.locY = Math.floor(Math.random() * settings.worldHeight);
    this.radius = settings.defaultGenericSize;
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
