import './normalize.css';
import './style.css';
import { checkUserStatus } from './utils/commonUtils';
import { LoginPage } from './pages';
import { StartScreen } from './pages/startScreen/StartScreen';
import { GamePage } from './pages/gamePage/GamePage';

document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn: boolean = checkUserStatus();
  const isPlayingStr: string | null = localStorage.getItem('isPlaying'); // Retrieve the stored value as a string
  const isPlaying: boolean = isPlayingStr ? JSON.parse(isPlayingStr) : false; // Parse the stored value or default to false if it doesn't exist
  if (isLoggedIn && isPlaying) {
    // User is logged in and playing
    document.body.prepend(new GamePage().getNode());
  } else if (isLoggedIn) {
    // User is logged in but not playing
    document.body.prepend(new StartScreen().getNode());
  } else {
    // User is not logged in
    document.body.prepend(new LoginPage().getNode());
  }
});
console.log(`Still in process! Do not be in a hurry, please 🙏
**Score: CrossCheck Criteria:  165 / 245 points**
  - [x] User Name Entry Page Evaluation Criteria (Total Points: 20) 📋👤
  - [x] Access and Session Management Evaluation Criteria (Total Points: 10) 🔐🔄
  - [x] Start Screen Evaluation Criteria (Total Points: 15) 🌐🎮
  - [x] Basic Game Functionality Evaluation Criteria (Total Points: 50 / 80) 🎮🧩
      - [ ] Drag-and-Drop Functionality (15 points) 🖱️(15 points) 
      - [ ] Puzzle-Like Word Card Design (15 points) 🧩🃏
- [x] Hint Functionality Evaluation Criteria (Total Points: 60) 💡🌐
- [Х] Completion and Revelation of Background Image Evaluation Criteria (Total Points: 10) 🎨🖼️

**not implemented yet**
- [ ] Level and Round Selection Evaluation Criteria (Total Points: 25) 🎚️🔄
- [ ] Statistics Page Evaluation Criteria (Total Points: 25) 📊🔍
`);
