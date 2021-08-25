const { Button, Input } = require('../elements');

class WorkspacesPage {
  constructor() {
    this.addButton = new Button('button.styles_createButton__1-nnl');
    this.chooseButton = new Button('button.styles_createButton__1-nnl');

    this.titleField = new Input('input[name="title"]');
    this.saveButton = new Button('button.btn-success');
       
  }

  async createWorkspace({ workspaceTitle }) {
    await this.addButton.click();
    await this.titleField.setValue(workspaceTitle);
    await this.saveButton.click();
  }

  async chooseOldestWorkspace() {
    const workspaceButtons = await $$('button');    
    await workspaceButtons[0].waitForDisplayed({ timeout: 5000 });;
    await workspaceButtons[0].click();
  }
}

module.exports = { WorkspacesPage };
