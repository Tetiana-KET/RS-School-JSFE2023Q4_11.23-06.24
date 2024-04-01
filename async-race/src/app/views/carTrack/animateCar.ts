import { convertSecondsToHumanReadable } from '../../utils/commonUtils';
import { disableStopBtn, enableStopBtn } from './enableStopButton';
import startSound from '../../../assets/sounds/car-engine-starting-43705.mp3';

// animate car movement
export function startCarRaceAnimation(distance: number, velocity: number, carId: number, containerLength: number): void {
  const carElement = document.querySelector(`#car${carId} #carIconWrap${carId}`) as HTMLDivElement;
  carElement.removeAttribute('returned');
  enableStopBtn(carId);
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
      requestAnimationFrame(move);
    } else if (newPosition < trackLength && carElement.getAttribute('engine') === 'burn') {
      cancelAnimationFrame(animationFrameId);
    } else if (carElement.getAttribute('engine') === 'stopped') {
      cancelAnimationFrame(animationFrameId);
      carElement.style.transform = `translateX(${0}px)`;
      disableStopBtn(carId);
    } else {
      const duration = convertSecondsToHumanReadable(timePassed);
      console.log(`FINISH IN: `, duration);
      // handleFinish(); // if engine is still running after reaching end of track
    }
  };

  animationFrameId = requestAnimationFrame(move);
}

export function playStartSound(speed: number, startTime: number): void {
  const audio = new Audio(startSound);
  audio.playbackRate = speed;
  audio.currentTime = startTime;
  audio.play();
}
