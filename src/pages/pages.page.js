const { Button, Input } = require('../elements');

class PagesPage {
    constructor() {
        this.addPage = new Button('i.bi-plus', 0);
        this.addChildPage = new Button('i.bi-plus', 1);
        // this.pageSettings = new Button('a.styles_dropdownButton__1n_oX');
        this.deleteConfirmPageButton = new Button('button.btn-danger');
        this.saveButton = new Button('button.btn-success');
    }
sss
    async createPage() {
        this.addPage.click();
    }

    async createChildPage() {
        this.addChildPage.click();
    }

    async chooseCreatedPage() {
        const initUrl = await browser.getUrl();
        const pages = await $$('a.styles_navbarLinkInsideSection__2x1ZG');
        await pages[0].waitForDisplayed({ timeout: 5000 });
        await pages[0].click();

        await browser.waitUntil(
            async function () {
                const url = await browser.getUrl();
                return url !== initUrl;
            },
            { timeout: 5000 },
        );
    }

    async goToEdit(editorUrl) {
        const pageSettings = await $('a.styles_dropdownButton__1n_oX');
        await pageSettings.click();
        const options = await $$('a.styles_dropdownItem__QVY0D ');
        const editButton = options[2];
        // const editButton = await options.find(option => option.getText() === 'Edit');
        await editButton.waitForDisplayed({ timeout: 5000 });
        await editButton.click();

        await browser.waitUntil(
            async function () {
                const currentUrl = await browser.getUrl();
                return currentUrl === editorUrl;
            },
            { timeout: 5000 }
        );
    }

    async deletePage(editorUrl) {
        const pageSettings = await $('a.styles_dropdownButton__1n_oX');
        await pageSettings.click();
        const options = await $$('a.styles_dropdownItem__QVY0D ');
        const deleteButton = options[3];
        // const editButton = await options.find(option => option.getText() === 'Edit');
        await deleteButton.waitForDisplayed({ timeout: 5000 });
        await deleteButton.click();

        this.deleteConfirmPageButton.click();

        await browser.waitUntil(
            async function () {
                const currentUrl = await browser.getUrl();
                return currentUrl === 'http://bsa-infostack.herokuapp.com/';
            },
            { timeout: 5000 }
        );
    }

    async changePageTitle(title, editorUrl) {
        const inputs = await $$('input.form-control');
        const titleField = inputs[1];

        await titleField.waitForDisplayed({ timeout: 5000 });
        await titleField.setValue(title);

        this.saveButton.click();

        await browser.waitUntil(
            async function () {
                const currentUrl = await browser.getUrl();
                return currentUrl !== editorUrl;
            },
            { timeout: 5000 }
        );
    }
    async changePageContent(content, editorUrl) {
        const contentfield = await $('textarea');
        // const titleField = inputs[1];

        await contentfield.waitForDisplayed({ timeout: 5000 });
        await contentfield.setValue(content);

        this.saveButton.click();

        await browser.waitUntil(
            async function () {
                const currentUrl = await browser.getUrl();
                return currentUrl !== editorUrl;
            },
            { timeout: 5000 }
        );
    }
}


module.exports = { PagesPage };
