const { expect } = require('chai');
const { App } = require('../src/pages');
const { config } = require('../wdio.conf');

const rundomNumber = () => Date.now();

const app = new App();

describe('Workspaces', function () {
  beforeEach(async function () {
    await browser.setWindowSize(1440, 960);
    await browser.url('/login');

    await app.authPage.login({
      email: config.email,
      password: config.password
    });

    await app.commonPage.waitUrl('workspaces');
  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  it('should create new workspace', async function () {
    const workspaceTitle = `New workspace ${rundomNumber()}`;

    await app.workspacesPage.createWorkspace({
      workspaceTitle: workspaceTitle
    });

    await app.commonPage.waitUrl('');
    
    const activeWorkspaceTitle = await app.workspacesPage.workspaceTitle.getValue();

    expect(activeWorkspaceTitle).to.be.eql(workspaceTitle);
  });

  it('should choose created workspace', async function () {
    const firstWorkspaceTitle = await app.workspacesPage.firstWorkspaceTitle.getValue();

    await app.workspacesPage.chooseFirstWorkspace();
    await app.commonPage.waitUrl('');

    const activeWorkspaceTitle = await app.workspacesPage.workspaceTitle.getValue();

    expect(activeWorkspaceTitle).to.be.eql(firstWorkspaceTitle);
  });
});