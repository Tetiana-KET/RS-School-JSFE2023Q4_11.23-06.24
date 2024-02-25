import App from './components/app/app';
import moveSlider from './components/view/slider/slider';
import burgerHandler from './components/view/sources/burgerMenu';
import './global.css';

const app = new App();
app.start();
moveSlider();
burgerHandler();
