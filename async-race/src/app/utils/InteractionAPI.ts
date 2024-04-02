import { showWinnerModal } from '../components/modal/modal';
import { CarOptions, CreatedCarOptions, GarageInterface, RaceParameters, WinnerOptions, WinnersInterface } from '../interfaces/car.interface';
import { playStartSound, startCarRaceAnimation } from '../views/carTrack/animateCar';
import { disableStopBtn } from '../views/carTrack/CarButtonsToggler';
import { eventBus } from './eventBus';

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

// winners
export const getWinners = async (page: number, limit: number): GetWinnersResponse => {
  try {
    const response = await fetch(`${serverUrl}${path.winners}?_page=${page}&_limit=${limit}`);
    const winnersCount = Number(response.headers.get('X-Total-Count')) || 0;
    const winners = await response.json();

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
  return winnerData;
};

export const deleteWinner = async (thisId: number): Promise<void> => {
  const id = thisId;

  try {
    const response = await fetch(`${serverUrl}${path.winners}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      console.error('Failed to delete car. Status:', response.status);
    }
  } catch (error) {
    console.error('Error updating server state:', error);
  }
};

export const getWinner = async (id: number): Promise<WinnerOptions | null> => {
  let response;
  try {
    response = await fetch(`${serverUrl}${path.winners}/${id}`);
  } catch (error) {
    if (error instanceof Error) {
      return null;
    }
  }
  if (response?.ok) {
    const winner = await response.json();

    return winner; // id wins time
  }
  return null;
};

export const createWinner = async (newWinner: WinnerOptions): Promise<WinnerOptions> => {
  const response = await fetch(`${serverUrl}${path.winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newWinner),
  });

  const createdWinner: WinnerOptions = await response.json();
  return createdWinner; // id wins time
};

export const updateWinner = async (winner: WinnerOptions): Promise<void> => {
  const { id } = winner;
  const newData = {
    wins: winner.wins,
    time: winner.time,
  };
  let response;
  try {
    response = await fetch(`${serverUrl}${path.winners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
  } catch (error) {
    console.error('Error updating server state:', error);
    console.error(response?.status);
  }
};

export async function setWinner(winnerData: { id: number; time: number }): Promise<void> {
  const winner = await getWinner(winnerData.id);
  if (winner === null) {
    const newWinner: WinnerOptions = {
      id: winnerData.id,
      wins: 1,
      time: winnerData.time,
    };
    await createWinner(newWinner);
  } else {
    const updatedWinner: WinnerOptions = {
      id: winnerData.id,
      wins: winner.wins + 1,
      time: Math.min(winnerData.time, winner.time),
    };

    await updateWinner(updatedWinner);
  }
}

// START ENGINE
export async function startCarEngine(carId: number): Promise<RaceParameters> {
  const response: Response = await fetch(`${serverUrl}${path.engine}?id=${carId}&status=started`, {
    method: 'PATCH',
  });
  const raceParameters: RaceParameters = await response.json();
  return raceParameters;
}

// STOP ENGINE
export async function stopEngine(carId: number): Promise<RaceParameters> {
  const response: Response = await fetch(`${serverUrl}${path.engine}?id=${carId}&status=stopped`, {
    method: 'PATCH',
  });
  const raceParameters: RaceParameters = await response.json();
  console.log(`Car with ID ${carId} was stopped`);
  disableStopBtn(carId);

  return raceParameters;
}

// switch engine to DRIVE mode
export async function switchToDriveMode(carId: number): Promise<void> {
  try {
    const response = await fetch(`${serverUrl}${path.engine}?id=${carId}&status=drive`, {
      method: 'PATCH',
    });
    if (response.status === 500) {
      const carElement = document.querySelector(`#car${carId} #carIconWrap${carId}`) as HTMLDivElement;
      carElement.setAttribute('engine', 'burn');
    } else {
      document.querySelector('#startBtn')?.removeAttribute('disabled');
      console.error('Failed to switch to drive mode:', response.status);
    }
  } catch (error) {
    console.error('Error switching to drive mode:', error);
  }
}

// start car animation
export async function startCarEngineAnimation(distance: number, velocity: number, carId: number, containerLength: number): Promise<void> {
  playStartSound(1, 1);
  const carElement = document.querySelector(`#car${carId} #carIconWrap${carId}`) as HTMLDivElement;
  carElement.setAttribute('engine', 'started');
  startCarRaceAnimation(distance, velocity, carId, containerLength);
  await switchToDriveMode(carId);
}

// reset all cars
export async function resetRace(cars: Element[], callback: (input: { id: number }) => void): Promise<void> {
  try {
    await Promise.all(
      cars.map(child => {
        const currentId = Number(child.getAttribute('id')?.slice(3));
        return callback({ id: currentId });
      })
    );
  } catch (error) {
    console.error('Error resetting race:', error);
  }
}

// START RACE
export async function startRace(cars: Element[]): Promise<void> {
  try {
    const preparePromises = cars.map(async car => {
      const currentId = Number(car.getAttribute('id')?.slice(3));
      const { velocity, distance } = await startCarEngine(currentId);
      return { currentId, velocity, distance };
    });
    const carInfos = await Promise.all(preparePromises);
    const startPromises = carInfos.map(({ currentId, velocity, distance }) => {
      return new Promise<{ id: number; time: number }>(resolve => {
        playStartSound(1, 1);
        const carElement = document.querySelector(`#car${currentId} #carIconWrap${currentId}`) as HTMLDivElement;
        const trackLength = document.querySelector(`#car${currentId}`)?.clientWidth || 0;
        carElement.setAttribute('engine', 'started');
        startCarRaceAnimation(distance, velocity, currentId, trackLength).then(({ id, time }) => resolve({ id, time }));
      });
    });
    const winnerData = await Promise.race(startPromises);
    console.log('Winner:', winnerData.id);
    // Get the name of the winning car
    const { name } = await getWinnerCar(winnerData.id);
    // Send winnerId to the server
    try {
      await setWinner(winnerData);
      console.log('Winner sent to server:', winnerData.id);
      eventBus.emit('newWinnerSet', { carId: winnerData.id });
    } catch (error) {
      console.error('Error sending winner to server:', error);
    }
    // Show modal
    showWinnerModal(winnerData, name);
    const driveModePromises = cars.map(async car => {
      const currentId = Number(car.getAttribute('id')?.slice(3));
      await switchToDriveMode(currentId);
    });
    await Promise.all(driveModePromises);
  } catch (error) {
    console.error('Error starting race:', error);
  }
}
