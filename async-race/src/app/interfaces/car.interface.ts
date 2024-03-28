export interface CarOptions {
  id: number;
  name: string;
  color: string;
}

export interface CreatedCarOptions {
  name: string;
  color: string;
}

export type GarageInterface = CarOptions[] & number;
