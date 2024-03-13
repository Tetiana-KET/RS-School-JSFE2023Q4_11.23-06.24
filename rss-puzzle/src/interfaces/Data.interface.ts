// Type for an individual word in a round
interface Word {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

// Type for the level data within a round
interface LevelData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

// Type for an individual round
interface Round {
  levelData: LevelData;
  words: Word[];
}

// Type for the data containing multiple rounds
export interface Data {
  rounds: Round[];
  roundsCount: number;
}
