const { AuthPage } = require('./auth.page');
const { WorkspacesPage } = require('./workspaces.page');
const { PagesPage } = require('./pages.page');

class App {
  constructor() {
    this.authPage = new AuthPage();
    this.workspacesPage = new WorkspacesPage();
    this.pagesPage = new PagesPage();

  }
}

module.exports = { App };
