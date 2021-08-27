import { LightningElement, track } from 'lwc';

export default class Certification_Page extends LightningElement {
    // things to track button clicks and bool values
    @track clickedButtonAdmin = 'Show Admin';
    @track clickedButtonDeveloper = 'Show Developer';  
    @track boolVisibleAdmin = false;  
    @track boolVisibleDeveloper = false;
  
    // click event for admin
    handleClickAdmin(event) {  
        const label = event.target.label;  
  
        if ( label === 'Show Admin' ) {  
  
            this.clickedButtonAdmin = 'Hide Admin';  
            this.boolVisibleAdmin = true;  
  
        } else if  ( label === 'Hide Admin' ) {  
              
            this.clickedButtonAdmin = 'Show Admin';  
            this.boolVisibleAdmin = false;  
  
        }  
    }

    // click event for Developer
    handleClickDeveloper(event) {  
        const label = event.target.label;  
  
        if ( label === 'Show Developer' ) {  
  
            this.clickedButtonDeveloper = 'Hide Developer';  
            this.boolVisibleDeveloper = true;  
  
        } else if  ( label === 'Hide Developer' ) {  
              
            this.clickedButtonDeveloper = 'Show Developer';  
            this.boolVisibleDeveloper = false;  
  
        }  
    }
}