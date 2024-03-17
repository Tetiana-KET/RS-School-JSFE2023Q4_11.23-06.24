import { Component } from '../components';
import { GamePage } from '../pages/gamePage/GamePage';
import classes from '../pages/gamePage/GamePage.module.css';

// shuffle words
export function shuffleWords(wordCards: HTMLElement[]): HTMLElement[] {
  const shuffledCards = wordCards.slice();

  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }
  return shuffledCards;
}

//create Word Cards
export function createWordCards(
  sentence: string,
  resultsClass: string,
  SentencesPerRound: number,
  sentenceNumber: number,
  imageUrl: string,
  parent: Component<HTMLDivElement>
): HTMLElement[] {
  const words = sentence.split(' ');
  const wordCards: HTMLElement[] = [];

  // Calculate the dimensions and positioning for the background image
  const resultsWidth: number | 0 = document.querySelector(`.${resultsClass}`)!.clientWidth;
  const resultsHeight: number | 0 = document.querySelector(`.${resultsClass}`)!.clientHeight;
  const rowHeight = resultsHeight / SentencesPerRound;
  const startedHeight = rowHeight * sentenceNumber;
  const pxPerChar = calculateCharWidth(sentence, parent);

  let startWidth = 0;

  // Create a word card for each word in the sentence
  words.forEach((word, index) => {
    const wordLength = word.length * pxPerChar;

    const wordCard = new Component({
      tagName: 'div',
      text: word,
      attributes: { 'data-index': index.toString(), 'data-value': word },
    });

    wordCard.getNode().style.width = `${wordLength}px`;
    wordCard.getNode().style.height = `${rowHeight}px`;

    wordCard.getNode().style.backgroundImage = `url(${imageUrl})`;

    wordCard.getNode().style.backgroundSize = `${resultsWidth}px ${resultsHeight}px`;
    wordCard.getNode().style.backgroundPosition = `-${startWidth}px ${-startedHeight}px`;

    wordCards.push(wordCard.getNode());

    // Update the starting width for the next word card
    startWidth += wordLength;
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
      const currentResultLineCards = Array.from(sentenceLine.querySelectorAll('div[bg-image-disabled="true"]'));

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
              //display translation if enabled
              gamePageInstance.displayTranslation();
              gamePageInstance.translationWrap.getNode().setAttribute('data-active', 'true');
              // show backdround image

              if (wordCard.getAttribute('bg-image-disabled')) {
                wordCard.removeAttribute('bg-image-disabled');
                currentResultLineCards.forEach(card => {
                  card.removeAttribute('bg-image-disabled');
                });
              }
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
export function verifyWordOrder(resultBlock: Element): void {
  const resultBlockCards = Array.from(resultBlock.children);

  resultBlockCards.forEach((card, i) => {
    if (i !== Number(card.getAttribute('data-index'))) {
      card.classList.add(`${classes.wrongOrder}`);
    }
  });
}
