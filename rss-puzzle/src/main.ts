import { Component, Button } from './components';
import { LoginPage } from './pages';
//// import viteLogo from '/vite.svg'

import './style.css';

const btn = new Button();
const ddd = new Component({ tagName: 'h3', text: 'Hello world' });
ddd.append(btn);

document.body.append(ddd.getNode());
document.body.append(new LoginPage().getNode());
