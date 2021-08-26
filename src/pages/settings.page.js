const { Button, Input } = require('../elements');

class SettingsPage {
  constructor() {
    this.usernameField = new Input('input[name="fullName"]');
    this.titleField = new Input('input[name="title"]');
    this.skillsField = new Input('input#react-select-2-input');    
    this.createSkillButton = new Button('div.css-1n7v3ny-option');    
    this.saveChangesButton = new Button('button.styles_cardButton__lp96G');   
    this.menuItem = new Button('a.styles_menuItem__OjlJj=TEXT_TO_REPLACE');  
  
  }

  async update({ name, title, skill }) {
    await this.usernameField.setValue(name);  
    await this.titleField.setValue(title);
    await this.skillsField.setValue(skill);
    await this.createSkillButton.click();
    await this.saveChangesButton.click();
  }

    async goToItem({menuOption}) {

        await this.menuItem.clickByText(menuOption);
    
    }
    


  }

module.exports = { SettingsPage };
