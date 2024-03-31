export interface CarOptions {
  id: number;
  name: string;
  color: string;
}

export interface WinnerOptions {
  id: number;
  wins: number;
  time: number;
}

export interface CreatedCarOptions {
  name: string;
  color: string;
}

export interface RaceParameters {
  velocity: number;
  distance: number;
}

export type GarageInterface = CarOptions[];
export type WinnersInterface = WinnerOptions[];
