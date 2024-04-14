import { Component } from '../../components/Component';
import { AboutPageController } from '../../controllers/aboutPageController';

import classes from './AboutPage.module.css';

export class AboutPage extends Component<'section'> {
  private controller: AboutPageController;
  private aboutPageWrapper: Component<'div'>;
  private aboutPageTitle: Component<'h2'>;
  private aboutPageDescription: Component<'p'>;
  private aboutPageButton: Component<'button'>;
  private aboutPageDeveloper: Component<'a'>;

  constructor() {
    super('section', { className: `${classes.aboutPage}`, id: 'aboutPage' });
    this.controller = new AboutPageController();
    this.aboutPageWrapper = new Component('div', { className: `${classes.aboutPageWrapper}`, id: 'aboutPageWrapper' });
    this.aboutPageTitle = new Component('h2', { className: `${classes.aboutPageTitle}`, text: 'Welcome to Fun Chat' });
    this.aboutPageDescription = new Component('p', { className: `${classes.aboutPageDescription}` });
    this.aboutPageButton = new Component('button', { className: `${classes.aboutPageButton}`, text: 'Back', id: 'aboutPageButton' }).setAttribute(
      'type',
      'button'
    );
    this.aboutPageDeveloper = new Component('a', { className: `${classes.aboutPageDeveloper}`, id: 'loginForm' });
    this.setAboutPageDescription();
    this.setPageElements();
    this.setDeveloperProperties();
    this.appendChild(this.aboutPageWrapper);
    this.aboutPageButton.element.addEventListener('click', this.onButtonClick.bind(this));
  }

  private setAboutPageDescription(): void {
    this.aboutPageDescription.element.textContent = `An interactive chat application developed as part of the RSSchool JS/FE 2023Q4 course. 
      Fun Chat provides users with a platform to engage in real-time communication through text messages.
      Key Features:
      Real-time Messaging: Engage in real-time conversations with other users.
      User Authentication: Securely log in to access the chat platform.
      Responsive Design: Enjoy a seamless experience across various devices and screen sizes.

      Experience the joy of real-time communication and connect with friends and colleagues in Fun Chat. Start chatting now and discover a new way to stay connected!`;
  }

  private setPageElements(): void {
    this.aboutPageWrapper.appendChildren([this.aboutPageTitle, this.aboutPageDescription, this.aboutPageDeveloper, this.aboutPageButton]);
  }

  private setDeveloperProperties(): void {
    this.aboutPageDeveloper.setAttribute('href', 'https://github.com/Tetiana-KET').setAttribute('target', '_blank').setTextContent('Tetiana-KET');
  }

  private onButtonClick(): void {
    this.controller.handleButtonClick();
  }
}
