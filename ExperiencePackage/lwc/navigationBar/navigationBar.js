import { LightningElement } from 'lwc';

export default class NavigationBar extends LightningElement {

    handleNavClick(event) {

        console.log("event happening",event.target);

       // const navEvent = new CustomEvent('navclick', {
       //     detail: event.target.value
       // });
       // this.dispatchEvent(navEvent);
    }
}