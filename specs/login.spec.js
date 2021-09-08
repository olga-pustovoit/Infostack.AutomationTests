const { expect } = require('chai');
const { App } = require('../src/pages');
const { config } = require('../wdio.conf');

const app = new App();

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
      email: config.email,
      password: config.password
    });

    await app.commonPage.waitUrl('workspaces');

    const url = await browser.getUrl();

    expect(url).to.be.eql(`${config.baseUrl}/workspaces`);
  });
});