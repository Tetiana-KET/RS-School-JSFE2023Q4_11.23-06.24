import { convertSecondsToHumanReadable } from '../../utils/commonUtils';
import { enableStopBtn } from './enableStopButton';

// animate car movement
export function startCarRaceAnimation(distance: number, velocity: number, carId: number, containerLength: number): void {
  const carElement = document.querySelector(`#car${carId} #carIconWrap${carId}`) as HTMLDivElement;
  enableStopBtn(carId);
  let animationFrameId: number;
  const startTime = Date.now();
  const currDistance = 0;
  const trackLength = containerLength / 1.1;
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
    } else {
      const duration = convertSecondsToHumanReadable(timePassed);
      console.log(`FINISH IN: `, duration);
      // handleFinish(); // if engine is still running after reaching end of track
    }
  };

  animationFrameId = requestAnimationFrame(move);
}
