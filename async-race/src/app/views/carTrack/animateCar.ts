import { convertSecondsToHumanReadable } from '../../utils/commonUtils';

// animate car movement
export async function startCarRaceAnimation(distance: number, velocity: number, carId: number, containerLength: number): Promise<void> {
  const carElement = document.querySelector(`#car${carId} #carIconWrap${carId}`) as HTMLDivElement;

  const startTime = Date.now();
  const currDistance = 0;

  const trackLength = containerLength / 1.1;
  const speed = trackLength / (distance / velocity / 1000);

  const isEngineWork = true;

  const move = (): void => {
    const timePassed = Date.now() - startTime;
    const distanceToMove = (speed * timePassed) / 1000;
    const newPosition = Math.min(currDistance + distanceToMove, trackLength);

    carElement.style.transform = `translateX(${newPosition}px)`;

    if (newPosition < trackLength && isEngineWork) {
      requestAnimationFrame(move);
    } else if (isEngineWork) {
      const duration = convertSecondsToHumanReadable(timePassed);
      console.log(`FINISH IN: `, duration);
      // handleFinish(); // if engine is still running after reaching end of track
    }
  };

  requestAnimationFrame(move);
}
