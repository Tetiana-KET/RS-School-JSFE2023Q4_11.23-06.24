import { LoginPage } from './pages';
import './normalize.css';
import './style.css';
import { StartScreen } from './pages/startScreen/StartScreen';
import { checkUserStatus } from './utils/commonUtils';

document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn: boolean = checkUserStatus();
  if (isLoggedIn) {
    // User is logged in, redirect to start
    document.body.prepend(new StartScreen().getNode());
  } else {
    // User is not logged in, redirect to login page
    document.body.prepend(new LoginPage().getNode());
  }
});
