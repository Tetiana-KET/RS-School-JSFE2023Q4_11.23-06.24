import { Component } from '../../components';
import classes from './LoginPage.module.css';

export class LoginPage extends Component {
  private form: Component<HTMLFormElement>;
  private firstNameInput: Component<HTMLInputElement>;
  private surnameInput: Component<HTMLInputElement>;
  private loginButton: Component<HTMLButtonElement>;
  private firstNameLabel: Component<HTMLLabelElement>;
  private surnameLabel: Component<HTMLLabelElement>;
  private firstNameTooltip: Component<HTMLSpanElement>;
  private surnameTooltip: Component<HTMLSpanElement>;
  private formTitle: Component<HTMLElement>;

  constructor() {
    super({ tagName: 'div', classNames: [classes.loginFormWrapper] });
    this.form = new Component({ tagName: 'form', classNames: [classes.loginForm] });
    this.append(this.form);

    // Create title fields
    this.formTitle = new Component<HTMLElement>({
      tagName: 'h2',
      classNames: [classes.loginFormTitle],
      text: 'login',
    });

    // create tooltips
    this.surnameTooltip = new Component<HTMLSpanElement>({
      tagName: 'span',
      classNames: [classes.inputTooltip, classes.inputTooltipSurname],
    });

    this.firstNameTooltip = new Component<HTMLSpanElement>({
      tagName: 'span',
      classNames: [classes.inputTooltip, classes.inputTooltipName],
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

    this.form.prepend(this.formTitle);
    this.form.append(this.firstNameLabel);
    this.firstNameLabel.append(this.firstNameTooltip);
    this.form.append(this.firstNameInput);
    this.form.append(this.surnameLabel);
    this.surnameLabel.append(this.surnameTooltip);
    this.form.append(this.surnameInput);
    this.form.append(this.loginButton);

    // Add event listeners to input fields
    this.firstNameInput.getNode().addEventListener('input', this.checkFormValidity.bind(this));
    this.surnameInput.getNode().addEventListener('input', this.checkFormValidity.bind(this));
  }

  private checkFormValidity(): void {
    const firstNameInput = this.firstNameInput.getNode();
    const surnameInput = this.surnameInput.getNode();
    const firstNameValue = firstNameInput.value.trim();
    const surnameValue = surnameInput.value.trim();
    const surnameTooltip = this.surnameTooltip.getNode();
    const firstNameTooltip = this.firstNameTooltip.getNode();

    if (firstNameValue) {
      if (firstNameValue[0] !== firstNameValue[0].toUpperCase()) {
        firstNameTooltip.textContent = 'First letter should be uppercase';
        firstNameTooltip.classList.add(classes.inputTooltipActive);
      }

      if (firstNameValue.slice(1) !== firstNameValue.slice(1).toLowerCase()) {
        firstNameTooltip.textContent = 'ONLY FIRST letter may be uppercase';
        firstNameTooltip.classList.add(classes.inputTooltipActive);
      }

      if (!/^[A-Za-z\-]+$/.test(firstNameValue)) {
        firstNameTooltip.textContent = 'Only English letters and "-" allowed';
        firstNameTooltip.classList.add(classes.inputTooltipActive);
      }

      setTimeout(() => {
        firstNameTooltip.classList.remove(classes.inputTooltipActive);
      }, 2000);
    }

    if (surnameValue) {
      if (surnameValue[0] !== surnameValue[0].toUpperCase()) {
        surnameTooltip.textContent = 'First letter should be uppercase';
        surnameTooltip.classList.add(classes.inputTooltipActive);
      }

      if (surnameValue.slice(1) !== surnameValue.slice(1).toLowerCase()) {
        surnameTooltip.textContent = 'ONLY FIRST letter may be uppercase';
        surnameTooltip.classList.add(classes.inputTooltipActive);
      }

      if (!/^[A-Za-z\-]+$/.test(surnameValue)) {
        surnameTooltip.textContent = 'Only English letters and "-" allowed';
        surnameTooltip.classList.add(classes.inputTooltipActive);
      }
      setTimeout(() => {
        surnameTooltip.classList.remove(classes.inputTooltipActive);
      }, 2000);
    }
    const firstNameValid =
      this.firstNameInput.getNode().value.trim() !== '' && this.firstNameInput.getNode().value.trim().length >= 3;
    const surnameValid =
      this.surnameInput.getNode().value.trim() !== '' && this.surnameInput.getNode().value.trim().length >= 4;
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
