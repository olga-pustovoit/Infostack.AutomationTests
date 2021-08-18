 const { Button, Input } = require('../elements');

class AuthPage {
  constructor() {
    this.usernameField = new Input('input[name="fullName"]');
    this.emailField = new Input('input[name="email"]');
    this.passwordField = new Input('input[name="password"]');    
    this.submitButton = new Button('button');    
  }

  async register({ name, email, password }) {
    await this.usernameField.setValue(name);  
    await this.emailField.setValue(email);
    await this.passwordField.setValue(password);

    await this.submitButton.click();
  }

  async login({email, password}) {
    await this.emailField.setValue(email);
    await this.passwordField.setValue(password);
    
    await this.submitButton.click();
  }
}

module.exports = { AuthPage };
