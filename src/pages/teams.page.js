const { Button, Input } = require('../elements');

class TeamsPage {
  constructor() {
    this.teamNameField = new Input('input[name="name"]');
    this.addTeamButton = new Button('button.styles_createTeamButton__3WPzl');
    this.saveTeamButton = new Button('button.btn-success', 1);

    this.elipsesMenuItem = new Button('a.styles_teamSettingsItem__29Gqa.dropdown-item=TEXT_TO_REPLACE');
    this.elipsesMenuEditItem = new Button('a.styles_teamSettingsItem__29Gqa.dropdown-item', 0);
    this.elipsesMenuDeleteItem = new Button('a.styles_teamSettingsItem__29Gqa.dropdown-item', 2);
    this.ellipsesButton = new Button('a.styles_dropdownButton__zYdji', 0);
    this.confirmDeleteButton = new Button('button.btn-danger');
  }

  async addTeam({ title }) {

    await this.addTeamButton.click();
    await this.teamNameField.setValue(title);
    await this.saveTeamButton.click();
  }

  async goToEditItem() {    
    await this.ellipsesButton.click(); 
    await this.elipsesMenuEditItem.click();    
  }

  async goToDeleteItem() {    
    await this.ellipsesButton.click();
    await this.elipsesMenuDeleteItem.click();
  }

  async goToMenuItem({ menuOption }) {    
    await this.ellipsesButton.click();    
    await this.elipsesMenuItem.clickByText(menuOption); 
  }

  async editTeam({ title }) {
    await this.teamNameField.setValue(title);
    await this.saveTeamButton.click();
  }
}

module.exports = { TeamsPage };