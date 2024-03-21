import { Component } from '../components';
import { GamePage } from '../pages/gamePage/GamePage';
import classes from '../pages/gamePage/GamePage.module.css';

// shuffle words
export function shuffleWords(wordCards: HTMLElement[]): HTMLElement[] {
  const shuffledCards = wordCards.slice();

  for (let i = shuffledCards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }
  return shuffledCards;
}

// create Word Cards
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
  const resultElement = document.querySelector(`.${resultsClass}`);
  let resultsWidth: number = 0;
  let resultsHeight: number = 0;
  if (resultElement) {
    resultsWidth = resultElement.clientWidth;
    resultsHeight = resultElement.clientHeight;
  }
  const rowHeight = resultsHeight / SentencesPerRound;
  const startedHeight = rowHeight * sentenceNumber;
  const pxPerChar = calculateCharWidth(sentence, parent);
  let startWidth = 0;
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
    startWidth += wordLength;
  });
  return wordCards;
}

// calculate Char Width
export function calculateCharWidth(sentence: string, parent: Component<HTMLDivElement>): number {
  const container = parent.getNode();
  const length = sentence.split(' ').reduce((acc: number, el: string) => {
    return acc + el.length;
  }, 0);
  return Math.floor(container.clientWidth - 2) / length;
}

// add Click Handlers To Word Cards in source block
export function clickHandlerToWordCards(
  wordCards: HTMLElement[],
  gameWrap: Component<HTMLDivElement>,
  sourceClassName: string,
  resultClassName: string,
  index: number,
  selectedClass: string,
  gameButtonsBlock: Component,
  gamePageInstance: GamePage
): void {
  wordCards.forEach(wordCard => {
    handleMouseEventOnCard(wordCard, selectedClass);
    handleClickOnCard(wordCard, wordCards, gameWrap, sourceClassName, resultClassName, index, gameButtonsBlock, gamePageInstance);
  });
}

export function handleClickOnCard(
  wordCard: HTMLElement,
  wordCards: HTMLElement[],
  gameWrap: Component<HTMLDivElement>,
  sourceClassName: string,
  resultClassName: string,
  index: number,
  gameButtonsBlock: Component,
  gamePageInstance: GamePage
): void {
  wordCard.addEventListener('click', () => {
    let isCorrect = false;
    const continueButton = gameButtonsBlock.getNode().lastChild?.lastChild as HTMLButtonElement;
    const checkButton = gameButtonsBlock.getNode().lastChild?.firstChild as HTMLButtonElement;
    const autoCompleteButton = gameButtonsBlock.getNode().firstChild?.firstChild as HTMLButtonElement;
    const gameSourceDataBlock = document.querySelector(`.${sourceClassName}`);
    const sentenceLine = Array.from(gameWrap.getNode().querySelectorAll(`.${resultClassName}`))[index];
    const currentResultLineCards = Array.from(sentenceLine.querySelectorAll('div[bg-image-disabled="true"]'));
    if (wordCard.parentElement && wordCard.parentElement.className === sourceClassName) {
      wordCard.remove();
      sentenceLine.append(wordCard);
      if (gameSourceDataBlock?.children.length === 0) {
        checkButton.removeAttribute('disabled');
        autoCompleteButton.setAttribute('disabled', 'disabled');
        isCorrect = verifySentenceAssembly(sentenceLine);
        if (isCorrect && gameButtonsBlock.getNode().lastChild !== null) {
          handleCorrectAssemble(gamePageInstance, continueButton, checkButton, wordCard, currentResultLineCards, index);
          sentenceLine.setAttribute('disabled', 'true');
        }
      }
    } else if (wordCard.parentElement && wordCard.parentElement.className === resultClassName) {
      wordCard.remove();
      if (gameSourceDataBlock) {
        gameSourceDataBlock.append(wordCard);
      }
      wordCard.classList.remove(`${classes.wrongOrder}`);
    }
    toggleButtonState(isCorrect, gameSourceDataBlock, continueButton, checkButton, wordCards);
  });
}

export function handleCorrectAssemble(
  gamePageInstance: GamePage,
  continueButton: HTMLButtonElement,
  checkButton: HTMLButtonElement,
  wordCard: HTMLElement,
  currentResultLineCards: Element[],
  index: number
): void {
  gamePageInstance.correctlyAssembledSentences += 1;
  if (gamePageInstance.correctlyAssembledSentences === gamePageInstance.sentencesForRound.length) {
    gamePageInstance.revealImage();
  }
  continueButtonEnable(continueButton, checkButton);
  gamePageInstance.displayTranslation();
  gamePageInstance.translationWrap.getNode().setAttribute('data-active', 'true');
  showBackground(wordCard, currentResultLineCards);
  currentResultLineCards.forEach(card => card.setAttribute('disabled', 'true'));
  gamePageInstance.guessedSentences.push(index);
}

export function handleResultCardClick(): void {}

export function showBackground(wordCard: HTMLElement, currentResultLineCards: Element[]): void {
  if (wordCard.getAttribute('bg-image-disabled')) {
    wordCard.removeAttribute('bg-image-disabled');
    currentResultLineCards.forEach(card => {
      card.removeAttribute('bg-image-disabled');
    });
  }
}

export function handleMouseEventOnCard(wordCard: HTMLElement, selectedClass: string): void {
  wordCard.addEventListener('mousedown', () => {
    wordCard.classList.add(selectedClass);
  });
  wordCard.addEventListener('mouseup', () => {
    setTimeout(() => {
      wordCard.classList.remove(selectedClass);
    }, 100);
  });
}

export function toggleButtonState(
  isCorrect: boolean,
  gameSourceDataBlock: Element | null,
  continueButton: HTMLButtonElement,
  checkButton: HTMLButtonElement,
  wordCards: HTMLElement[]
): void {
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
}

export function continueButtonEnable(continueButton: HTMLButtonElement, checkButton: HTMLButtonElement): void {
  continueButton.removeAttribute('disabled');
  continueButton.removeAttribute('invisible');
  checkButton.setAttribute('invisible', 'true');
}

// verifying the correct assembly of the current sentence.
export function verifySentenceAssembly(resultBlock: Element): boolean {
  let result = false;
  let resultSentence;

  if (resultBlock.children) {
    resultSentence = Array.from(resultBlock.children).map(card => {
      return Number(card.getAttribute('data-index'));
    });
  }
  if (resultSentence) {
    result = resultSentence.every((item, index) => {
      return item === index;
    });
  }
  return result;
}

// verify the correctness of the word order
export function verifyWordOrder(resultBlock: Element): void {
  const resultBlockCards = Array.from(resultBlock.children);

  resultBlockCards.forEach((card, i) => {
    if (i !== Number(card.getAttribute('data-index'))) {
      card.classList.add(`${classes.wrongOrder}`);
    }
  });
}
