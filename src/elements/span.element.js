const { BaseElement } = require('./base.element');

class Span extends BaseElement {
  constructor(selector, index) {
    super(selector, index);
  }

  async getValue() {
    let element;
    if (this.index) {
      element = (await $$(this.selector))[this.index];
    } else {
      element = await $(this.selector);
    }
    await this.waitForVisible(element);
    return await element.getText();
  }
}

module.exports = { Span };
