import { LoginPage } from './pages';
import './normalize.css';
import './style.css';
import { StartScreen } from './pages/startScreen/StartScreen';
import { checkUserStatus } from './utils/commonUtils';
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
