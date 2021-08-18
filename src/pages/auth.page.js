 const { Button, Input } = require('../elements');

class AuthPage {
  constructor() {
    // this.usernameField = new Input('input[name="name"]');
    // this.surnameField = new Input('input[name="surname"]');
    // this.genderDdl = new Button('div.selectStyles__control', 0);
    // this.ddlOption = new Button('div.selectStyles__option=TEXT_TO_REPLACE');
    // this.submitButton = new Button('button');    
  }

//   async register({ name, surname, birthDate, email, password, phone, status, gender }) {
//     await this.usernameField.setValue(name);
//     await this.surnameField.setValue(surname);
//     await this.birthDateField.setValue(birthDate);
//     await this.emailField.setValue(email);
//     await this.passwordField.setValue(password);
//     await this.retryPasswordField.setValue(password);
//     await this.phoneField.setValue(phone);

//     await this.genderDdl.click();
//     await this.ddlOption.clickByText(gender);

//     await this.statusDdl.click();
//     await this.ddlOption.clickByText(status);

//     await this.submitButton.click();
//   }

//   async login({email, password}) {
//     await this.emailField.setValue(email);
//     await this.passwordField.setValue(password);

//     await this.submitButton.click();
//   }
}

module.exports = { AuthPage };
