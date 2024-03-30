import { CarOptions, CreatedCarOptions, GarageInterface, WinnersInterface } from '../interfaces/car.interface';

const serverUrl: string = 'http://localhost:3000';
const path = {
  garage: '/garage',
  engine: '/engine',
  winners: '/winners',
};

// garage cars
type GetCarsResponse = Promise<[Promise<GarageInterface>, number]>;
type GetWinnersResponse = Promise<[Promise<WinnersInterface>, number]>;

export const getCars = async (page: number, limit: number): GetCarsResponse => {
  const response: Response = await fetch(`${serverUrl}${path.garage}?_page=${page}&_limit=${limit}`);
  const cars = await response.json();
  const total: number = Number(response.headers.get('X-Total-Count'));
  return [cars, total];
};

export const createCar = async (carData: CreatedCarOptions): Promise<void> => {
  try {
    const response = await fetch(`${serverUrl}${path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      throw new Error('Failed to update server state');
    }
  } catch (error) {
    console.error('Error updating server state:', error);
  }
};

export const deleteCar = async (thisId: number): Promise<void> => {
  const id = thisId;
  try {
    const response = await fetch(`${serverUrl}${path.garage}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      console.error('Failed to delete car. Status:', response.status);
    }
  } catch (error) {
    console.error('Error updating server state:', error);
  }
};

export const updateCar = async (carData: CarOptions): Promise<void> => {
  const { id } = carData;
  try {
    const response = await fetch(`${serverUrl}${path.garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      throw new Error('Failed to update server state');
    }
  } catch (error) {
    console.error('Error updating server state:', error);
  }
};

export const getWinners = async (page: number, limit: number): GetWinnersResponse => {
  try {
    const response = await fetch(`${serverUrl}${path.winners}?_page=${page}&_limit=${limit}`);
    const winnersCount = Number(response.headers.get('X-Total-Count')) || 0;
    const winners = await response.json();
    console.log(winners);
    console.log(winnersCount);

    return [winners, winnersCount];
  } catch (err) {
    console.log('getWinnersByPage error', err);
    throw err;
  }
};

export const getWinnerCar = async (thisId: number): Promise<CarOptions> => {
  const id = thisId;
  const response: Response = await fetch(`${serverUrl}${path.garage}/${id}`);
  const winnerData: CarOptions = await response.json();
  console.log(winnerData);
  return winnerData;
};
