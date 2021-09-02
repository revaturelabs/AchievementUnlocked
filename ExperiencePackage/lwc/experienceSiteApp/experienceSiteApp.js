import { LightningElement } from 'lwc';
import REVATURE_LOGO from '@salesforce/resourceUrl/RevatureLogo';
//import ORANGE_BLUE_BACKGROUND from '@salesforce/resourceUrl/orangeBlue';

export default class ExperienceSiteApp extends LightningElement {

    revLogo = REVATURE_LOGO;
   // orageBlueBackground = ORANGE_BLUE_BACKGROUND;

    home = true;
    certificationPage;
    attemptsPage;

   // get websiteBackground() {
     //   return `height: 100%; background-image:url(${ORANGE_BLUE_BACKGROUND}); background-position: center; background-size:cover; background-repeat: no-repeat;`;
   // }


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