import { Component } from '../../components';
import { storeUserData } from '../../utils/commonUtils';
import { StartScreen } from '../startScreen/StartScreen';
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
    // Add event listener for form submission
    this.form.getNode().addEventListener('submit', event => {
      event.preventDefault();
      this.handleFormSubmit();
    });
  }

  private checkValidity(value: string, tooltip: HTMLElement, minLength: number): boolean {
    if (value === '') {
      tooltip.textContent = 'This field is required';
      tooltip.classList.add(classes.inputTooltipActive);
      return false;
    }

    if (value.length < minLength) {
      tooltip.textContent = `Minimum ${minLength} characters required`;
      tooltip.classList.add(classes.inputTooltipActive);
      return false;
    }

    if (!/^[A-Za-z\-]+$/.test(value)) {
      tooltip.textContent = 'Only English letters and "-" allowed';
      tooltip.classList.add(classes.inputTooltipActive);
      return false;
    }

    if (value[0] === '-') {
      if (value[1] !== value[1].toUpperCase()) {
        tooltip.textContent = 'First letter after hyphen should be uppercase';
        tooltip.classList.add(classes.inputTooltipActive);
        return false;
      }

      if (value.slice(2) !== value.slice(2).toLowerCase()) {
        tooltip.textContent = 'ONLY FIRST letter may be uppercase';
        tooltip.classList.add(classes.inputTooltipActive);
        return false;
      }
    } else {
      if (value[0] !== value[0].toUpperCase()) {
        tooltip.textContent = 'First letter should be uppercase';
        tooltip.classList.add(classes.inputTooltipActive);
        return false;
      }

      if (value.slice(1) !== value.slice(1).toLowerCase()) {
        tooltip.textContent = 'ONLY FIRST letter may be uppercase';
        tooltip.classList.add(classes.inputTooltipActive);
        return false;
      }
    }

    tooltip.classList.remove(classes.inputTooltipActive);
    return true;
  }

  private checkFormValidity(): void {
    const firstNameValue = this.firstNameInput.getNode().value.trim();
    const surnameValue = this.surnameInput.getNode().value.trim();

    const firstNameMinLength = parseInt(this.firstNameInput.getNode().getAttribute('minlength') || '0');
    const surnameMinLength = parseInt(this.surnameInput.getNode().getAttribute('minlength') || '0');

    const firstNameValid = this.checkValidity(firstNameValue, this.firstNameTooltip.getNode(), firstNameMinLength);
    const surnameValid = this.checkValidity(surnameValue, this.surnameTooltip.getNode(), surnameMinLength);

    this.loginButton.getNode().disabled = !(firstNameValid && surnameValid);
  }

  private handleFormSubmit(): void {
    const firstName = this.getFirstName();
    const surname = this.getSurname();
    const isLoggedIn = true;
    storeUserData(firstName, surname, isLoggedIn);
    this.destroy();
    document.body.prepend(new StartScreen().getNode());
  }

  protected getFirstName(): string {
    return this.firstNameInput.getNode().value;
  }

  protected getSurname(): string {
    return this.surnameInput.getNode().value;
  }

  protected setFirstName(value: string): void {
    this.firstNameInput.getNode().value = value;
  }

  protected setSurname(value: string): void {
    this.surnameInput.getNode().value = value;
  }
}
