import { Data } from '../interfaces/Data.interface';
import { getUserInfoFromLocalStorage } from './localStorage';

type NullLike = null | undefined;
type Nullable<T> = T | NullLike;

export function isNull<T>(value: Nullable<T>): value is NullLike {
  return value === null || value === undefined;
}

export function isNotNull<T>(value: Nullable<T>): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

// generate greeting
export function generateGreeting(): string {
  const userData = getUserInfoFromLocalStorage();
  if (userData) {
    return `Welcome, ${userData.firstName} ${userData.surname}!`;
  } else {
    return 'Welcome!';
  }
}

// check is logged in or not
export function checkUserStatus(): boolean {
  const userData = getUserInfoFromLocalStorage();

  if (userData && userData.isLoggedIn) {
    return true;
  }
  return false;
}

//fetching data
export async function fetchWordData(level: number) {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${level}.json`
    );
    const data: Data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

//fetching audio
export async function fetchAudioData(source: string, audioContext: AudioContext): Promise<AudioBuffer> {
  const audioLink = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/`;
  try {
    const context = audioContext;
    const response = await fetch(`${audioLink}${source}`);
    const data = await response.arrayBuffer();
    const arrayBuffer = await context.decodeAudioData(data);
    return arrayBuffer;
  } catch (error) {
    throw new Error();
  }
}

//fetching image
export async function fetchImageData(source: string): Promise<HTMLImageElement> {
  const imageLink = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${source}`;
  try {
    const response = await fetch(imageLink);
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    const image = new Image();
    image.src = imageUrl;
    return new Promise((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = error => reject(error);
    });
  } catch (error) {
    throw new Error();
  }
}
