const { expect } = require('chai');
const { App } = require('../src/pages');
const { config } = require('../wdio.conf');

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

    await app.commonPage.waitUrl('workspaces');

    const url = await browser.getUrl();
    expect(url).to.be.eql(`${config.baseUrl}/workspaces`);
  });
});