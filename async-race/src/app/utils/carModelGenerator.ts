import { makes, models } from '../data/carMake';
import { CreatedCarOptions } from '../interfaces/car.interface';
import { generateRandomNumber } from './commonUtils';

export default class CarModelGenerator {
  private makes: string[];
  private models: string[];

  constructor() {
    this.makes = makes;
    this.models = models;
  }

  private getRandomColor(): string {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');

    const color = `#${redHex}${greenHex}${blueHex}`;
    return color;
  }

  private generateRandomName(): string {
    const randomMakeIndex = generateRandomNumber(this.makes.length);
    const randomModelIndex = generateRandomNumber(this.models.length);
    return `${this.makes[randomMakeIndex]} ${this.models[randomModelIndex]}`;
  }

  public generateRandomCar(): CreatedCarOptions {
    const result = {
      name: this.generateRandomName(),
      color: this.getRandomColor(),
    };

    return result;
  }
}
