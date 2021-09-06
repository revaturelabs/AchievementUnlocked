import { LightningElement } from 'lwc';
import REVATURE_LOGO from '@salesforce/resourceUrl/RevatureLogo';
//import ORANGE_BLUE_BACKGROUND from '@salesforce/resourceUrl/orangeBlue';

export default class ExperienceSiteApp extends LightningElement {

    revLogo = REVATURE_LOGO;
   // orageBlueBackground = ORANGE_BLUE_BACKGROUND;

    home = true;
    certificationPage;
    sPage;

   // get websiteBackground() {
     //   return `height: 100%; background-image:url(${ORANGE_BLUE_BACKGROUND}); background-position: center; background-size:cover; background-repeat: no-repeat;`;
   // }


    // Handling a navigation click and displaying the proper page for the clicked nav item
    handleNavClick(event) {
        switch (event.detail) {
            case "Home":
                this.home = true;
                this.certificationPage=false;
                this.sPage=false;
                break;
            case "s":
                this.home = false;
                this.certificationPage=false;
                this.sPage=true;
                break;
            case "Certifications":
                this.home = false;
                this.certificationPage = true;
                this.sPage = false;
                break;
            default:
                break;
        }
    }

}