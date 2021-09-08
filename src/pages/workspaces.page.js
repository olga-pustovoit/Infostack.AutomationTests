const { Button, Input, Span } = require('../elements');

class WorkspacesPage {
  constructor() {
    this.addWorkspaceButton = new Button('span.bi-plus-lg');
    this.chooseButton = new Button('button.styles_createButton__1-nnl');

    this.titleField = new Input('input[name="title"]');
    this.saveButton = new Button('button.btn-success=Save');    

    this.workspaceTitle = new Span('a[aria-current="page"]');

    this.firstWorkspaceTitle = new Span('div.card-title.h5', 0);
    this.chooseFirstWorkspaceButton = new Button('button[type="button"]', 0);       
  }

  async createWorkspace({ workspaceTitle }) {
    await this.addWorkspaceButton.click();
    await this.titleField.setValue(workspaceTitle);
    await this.saveButton.click();
  }

  async chooseFirstWorkspace() {
    await this.chooseFirstWorkspaceButton.click();
  }
}

module.exports = { WorkspacesPage };
