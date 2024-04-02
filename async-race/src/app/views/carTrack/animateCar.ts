import { disableStopBtn, enableStopBtn } from './CarButtonsToggler';
import startSound from '../../../assets/sounds/car-engine-starting-43705.mp3';
import { RaceParameters } from '../../interfaces/car.interface';
// STOP ENGINE
export async function stopEngine(carId: number): Promise<RaceParameters> {
  const response: Response = await fetch(`http://localhost:3000/engine?id=${carId}&status=stopped`, {
    method: 'PATCH',
  });
  const raceParameters: RaceParameters = await response.json();
  console.log(`Car with ID ${carId} was stopped`);
  disableStopBtn(carId);

  return raceParameters;
}

// animate car movement
export function startCarRaceAnimation(
  distance: number,
  velocity: number,
  carId: number,
  containerLength: number
): Promise<{ id: number; time: number }> {
  return new Promise<{ id: number; time: number }>(resolve => {
    const carElement = document.querySelector(`#car${carId} #carIconWrap${carId}`) as HTMLDivElement;
    carElement.removeAttribute('returned');
    enableStopBtn(carId);
    const resetRaceBtn = document.querySelector(`#resetRaceBtn`) as HTMLButtonElement;
    resetRaceBtn.removeAttribute('disabled');
    let animationFrameId: number;
    const startTime = Date.now();
    const currDistance = 0;
    const trackLength = containerLength / 1.11;
    const speed = trackLength / (distance / velocity / 1000);
    const move = (): void => {
      const timePassed = Date.now() - startTime;
      const distanceToMove = (speed * timePassed) / 1000;
      const newPosition = Math.min(currDistance + distanceToMove, trackLength);
      carElement.style.transform = `translateX(${newPosition}px)`;
      if (newPosition < trackLength && carElement.getAttribute('engine') === 'started') {
        animationFrameId = requestAnimationFrame(move);
      } else if (newPosition < trackLength && carElement.getAttribute('engine') === 'burn') {
        cancelAnimationFrame(animationFrameId);
      } else if (carElement.getAttribute('engine') === 'stopped') {
        cancelAnimationFrame(animationFrameId);
        carElement.style.transform = `translateX(${0}px)`;
        disableStopBtn(carId);
      } else if (newPosition === trackLength) {
        carElement.setAttribute('engine', 'onFinish');
        stopEngine(carId);
        cancelAnimationFrame(animationFrameId);
        resolve({ id: carId, time: Number((timePassed / 1000).toFixed(2)) });
      }
    };
    animationFrameId = requestAnimationFrame(move);
  });
}

export function playStartSound(speed: number, startTime: number): void {
  const audio = new Audio(startSound);
  audio.playbackRate = speed;
  audio.currentTime = startTime;
  audio.play();
}
