const { AuthPage } = require('./auth.page');
const { WorkspacesPage } = require('./workspaces.page');

class App {
  constructor() {
    this.authPage = new AuthPage();
    this.workspacesPage = new WorkspacesPage();

  }
}

module.exports = { App };
