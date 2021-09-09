// Assignment bar component
// Created by Richard 'Jerry' Laughter
// Created on August 30, 2021
// Last Edited September 1, 2021
// Selects a voucher and certification type, due date, and assigns to selected associates where available
// utilizes the voucher assignment class
import { LightningElement, track, api, wire } from 'lwc';
import Assign from '@salesforce/apex/VoucherAssignment.Assign';
import { subscribe, MessageContext } from 'lightning/messageService';
import SELECTED_ROWS from '@salesforce/messageChannel/Selected_Rows__c';

export default class AssignmentBar extends LightningElement {

    selectionList = [];

    @track
    voucherType = null;
    @track
    certType = null;
    @track
    dueDate = null;

    @track
    result = null;

    @track
    modalResult = null;

    curMessage = null;

    strSelectionList = "";

    @track
    cohortId = "";

    potato = null;
    curlist = [];

    // message context and callback to subscribe for a selected rows message
    // message is sent from the AssociateList component on selected rows event
    @wire(MessageContext) messageContext;

    selectedRowsSubscription;

    connectedCallback(){
        this.selectedRowsSubscription = subscribe(
            this.messageContext,
            SELECTED_ROWS,
            (message) => this.assignSelectionList(message)
        )
    }

    assignSelectionList(message){
        console.log(message)
        this.selectionList = message.selectedList;
    }

    // nullifies the modalResult variable which closes the alert modal on the html page
    closeModal(){
        this.modalResult = null;
    }


    get strSelectionList(){
        return JSON.stringify(this.selectionList);
    }

    get voucherOptions(){
        return [
            {label: "Certification", value: "Certification"},
            {label: "Practice", value: "Practice"}
        ];
    }

    get certOptions(){
        return [
            {label: "ADM", value: "ADM" },
            {label: "PD1", value: "PD1" },
            {label: "Advanced ADM", value: "Advanced ADM" },
            {label: "PD2", value: "PD2"},
            {label: "Platform App Builder", value: "Platform App Builder"},
            {label: "JS Developer 1", value: "JS Developer 1"}
             
        ];
    }

    // when clicked checks if the voucherType, certType, dueDate and SelectionList are set
    // if not set, do nothing, if set call the assign method in the VoucherAssignment apex class
    // sets the result and modal result values
    // when the modal result is populated the tracked variable opens a modal in the html page giving feedback about the assignment attempt
    handleButtonClick(event){
        if(this.voucherType != null && this.certType != null && this.dueDate != null && this.selectionList != null){
            console.log("button go click");
            //this.dispatchEvent( new CustomEvent('getdemassociates', event ));
            console.log(this.selectionList);

            Assign({associateIds: this.selectionList, voucherType: this.voucherType, certType: this.certType, dueDate: this.dueDate})
            .then((result) => {
                this.result = result;
                this.modalResult = this.result;
            })
            .catch((error) => {
                console.log(error);
                console.log('Error occured: - ' + error);
            });
        }
    }

    // event handlers to set the values of the voucherType, the certType, and the dueDate
    handleVoucherSelection(event){
        this.voucherType = event.detail.value;
        console.log("voucher selected: " + this.voucherType);
    }

    handleCertSelection(event){
        this.certType = event.detail.value;
        console.log("cert selected: " + this.certType);
    }

    handleDueDateSelection(event){
        this.dueDate = event.detail.value;
        console.log("duedate selected: " + this.dueDate.toString());
    }

}
