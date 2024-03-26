import { CarOptions } from './car.interface';

export interface GarageState {
  currentPage: number;
  carsLength: number;
  pageLength: number | null;
  activeCarsId: number[];
  winnerCar: CarOptions | null;
}
