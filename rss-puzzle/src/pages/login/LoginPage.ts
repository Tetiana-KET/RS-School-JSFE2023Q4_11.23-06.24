import { Component } from '../../components';
import classes from './LoginPage.module.css';

export class LoginPage extends Component {
  private firstNameInput: Component<HTMLInputElement>;
  private surnameInput: Component<HTMLInputElement>;
  private loginButton: Component<HTMLButtonElement>;
  private firstNameLabel: Component<HTMLLabelElement>;
  private surnameLabel: Component<HTMLLabelElement>;
  private formTitle: Component<HTMLElement>;

  constructor() {
    super({ tagName: 'div', classNames: [classes.loginFormWrapper] });
    const form = new Component({ tagName: 'form', classNames: [classes.loginForm] });
    this.append(form);

    // Create title fields
    this.formTitle = new Component<HTMLElement>({
      tagName: 'h2',
      classNames: [classes.loginFormTitle],
      text: 'login',
    });

    // Create input fields
    this.firstNameInput = new Component<HTMLInputElement>({
      tagName: 'input',
      classNames: [classes.loginFormInput, classes.firstNameInput],
      attributes: {
        type: 'text',
        placeholder: 'First Name',
        required: true,
        name: 'fname',
        id: 'fname',
        minlength: '3',
        pattern: '^[A-Z][a-z]{2,}(-[A-Z][a-z]{2,})?$',
      },
    });

    this.surnameInput = new Component<HTMLInputElement>({
      tagName: 'input',
      classNames: [classes.loginFormInput, classes.surnameInput],
      attributes: {
        type: 'text',
        placeholder: 'Surname',
        required: true,
        name: 'sname',
        id: 'sname',
        minlength: '4',
        pattern: '^[A-Z][a-z]{3,}(-[A-Z][a-z]{3,})?$',
      },
    });

    // Create label for fields
    this.firstNameLabel = new Component<HTMLLabelElement>({
      tagName: 'label',
      text: 'First Name',
      classNames: [classes.loginFormLabel, classes.firstNameLabel],
      attributes: { for: 'fname' },
    });

    this.surnameLabel = new Component<HTMLLabelElement>({
      tagName: 'label',
      text: 'Last Name',
      classNames: [classes.loginFormLabel, classes.surnameLabel],
      attributes: { for: 'sname' },
    });

    // Create login button
    this.loginButton = new Component<HTMLButtonElement>({
      tagName: 'button',
      classNames: [classes.button, classes.loginBtn],
      text: 'Login',
      attributes: { type: 'submit', disabled: true },
    });

    form.prepend(this.formTitle);
    form.append(this.firstNameLabel);
    form.append(this.firstNameInput);
    form.append(this.surnameLabel);
    form.append(this.surnameInput);
    form.append(this.loginButton);

    // Add event listeners to input fields
    this.firstNameInput.getNode().addEventListener('input', this.checkFormValidity.bind(this));
    this.surnameInput.getNode().addEventListener('input', this.checkFormValidity.bind(this));
  }

  private checkFormValidity(): void {
    const firstNameValid =
      this.firstNameInput.getNode().value.trim() !== '' && this.firstNameInput.getNode().value.trim().length >= 3;
    const surnameValid =
      this.surnameInput.getNode().value.trim() !== '' && this.surnameInput.getNode().value.trim().length >= 4;
    // Enable login button if both input fields are valid
    this.loginButton.getNode().disabled = !(firstNameValid && surnameValid);
  }

  public getFirstName(): string {
    return this.firstNameInput.getNode().value;
  }

  public getSurname(): string {
    return this.surnameInput.getNode().value;
  }

  public setFirstName(value: string): void {
    this.firstNameInput.getNode().value = value;
  }

  public setSurname(value: string): void {
    this.surnameInput.getNode().value = value;
  }
}
