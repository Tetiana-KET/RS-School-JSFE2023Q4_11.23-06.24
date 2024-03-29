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
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 51) + 50;
    const lightness = Math.floor(Math.random() * 51) + 50;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
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
