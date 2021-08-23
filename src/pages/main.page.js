const {Button} = require('../elements');
class MainPage {
    constructor() {
 this.profileMenuLink = new Button('a#dropdown-profile-details.dropdown-toggle.nav-link'); 
 this.menuItem = new Button('a.styles_profileItem__2HfjT=TEXT_TO_REPLACE');       
    }
  
 async goToSettings({menuSettings}) {

await this.profileMenuLink.click();
await this.menuItem.clickByText(menuSettings);

}

}
module.exports = { MainPage };
