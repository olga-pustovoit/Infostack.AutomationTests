
const { AuthPage } = require('./auth.page');
const { WorkspacesPage } = require('./workspaces.page');
const { PagesPage } = require('./pages.page');
const { CommonPage } = require('./common.page');

class App {
  constructor() {
    this.authPage = new AuthPage();
    this.workspacesPage = new WorkspacesPage();
    this.pagesPage = new PagesPage();
    this.commonPage = new CommonPage();
  }
}

module.exports = { App };
