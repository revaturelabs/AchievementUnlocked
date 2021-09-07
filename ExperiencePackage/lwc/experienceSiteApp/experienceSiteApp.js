import { LightningElement } from 'lwc';
import REVATURE_LOGO from '@salesforce/resourceUrl/revLogo';
import WEBSITE_BACKGROUND from '@salesforce/resourceUrl/orangeBackgroundGradient';

export default class ExperienceSiteApp extends LightningElement {

    revLogo = REVATURE_LOGO;
    background = WEBSITE_BACKGROUND;
   
    
    home = true;
    certificationPage;
    attemptsPage;
    
    //Setting the background gradient image as the app background for all the pages.
   get websiteBackground() {
       return `height: 100%; background-image:url(${WEBSITE_BACKGROUND}); background-position: center; background-size:cover; background-repeat: no-repeat;`;
    }


    // Handling a navigation click and displaying the proper page for the clicked nav item
    handleNavClick(event) {
        switch (event.detail) {
            case "Home":
                this.home = true;
                this.certificationPage=false;
                this.attemptsPage=false;
                break;
            case "Attempts":
                this.home = false;
                this.certificationPage=false;
                this.attemptsPage=true;
                break;
            case "Certifications":
                this.home = false;
                this.certificationPage = true;
                this.attemptsPage = false;
                break;
            default:
                break;
        }
    }

}
