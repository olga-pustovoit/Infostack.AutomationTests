const { AuthPage } = require('./auth.page');
const { WorkspacesPage } = require('./workspaces.page');
const { PagesPage } = require('./pages.page');
const { MainPage } = require('./main.page');
const { SettingsPage } = require('./settings.page');
const { TeamsPage } = require('./teams.page');
class App {
  constructor() {
    this.authPage = new AuthPage();
    this.workspacesPage = new WorkspacesPage();
    this.pagesPage = new PagesPage();
    this.mainPage = new MainPage();
    this.settingsPage = new SettingsPage();
    this.teamsPage = new TeamsPage();

  }
}

module.exports = { App };
