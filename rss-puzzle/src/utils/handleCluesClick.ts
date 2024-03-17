import { Component } from '../components';
import { GamePage } from '../pages/gamePage/GamePage';
import { checkLocalStoragePropertyFlag, updateLocalStorage } from './localStorage';

export function handleTranslateHint(gamePageInstance: GamePage, button: HTMLElement) {
  const isTranslateEnabled = checkLocalStoragePropertyFlag('userData', 'translateEnabled');
  console.log(button);
  console.log('isTranslateEnabled', isTranslateEnabled);
  if (isTranslateEnabled) {
    gamePageInstance.translationWrap.getNode().removeAttribute('data-active');
    button.removeAttribute('active-hint');
    updateLocalStorage('userData', 'translateEnabled', false);
  } else {
    gamePageInstance.translationWrap.getNode().setAttribute('data-active', 'true');
    button.setAttribute('active-hint', 'true');
    gamePageInstance.displayTranslation();
    updateLocalStorage('userData', 'translateEnabled', true);

    gamePageInstance.translationWrap.getNode().setAttribute('data-active', 'true');
    gamePageInstance.header.getNode().querySelector('#translateHint')!.setAttribute('active-hint', 'true');
  }
}

export function handleBgImageHint(gamePageInstance: GamePage, button: HTMLElement) {
  const isBgImageHintEnabled = gamePageInstance.isBgImageHintEnabled;

  if (!isBgImageHintEnabled) {
    gamePageInstance.header.getNode().querySelector('#bgImageHint')!.setAttribute('data-active', 'true');
    button.setAttribute('active-hint', 'true');
    updateLocalStorage('userData', 'bgImageHintEnabled', true);
  } else {
    gamePageInstance.header.getNode().querySelector('#bgImageHint')!.removeAttribute('disabled');
    updateLocalStorage('userData', 'bgImageHintEnabled', false);
  }
}

export function handlePronounceHint(
  gamePageInstance: GamePage,
  button: HTMLElement,
  playSoundButton: Component<HTMLButtonElement>
) {
  const isPronounceEnabled = checkLocalStoragePropertyFlag('userData', 'pronounceEnabled');

  console.log(button);
  console.log('isPronounceEnabled', isPronounceEnabled);

  if (!gamePageInstance.header.getNode().querySelector('#playSoundButton')!.getAttribute('disabled')) {
    gamePageInstance.header.getNode().querySelector('#playSoundButton')!.removeAttribute('disabled');
    updateLocalStorage('userData', 'pronounceEnabled', true);
  } else {
    gamePageInstance.header.getNode().querySelector('#playSoundButton')!.setAttribute('disabled', 'true');
    updateLocalStorage('userData', 'pronounceEnabled', false);
  }

  if (button.getAttribute('active-hint')) {
    button.removeAttribute('active-hint');
    playSoundButton.setAttribute('disabled', 'true');
  } else {
    button.setAttribute('active-hint', 'true');
    playSoundButton.removeAttribute('disabled');
  }
}
