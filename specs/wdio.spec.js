const { expect } = require('chai');
const { App } = require('../src/pages');

const rundomNumber = () => Date.now();

const app = new App();

xdescribe('Registration:', function () {
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

xdescribe('Login', function () {
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

xdescribe('Workspaces', function () {
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

  xit('should create new page', async function () {
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

  xit('should change page title', async function () {
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

});

/////////////////////////////PROFİLE MENU////////////////////////////////////////////

describe('Should be able to access Settings page:', function () {
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
  xit('should be able to use dropdown menu', async function () {
   
    await app.mainPage.goToSettings({menuSettings:'Settings'}); 

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://bsa-infostack.herokuapp.com/settings/profile';
      },
      { timeout: 5000 },
    );

    const url = await browser.getUrl();
    expect(url).to.be.eql('http://bsa-infostack.herokuapp.com/settings/profile');
  });
});
////////////////////////////////////update profile info SETTİNGS PAGE////////////////////////////////////////


describe('Should be able to update profile at Settings page:', function () {
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
  xit('should be able to use dropdown menu', async function () {
   
    await app.mainPage.goToSettings({menuSettings:'Settings'}); 

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://bsa-infostack.herokuapp.com/settings/profile';
      },
      { timeout: 5000 },
    );
    const newSkill = `Dev${rundomNumber()}`;

    await app.settingsPage.update({
      name: `John${rundomNumber()}`,
      title: `marcus${rundomNumber()}`,
      skill: newSkill
    });
    const skill = await $('div*=Dev');
    await skill.waitForDisplayed({ timeout: 5000 });
    const skillValue = await skill.getText();

    expect(skillValue).to.be.eql(newSkill);

    
  });


  });
///////////////////////////////////teams///////////////////////////////////////////////////////

  describe('Should be able to use Teams page:', function () {
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

      await app.mainPage.goToSettings({menuSettings:'Settings'}); 

      await browser.waitUntil(
        async function () {
          const url = await browser.getUrl();
          return url === 'http://bsa-infostack.herokuapp.com/settings/profile';
        },
        { timeout: 5000 },
      );
  
    });
     
    afterEach(async function () {
      await browser.reloadSession();
    });
    it('should be able to use dropdown menu', async function () {
     
      await app.settingsPage.goToItem({menuOption:'Teams'});

      await browser.waitUntil(
        async function () {
          const url = await browser.getUrl();
          return url === 'http://bsa-infostack.herokuapp.com/settings/teams';
        },
        { timeout: 5000 },
      );
      const teamName = `t${rundomNumber()}`; 
      await app.teamsPage.addTeam({ title: teamName});

      await app.teamsPage.goToMenuItem({menuOption:'Edit'});

      await app.teamsPage.editTeam({ title: teamName }); 

      await app.teamsPage.goToMenuItem({menuOption:'Delete'});

     // function reload(){
      //setTimeout(function(){
      //location.reload();},5000);}
      //reload();
      
      const teams = await $$('div.card-title.h5');

      const lastTeam =await teams[teams.length - 1];

      const lastTeamTitle = await lastTeam.getText();

      expect(lastTeamTitle).to.be.eql(teamName);
   
      });
  
      
    });
  
  
  


