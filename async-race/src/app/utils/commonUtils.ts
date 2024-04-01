export function generateRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

export function convertSecondsToHumanReadable(timePassed: number): string {
  const minutes = Math.floor(timePassed / 60000);
  const seconds = ((timePassed % 60000) / 1000).toFixed(0);
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return formattedTime;
}
