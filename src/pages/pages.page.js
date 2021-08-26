const { Button, Input, Span } = require('../elements');

class PagesPage {
    constructor() {
        this.addPage = new Button('i.bi-plus', 0);
        this.addChildPage = new Button('i.bi-plus', 1);
        this.firstPage = new Button('a.styles_navbarLinkInsideSection__2x1ZG', 0);

        this.pageTitle = new Input('input.form-control', 1);
        this.pageContent = new Input('textarea');
        // this.pageSettings = new Button('a.styles_dropdownButton__1n_oX');
        this.confirmDeleteButton = new Button('button.btn-danger');
        this.saveButton = new Button('button.btn-success');

        this.addCommentButton = new Button('button.btn-success');
        this.commentInput = new Input('textarea[placeholder="Add a comment"]');
        this.newestComment = new Span('div.styles_text__3OXVu', 0);

        this.firstDeleteCommentButton = new Button('a*=delete');

    }

    async createPage() {
        this.addPage.click();
    }

    async createChildPage() {
        this.addChildPage.click();
    }

    async chooseCreatedPage() {
        const initUrl = await browser.getUrl();
        await this.firstPage.click();

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
        const editButton = options[3];
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
        const deleteButton = options[4];
        // const editButton = await options.find(option => option.getText() === 'Edit');
        await deleteButton.waitForDisplayed({ timeout: 5000 });
        await deleteButton.click();

        this.confirmDeleteButton.click();

        await browser.waitUntil(
            async function () {
                const currentUrl = await browser.getUrl();
                return currentUrl === 'http://bsa-infostack.herokuapp.com/';
            },
            { timeout: 5000 }
        );
    }

    async changePageTitle(title, editorUrl) {
        await this.pageTitle.setValue(title);
        await this.saveButton.click();

        await browser.waitUntil(
            async function () {
                const currentUrl = await browser.getUrl();
                return currentUrl !== editorUrl;
            },
            { timeout: 5000 }
        );
    }

    async changePageContent(content, editorUrl) {
        await this.pageContent.setValue(content);
        await this.saveButton.click();

        await browser.waitUntil(
            async function () {
                const currentUrl = await browser.getUrl();
                return currentUrl !== editorUrl;
            },
            { timeout: 5000 }
        );
    }

    async addComment(comment) {
        await this.commentInput.setValue(comment);
        await this.addCommentButton.click();
    }

    async deleteFirstComment() {
        await this.firstDeleteCommentButton.click();
        await this.confirmDeleteButton.click();
    }
}


module.exports = { PagesPage };
