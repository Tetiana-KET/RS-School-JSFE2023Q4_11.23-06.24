import { Component } from '../components';
import { GamePage } from '../pages/gamePage/GamePage';
import classes from '../pages/gamePage/GamePage.module.css';

// create word cards
export function createWordCards(sentence: string): HTMLElement[] {
  const words = sentence.split(' ');

  const wordCards: HTMLElement[] = words.map((word, index) => {
    const wordCard = document.createElement('div');
    wordCard.textContent = word;
    wordCard.setAttribute('data-index', index.toString());
    wordCard.setAttribute('data-value', word);
    return wordCard;
  });
  return wordCards;
}

//calculate Char Width
export function calculateCharWidth(sentence: string, parent: Component<HTMLDivElement>): number {
  const container = parent.getNode();
  const length = sentence.split(' ').reduce((acc: number, el: string) => {
    return acc + el.length;
  }, 0);
  return Math.floor(container.clientWidth - 2) / length;
}

//add Click Handlers To Word Cards in source block
export function clickHandlerToWordCards(
  wordCards: HTMLElement[],
  gameWrap: Component<HTMLDivElement>,
  sourceClassName: string,
  resultClassName: string,
  index: number,
  selectedClass: string,
  currentSentence: string,
  gameButtonsBlock: Component,
  gamePageInstance: GamePage
): void {
  wordCards.forEach(wordCard => {
    wordCard.addEventListener('mousedown', () => {
      wordCard.classList.add(selectedClass);
    });
    wordCard.addEventListener('mouseup', () => {
      setTimeout(() => {
        wordCard.classList.remove(selectedClass);
      }, 100);
    });

    wordCard.addEventListener('click', () => {
      let isCorrect = false;
      const continueButton = gameButtonsBlock.getNode().lastChild?.lastChild as HTMLButtonElement;
      const checkButton = gameButtonsBlock.getNode().lastChild?.firstChild as HTMLButtonElement;
      const autoCompleteButton = gameButtonsBlock.getNode().firstChild?.firstChild as HTMLButtonElement;
      const gameSourceDataBlock = document.querySelector(`.${sourceClassName}`);
      const sentenceLine = Array.from(gameWrap.getNode().querySelectorAll(`.${resultClassName}`))[index];

      if (wordCard.parentElement) {
        if (wordCard.parentElement.className === sourceClassName) {
          wordCard.remove();
          sentenceLine.append(wordCard);

          if (gameSourceDataBlock?.children.length === 0) {
            checkButton.removeAttribute('disabled');
            autoCompleteButton.setAttribute('disabled', 'disabled');

            isCorrect = verifySentenceAssembly(currentSentence, sentenceLine);
            if (isCorrect && gameButtonsBlock.getNode().lastChild !== null) {
              continueButton.removeAttribute('disabled');
              continueButton.removeAttribute('invisible');
              checkButton.setAttribute('invisible', 'true');
              console.log(`show translate`);
              //display translation if enabled
              gamePageInstance.displayTranslation();
              gamePageInstance.translationWrap.getNode().setAttribute('data-active', 'true');
            }
          }
        } else if (wordCard.parentElement.className === resultClassName) {
          wordCard.remove();
          const gameSourceDataBlock = document.querySelector(`.${sourceClassName}`);
          gameSourceDataBlock!.append(wordCard);
          wordCard.classList.remove(`${classes.wrongOrder}`);
        }
      }
      if (isCorrect === false || gameSourceDataBlock?.children.length !== 0) {
        continueButton.setAttribute('disabled', 'disabled');
        continueButton.setAttribute('invisible', 'true');
        checkButton.removeAttribute('invisible');
      }
      if ((isCorrect === true || gameSourceDataBlock?.children.length) !== 0) {
        checkButton.setAttribute('disabled', 'disabled');
        wordCards.forEach(card => {
          card.classList.remove(`${classes.wrongOrder}`);
        });
      }
    });
  });
}

//verifying the correct assembly of the current sentence.
export function verifySentenceAssembly(originalSentence: string, resultBlock: Element): boolean {
  let resultSentence;

  if (resultBlock.children) {
    resultSentence = Array.from(resultBlock.children)
      .map(card => {
        return card.getAttribute('data-value');
      })
      .join(' ');
  }

  return originalSentence === resultSentence;
}

//verify the correctness of the word order
export function verifyWordOrder(originalSentence: string, resultBlock: Element): void {
  const resultBlockCards = Array.from(resultBlock.children);
  const resultWords = Array.from(resultBlock.children).map(card => card.getAttribute('data-value'));
  const originalWords = originalSentence.split(' ');

  resultBlockCards.forEach((card, i) => {
    if (resultWords[i] !== originalWords[i]) {
      card.classList.add(`${classes.wrongOrder}`);
    }
  });
}
