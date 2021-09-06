import { LightningElement } from 'lwc';
import REVATURE_LOGO from '@salesforce/resourceUrl/RevatureLogo';
<<<<<<< HEAD:ExperiencePackage/lwc/experienceSiteApp/experienceSiteApp.js
=======
import WEBSITE_BACKGROUND from '@salesforce/resourceUrl/orangeBackgroundGradient';
>>>>>>> b875f2f59921b1b47c6968a586fdbfd4742a0eae:ExperiencePackage/force-app/main/default/lwc/experienceSiteApp/experienceSiteApp.js
//import ORANGE_BLUE_BACKGROUND from '@salesforce/resourceUrl/orangeBlue';

export default class ExperienceSiteApp extends LightningElement {

    revLogo = REVATURE_LOGO;
<<<<<<< HEAD:ExperiencePackage/lwc/experienceSiteApp/experienceSiteApp.js
=======
    background = WEBSITE_BACKGROUND;
>>>>>>> b875f2f59921b1b47c6968a586fdbfd4742a0eae:ExperiencePackage/force-app/main/default/lwc/experienceSiteApp/experienceSiteApp.js
   // orageBlueBackground = ORANGE_BLUE_BACKGROUND;

    home = true;
    certificationPage;
    sPage;

   // get websiteBackground() {
     //   return `height: 100%; background-image:url(${ORANGE_BLUE_BACKGROUND}); background-position: center; background-size:cover; background-repeat: no-repeat;`;
   // }

<<<<<<< HEAD:ExperiencePackage/lwc/experienceSiteApp/experienceSiteApp.js

=======
   get websiteBackground() {
       return `height: 100%; background-image:url(${WEBSITE_BACKGROUND}); background-position: center; background-size:cover; background-repeat: no-repeat;`;
    }


>>>>>>> b875f2f59921b1b47c6968a586fdbfd4742a0eae:ExperiencePackage/force-app/main/default/lwc/experienceSiteApp/experienceSiteApp.js
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