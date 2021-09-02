import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class TestComponent extends LightningElement {

    currentAttempt;
    showmodal;

    handleClick(event) {
       this.currentAttempt =  event.target.key
       this.showModal = true;
    }
 


}