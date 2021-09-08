const { config } = require('../../wdio.conf');
const { Span } = require('../elements');

class CommonPage {
  constructor() {
      this.toastMessage = new Span('div.Toastify__toast-body');
  }

  async waitUrl(partUrl) {
    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();

        return url === `${config.baseUrl}/${partUrl}`;
      },
      { timeout: 5000 },
    );
  }

  async waitFullUrl(fullUrl) {
    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();

        return url === fullUrl;
      },
      { timeout: 5000 },
    );
  }

  async waitChangeUrl(oldUrl) {
    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        
        return url !== oldUrl;
      },
      { timeout: 5000 },
    );
  }
  
  async getToastMessage() {
      const message = await this.toastMessage.getValue();
      return message;
  }
}

module.exports = { CommonPage };
