const { BaseElement } = require('./base.element');

class Collection extends BaseElement {
  constructor(selector, index) {
    super(selector, index);
  }

  async getLength() {
    const elements = await $$(this.selector);
    const count = await elements.length;

    return count;
  }
}

module.exports = { Collection };
