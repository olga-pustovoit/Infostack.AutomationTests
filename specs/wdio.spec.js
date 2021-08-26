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

describe('Pages', function () {
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

    await app.workspacesPage.chooseOldestWorkspace();

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://bsa-infostack.herokuapp.com/';
      },
      { timeout: 5000 },
    );

  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  it('should create new page', async function () {
    const pages = await $$('div.text-break');

    let pagesCount = pages.length;

    await app.pagesPage.createPage();

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url !== 'http://bsa-infostack.herokuapp.com/';
      },
      { timeout: 5000 },
    );

    const newPages = await $$('div.text-break');

    const newPagesCount = newPages.length;

    expect(newPagesCount).to.be.eql(++pagesCount);
  });

  it('should create new child page', async function () {
    const pages = await $$('div.text-break');

    let pagesCount = pages.length;

    await app.pagesPage.createChildPage();

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url !== 'http://bsa-infostack.herokuapp.com/';
      },
      { timeout: 5000 },
    );

    const newPages = await $$('div.text-break');

    const newPagesCount = newPages.length;

    expect(newPagesCount).to.be.eql(++pagesCount);
  });

  it('should change page title', async function () {
    await app.pagesPage.chooseCreatedPage();

    const url = await browser.getUrl();
    const editorUrl = url + '/editor';

    await app.pagesPage.goToEdit(editorUrl);

    const newTitle = `New Name ${rundomNumber()}`;

    await app.pagesPage.changePageTitle(newTitle, editorUrl);

    const pageTitle = await $('h1.h3');
    await pageTitle.waitForDisplayed({ timeout: 5000 });
    const pageTitleValue = await pageTitle.getText();

    expect(pageTitleValue).to.be.eql(newTitle);
  });

  it('should change page content', async function () {
    await app.pagesPage.chooseCreatedPage();

    const url = await browser.getUrl();
    const editorUrl = url + '/editor';

    await app.pagesPage.goToEdit(editorUrl);

    const newContent = `New Content ${rundomNumber()}`;

    await app.pagesPage.changePageContent(newContent, editorUrl);

    const pageContent = await $('div.styles_content__3x4VI');
    await pageContent.waitForDisplayed({ timeout: 5000 });
    const pageContentValue = await pageContent.getText();

    expect(pageContentValue).to.be.eql(newContent);
  });

  it('should delete page', async function () {
    await app.pagesPage.chooseCreatedPage();

    const url = await browser.getUrl();

    await app.pagesPage.deletePage();

    const toastMessageArea = await $('div.Toastify__toast-body');
    await toastMessageArea.waitForDisplayed({ timeout: 5000 });
    const message = await toastMessageArea.getText();

    expect(message).to.be.eql('Page has been deleted successfully.');
  });

  it('should create comment', async function () {
    const commentText = 'Test create comment'
    await app.pagesPage.chooseCreatedPage();
    await app.pagesPage.addComment(commentText);

    const newestComment = await app.pagesPage.newestComment.getValue();

    expect(commentText).to.be.eql(newestComment);
  });

  it('should delete last comment', async function () {
    await app.pagesPage.chooseCreatedPage();

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url !== 'http://bsa-infostack.herokuapp.com/';
      },
      { timeout: 5000 },
    );

    await browser.waitUntil(
      async function () {
        const comments = await $$('div.styles_text__3OXVu');
        const counts = await comments.length;
        return counts > 0;
      },
      { timeout: 5000 },
    );

    const comments = await $$('div.styles_text__3OXVu');

    const initCommentCount = comments.length;

    await app.pagesPage.deleteFirstComment();

    const newComments = await $$('div.styles_text__3OXVu');
    const newCommentCount = newComments.length;

    expect(newCommentCount).to.be.eql(initCommentCount);
  });

});


