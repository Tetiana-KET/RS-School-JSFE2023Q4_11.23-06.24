import { GamePage } from '../pages/gamePage/GamePage';

export function handleTranslateHint(gamePageInstance: GamePage) {
  const translation =
    gamePageInstance.fetchedWordData?.rounds[gamePageInstance.currentRound].words[gamePageInstance.currentSentenceIndex]
      .textExampleTranslate;

  gamePageInstance.translationWrap.setTextContent(`${translation}`);
  console.log(gamePageInstance.translationWrap);

  if (gamePageInstance.translationWrap.getNode().getAttribute('data-active')) {
    gamePageInstance.translationWrap.getNode().removeAttribute('data-active');
  } else {
    gamePageInstance.translationWrap.getNode().setAttribute('data-active', 'true');
  }
}
