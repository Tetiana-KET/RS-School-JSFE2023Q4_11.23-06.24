import { GamePage } from '../pages/gamePage/GamePage';
import { updateLocalStorage } from './localStorage';

export function handleTranslateHint(gamePageInstance: GamePage) {
  if (gamePageInstance.translationWrap.getNode().getAttribute('data-active')) {
    gamePageInstance.translationWrap.getNode().removeAttribute('data-active');
    updateLocalStorage('userData', 'translateEnabled', false);
  } else {
    gamePageInstance.translationWrap.getNode().setAttribute('data-active', 'true');
    gamePageInstance.displayTranslation();
    updateLocalStorage('userData', 'translateEnabled', true);
  }
}
