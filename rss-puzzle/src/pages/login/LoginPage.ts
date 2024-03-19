import { Component } from '../../components';
import { storeUserData } from '../../utils/localStorage';
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
    this.formTitle = new Component<HTMLElement>({ tagName: 'h2', classNames: [classes.loginFormTitle], text: 'login' });
    this.surnameTooltip = new Component<HTMLSpanElement>({ tagName: 'span' });
    this.firstNameTooltip = new Component<HTMLSpanElement>({ tagName: 'span' });
    this.firstNameInput = new Component<HTMLInputElement>({ tagName: 'input' });
    this.surnameInput = new Component<HTMLInputElement>({ tagName: 'input' });
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
    this.loginButton = new Component<HTMLButtonElement>({
      tagName: 'button',
      classNames: [classes.button, classes.loginBtn],
      text: 'Login',
      attributes: { type: 'submit', disabled: true },
    });
    this.setFormElements();
    this.setEventListenerToForm();
    this.setInputsProperties();
    this.setInputClass();
  }

  private setEventListenerToForm(): void {
    this.firstNameInput.getNode().addEventListener('input', this.checkFormValidity.bind(this));
    this.surnameInput.getNode().addEventListener('input', this.checkFormValidity.bind(this));
    this.form.getNode().addEventListener('submit', event => {
      event.preventDefault();
      this.handleFormSubmit();
    });
  }

  private setInputsProperties(): void {
    this.surnameTooltip.getNode().classList.add(classes.inputTooltip, classes.inputTooltipSurname);
    this.firstNameTooltip.getNode().classList.add(classes.inputTooltip, classes.inputTooltipName);

    this.firstNameInput.getNode().setAttribute('type', 'text');
    this.firstNameInput.getNode().setAttribute('required', 'true');
    this.firstNameInput.getNode().setAttribute('name', 'fname');
    this.firstNameInput.getNode().setAttribute('id', 'fname');
    this.firstNameInput.getNode().setAttribute('placeholder', 'First Name');
    this.firstNameInput.getNode().setAttribute('minlength', '3');

    this.surnameInput.getNode().setAttribute('type', 'text');
    this.surnameInput.getNode().setAttribute('required', 'true');
    this.surnameInput.getNode().setAttribute('name', 'sname');
    this.surnameInput.getNode().setAttribute('id', 'sname');
    this.surnameInput.getNode().setAttribute('placeholder', 'Surname');
    this.surnameInput.getNode().setAttribute('minlength', '4');
  }

  private setInputClass(): void {
    this.firstNameInput.getNode().classList.add(classes.loginFormInput, classes.firstNameInput);
    this.surnameInput.getNode().classList.add(classes.loginFormInput, classes.surnameInput);
  }

  private setFormElements(): void {
    this.form.prepend(this.formTitle);
    this.form.append(this.firstNameLabel);
    this.firstNameLabel.append(this.firstNameTooltip);
    this.form.append(this.firstNameInput);
    this.form.append(this.surnameLabel);
    this.surnameLabel.append(this.surnameTooltip);
    this.form.append(this.surnameInput);
    this.form.append(this.loginButton);
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

  private checkFormValidity(): void {
    const firstNameValue = this.firstNameInput.getNode().value.trim();
    const surnameValue = this.surnameInput.getNode().value.trim();

    const firstNameMinLength = parseInt(this.firstNameInput.getNode().getAttribute('minlength') || '0', 10);
    const surnameMinLength = parseInt(this.surnameInput.getNode().getAttribute('minlength') || '0', 10);

    const firstNameValid = this.checkValidity(firstNameValue, this.firstNameTooltip.getNode(), firstNameMinLength);
    const surnameValid = this.checkValidity(surnameValue, this.surnameTooltip.getNode(), surnameMinLength);

    this.loginButton.getNode().disabled = !(firstNameValid && surnameValid);
  }

  private checkValidity(value: string, tooltip: HTMLElement, minLength: number): boolean {
    if (value === '' || value.length < minLength) {
      tooltip.textContent = value === '' ? 'This field is required' : `Minimum ${minLength} characters required`;
      tooltip.classList.add(classes.inputTooltipActive);
      return false;
    }
    if (!/^[A-Za-z-]+$/.test(value)) {
      tooltip.textContent = 'Only English letters and "-" allowed';
      tooltip.classList.add(classes.inputTooltipActive);
      return false;
    }
    if (
      (value[0] === '-' && value[1] !== value[1].toUpperCase()) ||
      (value[0] !== '-' && value[0] !== value[0].toUpperCase())
    ) {
      tooltip.textContent =
        value[0] === '-' ? 'First letter after hyphen should be uppercase' : 'First letter should be uppercase';
      tooltip.classList.add(classes.inputTooltipActive);
      return false;
    }
    if (
      (value[0] === '-' && value.slice(2) !== value.slice(2).toLowerCase()) ||
      (value[0] !== '-' && value.slice(1) !== value.slice(1).toLowerCase())
    ) {
      tooltip.textContent = 'ONLY FIRST letter may be uppercase';
      tooltip.classList.add(classes.inputTooltipActive);
      return false;
    }
    tooltip.classList.remove(classes.inputTooltipActive);
    return true;
  }
}
