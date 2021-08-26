const { Button, Input } = require('../elements');

class TeamsPage {
  constructor() {
    this.teamNameField = new Input('input[name="name"]');
    this.addTeamButton = new Button('button.styles_createTeamButton__3WPzl');    
    this.saveTeamButton = new Button('/html/body/div[3]/div/div/div[3]/button[2]');
   
    this.elipsesMenuItem = new Button('a.styles_teamSettingsItem__29Gqa.dropdown-item=TEXT_TO_REPLACE');  
    this.ellipsesButton = new Button('i.bi.bi-three-dots', 0);
    
  }

  async addTeam({ title }) {
     
    await this.addTeamButton.click();
    await this.teamNameField.setValue(title);
    await this.saveTeamButton.click();
   
  }

    async goToMenuItem({menuOption}) {
    await this.ellipsesButton.click();
    await this.elipsesMenuItem.clickByText(menuOption);
}
     
    async editTeam({ title }) {
   // await  goToMenuItem({menuOption:'Edit'});
    await this.teamNameField.setValue(title);
    await this.saveTeamButton.click();
   
  }

   
  }

module.exports = { TeamsPage };