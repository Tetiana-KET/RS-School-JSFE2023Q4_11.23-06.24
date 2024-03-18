import { Component } from '../components';
import { GamePage } from '../pages/gamePage/GamePage';
import { checkLocalStoragePropertyFlag, updateLocalStorage } from './localStorage';

export function handleTranslateHint(gamePageInstance: GamePage, button: HTMLElement) {
  const isTranslateEnabled = checkLocalStoragePropertyFlag('userData', 'translateEnabled');
  if (isTranslateEnabled) {
    gamePageInstance.translationWrap.getNode().removeAttribute('data-active');
    button.removeAttribute('active-hint');
    updateLocalStorage('userData', 'translateEnabled', false);
  } else {
    gamePageInstance.translationWrap.getNode().setAttribute('data-active', 'true');
    button.setAttribute('active-hint', 'true');
    gamePageInstance.displayTranslation();
    updateLocalStorage('userData', 'translateEnabled', true);
  }
}
export function handlePronounceHint(button: HTMLElement, playSoundButton: Component<HTMLButtonElement>) {
  const isPronounceEnabled = checkLocalStoragePropertyFlag('userData', 'pronounceEnabled');
  if (isPronounceEnabled) {
    playSoundButton.setAttribute('disabled', 'true');
    button.removeAttribute('active-hint');
    updateLocalStorage('userData', 'pronounceEnabled', false);
  } else {
    playSoundButton.removeAttribute('disabled');
    button.setAttribute('active-hint', 'true');
    updateLocalStorage('userData', 'pronounceEnabled', true);
  }
}

export function handleBgImageHint(gamePageInstance: GamePage, button: HTMLElement) {
  const isBgImageHintEnabled = checkLocalStoragePropertyFlag('userData', 'bgImageHintEnabled');

  if (isBgImageHintEnabled) {
    gamePageInstance.header.getNode().querySelector('#bgImageHint')!.removeAttribute('data-active');
    gamePageInstance.gameWrap.getNode().setAttribute('bg-image-disabled', 'true');
    button.removeAttribute('active-hint');
    Array.from(gamePageInstance.gameSourceDataBlock.getNode().children).forEach(child => {
      child.setAttribute('bg-image-disabled', 'true');
    });
    updateLocalStorage('userData', 'bgImageHintEnabled', false);
  } else {
    button.setAttribute('active-hint', 'true');
    gamePageInstance.header.getNode().querySelector('#bgImageHint')!.setAttribute('data-active', 'true');
    gamePageInstance.gameWrap.getNode().removeAttribute('bg-image-disabled');
    Array.from(gamePageInstance.gameSourceDataBlock.getNode().children).forEach(child => {
      child.removeAttribute('bg-image-disabled');
    });
    updateLocalStorage('userData', 'bgImageHintEnabled', true);
  }
}
