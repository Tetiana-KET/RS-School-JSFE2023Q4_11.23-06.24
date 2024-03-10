import { Component, Button } from './components';
import { LoginPage } from './pages';
//// import viteLogo from '/vite.svg'
import './normalize.css';
import './style.css';
import { StartScreen } from './pages/startScreen/StartScreen';

// const btn = new Button();
// const ddd = new Component({ tagName: 'h3', text: 'Hello world' });
// ddd.append(btn);

// document.body.append(ddd.getNode());
// создание и вставка формы на страницу
document.body.append(new StartScreen().getNode());
//document.body.append(new LoginPage().getNode());
