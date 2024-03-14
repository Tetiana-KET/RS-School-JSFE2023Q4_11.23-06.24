import { Component } from '../components';

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
  gameButtonsBlock: Component
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
      const continueButton = gameButtonsBlock.getNode().lastChild as HTMLButtonElement;
      const checkButton = gameButtonsBlock.getNode().firstChild as HTMLButtonElement;
      const gameSourceDataBlock = document.querySelector(`.${sourceClassName}`);
      const sentenceLine = Array.from(gameWrap.getNode().querySelectorAll(`.${resultClassName}`))[index];

      if (wordCard.parentElement) {
        if (wordCard.parentElement.className === sourceClassName) {
          wordCard.remove();

          sentenceLine.append(wordCard);

          if (gameSourceDataBlock?.children.length === 0) {
            checkButton.removeAttribute('disabled');

            isCorrect = verifySentenceAssembly(currentSentence, sentenceLine);
            if (isCorrect && gameButtonsBlock.getNode().lastChild !== null) {
              continueButton.removeAttribute('disabled');
            }
          }
        } else if (wordCard.parentElement.className === resultClassName) {
          wordCard.remove();
          const gameSourceDataBlock = document.querySelector(`.${sourceClassName}`);
          gameSourceDataBlock!.append(wordCard);
        }
      }
      if (isCorrect === false || gameSourceDataBlock?.children.length !== 0) {
        continueButton.setAttribute('disabled', 'disabled');
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
