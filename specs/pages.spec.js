const { expect } = require('chai');
const { App } = require('../src/pages');
const { config } = require('../wdio.conf');

const rundomNumber = () => Date.now();

const app = new App();

describe('Pages:', function () {
  beforeEach(async function () {
    await browser.setWindowSize(1440, 960);
    await browser.url('/login');

    await app.authPage.login({
      email: config.email,
      password: config.password
    });

    await app.commonPage.waitUrl('workspaces');
    await app.workspacesPage.chooseFirstWorkspace();
    await app.commonPage.waitUrl('');
  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  it('should create new page', async function () {
    await app.pagesPage.waitPages(0);
    let initPagesCount = await app.pagesPage.getPagesCount();

    await app.pagesPage.createPage();
    await app.pagesPage.waitPages(initPagesCount);
    const pagesCount = await app.pagesPage.getPagesCount();    

    expect(pagesCount).to.be.eql(++initPagesCount);
  });

  it('should create new child page', async function () {
    await app.pagesPage.waitPages(0);
    let initPagesCount = await app.pagesPage.getPagesCount();

    await app.pagesPage.createChildPage();
    await app.pagesPage.waitPages(initPagesCount);
    const pagesCount = await app.pagesPage.getPagesCount();

    expect(pagesCount).to.be.eql(++initPagesCount);
  });

  it('should change page title', async function () {
    await app.pagesPage.chooseCreatedPage();

    const url = await browser.getUrl();
    const editUrl = url + '/editor';
    await app.pagesPage.goToPageSettings('Edit');
    await app.commonPage.waitFullUrl(editUrl);

    const newTitle = `New Name ${rundomNumber()}`;
    await app.pagesPage.changePageTitle(newTitle);
    await app.commonPage.waitChangeUrl(editUrl);
    
    const pageTitleValue = await app.pagesPage.getCurrentPageTitle();

    expect(pageTitleValue).to.be.eql(newTitle);
  });

  it('should change page content', async function () {
    await app.pagesPage.chooseCreatedPage();

    const url = await browser.getUrl();
    const editUrl = url + '/editor';

    await app.pagesPage.goToPageSettings('Edit');
    await app.commonPage.waitFullUrl(editUrl);    

    const newContent = `New Content ${rundomNumber()}`;
    await app.pagesPage.changePageContent(newContent);
    await app.commonPage.waitChangeUrl(editUrl);
    
    const pageContentValue = await app.pagesPage.getCurrentPageContent();

    expect(pageContentValue).to.be.eql(newContent);
  });

  it('should delete page', async function () {
    await app.pagesPage.chooseCreatedPage();    
    await app.pagesPage.deletePage();    
    const message = await app.commonPage.getToastMessage();

    expect(message).to.be.eql('Page has been deleted successfully.');
  });

  it('should create comment', async function () {
    const commentText = 'Test create comment';
    await app.pagesPage.chooseCreatedPage();
    await app.pagesPage.addComment(commentText);
    const newestComment = await app.pagesPage.getNewestComment();

    expect(commentText).to.be.eql(newestComment);
  });

  it('should delete last comment', async function () {
    await app.pagesPage.chooseCreatedPage();
    await app.pagesPage.waitComments(0);
    let initCommentsCount = await app.pagesPage.getComentsCount();
    await app.pagesPage.deleteFirstComment();

    await app.pagesPage.waitComments(initCommentsCount);    
    const newCommentsCount = await app.pagesPage.getComentsCount();

    expect(newCommentsCount).to.be.eql(--initCommentsCount);
  });
});


