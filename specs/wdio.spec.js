const { expect } = require('chai');
const { App } = require('../src/pages');

const rundomNumber = () => Date.now();

const app = new App();

describe('Registration:', function () {
  beforeEach(async function () {
    await browser.setWindowSize(1440, 960);
    await browser.url('/signup');
  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  it('should be able to register new user', async function () {
    await app.authPage.register({
      name: `John${rundomNumber()}`,
      email: `marcus${rundomNumber()}@gmail.com`,
      password: 'Pa55word'
    });

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://bsa-infostack.herokuapp.com/workspaces';
      },
      { timeout: 5000 },
    );

    const url = await browser.getUrl();
    expect(url).to.be.eql('http://bsa-infostack.herokuapp.com/workspaces');
  });
});

describe('Login', function () {
  beforeEach(async function () {
    await browser.setWindowSize(1440, 960);
    await browser.url('/login');
  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  it('should by valid', async function () {
    await app.authPage.login({
      email: `john_admin1@admin.com`,
      password: 'Pa55word'
    });

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://bsa-infostack.herokuapp.com/workspaces';
      },
      { timeout: 5000 },
    );

    const url = await browser.getUrl();

    expect(url).to.be.eql('http://bsa-infostack.herokuapp.com/workspaces');
  });
});

describe('Workspaces', function () {
  beforeEach(async function () {
    await browser.setWindowSize(1440, 960);
    await browser.url('/login');

    await app.authPage.login({
      email: `john_admin1@admin.com`,
      password: 'Pa55word'
    });

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://bsa-infostack.herokuapp.com/workspaces';
      },
      { timeout: 5000 },
    );
  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  it('should create new workspace', async function () {
    const workspaceTitle = `New workspace ${rundomNumber()}`;

    await app.workspacesPage.createWorkspace({
      workspaceTitle: workspaceTitle
    });

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://bsa-infostack.herokuapp.com/';
      },
      { timeout: 5000 },
    );

    const activeWorkspace = await $('h1');
    await activeWorkspace.waitForDisplayed({ timeout: 5000 });
    const activeWorkspaceTitle = await activeWorkspace.getText();

    expect(activeWorkspaceTitle).to.be.eql(workspaceTitle);
  });

  it('should choose created workspace', async function () {
    const oldestWorkspaceTitle = `New workspace 1629327649520`;

    await app.workspacesPage.chooseOldestWorkspace();

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://bsa-infostack.herokuapp.com/';
      },
      { timeout: 5000 },
    );

    const activeWorkspace = await $('h1');
    await activeWorkspace.waitForDisplayed({ timeout: 5000 });
    const activeWorkspaceTitle = await activeWorkspace.getText();

    expect(activeWorkspaceTitle).to.be.eql(oldestWorkspaceTitle);
  });
});

