const { Button, Input, Span, Collection } = require('../elements');
const { CommonPage } = require('./common.page');
const common = new CommonPage();

class PagesPage {
    constructor() {
        this.addPage = new Button('i.bi-plus', 0);
        this.addChildPage = new Button('i.bi-plus', 1);
        this.pages = new Collection('div.text-break');
        this.firstPage = new Button('div.text-break', 0);

        this.pageSettings = new Button('i.bi-three-dots');
        this.pageSettingsMenuItem = new Button('a.dropdown-item[role="button"]=TEXT_TO_REPLACE');

        this.pageTitleInput = new Input('input.form-control', 1);
        this.pageTitle = new Span('h1.h3');

        this.pageContentInput = new Input('textarea');
        this.pageContent = new Span('//*[@id="root"]/div[1]/div[3]/div/div/div[2]/div[3]/div/div/div/div/p');

        this.confirmDeleteButton = new Button('button.btn-danger=Delete');
        this.confirmDeleteCommentButton = new Button('button.btn-danger=Yes');
        this.saveButton = new Button('button.btn-success=Save');

        this.addCommentButton = new Button('button.btn-success=Comment');
        this.commentInput = new Input('textarea[placeholder="Add a comment"]');

        this.newestComment = new Span('//*[@id="root"]/div[1]/div[3]/div/div/div[2]/div[4]/div/div/div/div[2]/div/div[1]/div[2]/div[1]');
        this.comments = new Collection('div.styles_text__3OXVu');

        this.firstDeleteCommentButton = new Button('a*=delete');
    }

    async getPagesCount() {
        const count = await this.pages.getLength();
        return count;
    }

    async getComentsCount() {
        const count = await this.comments.getLength();
        return count;
    }

    async createPage() {
        this.addPage.click();
    }

    async createChildPage() {
        this.addChildPage.click();
    }

    async waitPages(initCount) {
        await browser.waitUntil(
            async () => {
                const count = await this.getPagesCount();
                return count !== initCount;
            },
            { timeout: 5000 },
        );
    }

    async waitComments(initCount) {
        await browser.waitUntil(
            async () => {
                const count = await this.getComentsCount();
                return count !== initCount;
            },
            { timeout: 5000 },
        );
    }

    async chooseCreatedPage() {
        const initUrl = await browser.getUrl();
        await this.firstPage.click();
        await common.waitChangeUrl(initUrl);
    }

    async goToPageSettings(option) {
        await this.pageSettings.click();
        await this.pageSettingsMenuItem.clickByText(option);
    }

    async deletePage() {
        await this.goToPageSettings('Delete');
        await this.confirmDeleteButton.click();
        await common.waitUrl('');
    }

    async changePageTitle(title) {
        await this.pageTitleInput.setValue(title);
        await this.saveButton.click();
    }

    async getCurrentPageTitle() {
        const pageTitle = await this.pageTitle.getValue();
        return pageTitle;
    }

    async getCurrentPageContent() {
        const pageContent = await this.pageContent.getValue();
        return pageContent;
    }

    async changePageContent(content) {
        await this.pageContentInput.setValue(content);
        await this.saveButton.click();
    }

    async addComment(comment) {
        await this.commentInput.setValue(comment);
        await this.addCommentButton.click();
    }

    async getNewestComment() {
        const comment = await this.newestComment.getValue();
        return comment;
    }

    async deleteFirstComment() {
        await this.firstDeleteCommentButton.click();
        await this.confirmDeleteCommentButton.click();
    }
}


module.exports = { PagesPage };
