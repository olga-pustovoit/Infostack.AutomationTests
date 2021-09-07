const { Button, Input, BaseElement } = require('../elements');

class AuthPage {
  constructor() {
    this.usernameField = new Input('input[name="fullName"]');
    this.emailField = new Input('input[name="email"]');
    this.passwordField = new Input('input[name="password"]');
    // this.submitLoginButton = new Button('button=Sign in');
    this.submitLoginButton = new Button('button[type="submit"]');
    this.submitRegistrationButton = new Button('button=Sign up');
  }

  async register({ name, email, password }) {
    await this.usernameField.setValue(name);
    await this.emailField.setValue(email);
    await this.passwordField.setValue(password);

    await this.submitRegistrationButton.click();
  }

  async login({ email, password }) {
    await this.emailField.setValue(email);
    await this.passwordField.setValue(password); 

    await this.submitLoginButton.click();
  }
}

module.exports = { AuthPage };
