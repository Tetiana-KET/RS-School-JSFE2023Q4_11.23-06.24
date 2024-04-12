import { Component } from '../../components/Component';
import classes from './LoginPage.module.css';

export class LoginPage extends Component<'div'> {
  private form: Component<'form'>;
  private firstNameInput: Component<'input'>;
  private lastNameInput: Component<'input'>;
  private loginButton: Component<'button'>;
  private infoButton: Component<'button'>;
  private firstNameLabel: Component<'label'>;
  private lastNameLabel: Component<'label'>;
  private firstNameTooltip: Component<'span'>;
  private surnameTooltip: Component<'span'>;
  private formTitle: Component<'h2'>;

  constructor() {
    super('div', { className: `${classes.loginPage}`, id: 'loginPage' });
    this.form = new Component('form', { className: `${classes.loginForm}`, id: 'loginForm' });
    this.formTitle = new Component('h2', { className: `${classes.loginFormTitle}`, text: 'login', id: 'loginForm' });
    this.surnameTooltip = new Component('span');
    this.firstNameTooltip = new Component('span');
    this.firstNameInput = new Component('input', { id: 'firstName', className: classes.loginFormInput });
    this.lastNameInput = new Component('input', { id: 'lastName', className: classes.loginFormInput });
    this.firstNameLabel = new Component('label', { text: 'First Name', className: classes.loginFormLabel });
    this.lastNameLabel = new Component('label', { text: 'Last Name', className: classes.loginFormLabel });
    this.loginButton = new Component('button', { className: classes.formButton, text: 'Login', id: 'loginBtn' }).setAttribute('type', 'submit');
    this.infoButton = new Component('button', { className: classes.formButton, text: 'About', id: 'infoButton' }).setAttribute('type', 'button');

    this.setFormElements();
    this.setEventListenerToForm();
    this.setInputsProperties();
    this.appendChild(this.form);
  }

  private setEventListenerToForm(): void {
    // this.firstNameInput.element.addEventListener('input', this.checkFormValidity.bind(this));
    // this.lastNameInput.element.addEventListener('input', this.checkFormValidity.bind(this));
    this.form.element.addEventListener('submit', event => {
      event.preventDefault();
      this.handleFormSubmit();
    });
  }

  private setInputsProperties(): void {
    this.surnameTooltip.element.classList.add(classes.inputTooltip, classes.inputTooltipSurname);
    this.firstNameTooltip.element.classList.add(classes.inputTooltip, classes.inputTooltipName);

    this.firstNameInput
      .setAttribute('type', 'text')
      .setAttribute('required', 'true')
      .setAttribute('name', 'fname')
      .setAttribute('placeholder', 'First Name')
      .setAttribute('minlength', '3');

    this.lastNameInput
      .setAttribute('type', 'text')
      .setAttribute('required', 'true')
      .setAttribute('name', 'lastName')
      .setAttribute('placeholder', 'Last Name')
      .setAttribute('minlength', '3');
  }

  private setFormElements(): void {
    this.firstNameLabel.appendChild(this.firstNameTooltip);
    this.lastNameLabel.appendChild(this.surnameTooltip);
    this.form.appendChildren([
      this.formTitle,
      this.firstNameLabel,
      this.firstNameInput,
      this.lastNameLabel,
      this.lastNameInput,
      this.loginButton,
      this.infoButton,
    ]);
  }

  private handleFormSubmit(): void {
    // const firstName = this.getFirstName();
    // const surname = this.getSurname();
    // const isLoggedIn = true;
  }

  protected getFirstName(): string {
    return this.firstNameInput.element.value;
  }

  protected getSurname(): string {
    return this.lastNameInput.element.value;
  }
}
