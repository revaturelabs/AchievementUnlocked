import { LightningElement } from 'lwc';
import REV_LOGO from '@salesforce/resourceUrl/revLogo';

export default class NavigationBar extends LightningElement {

    revLogo = REV_LOGO;

    handleNavClick(event) {
        const navEvent = new CustomEvent('navclick', {
            detail: event.target.innerHTML
       });
        this.dispatchEvent(navEvent);
    }
}