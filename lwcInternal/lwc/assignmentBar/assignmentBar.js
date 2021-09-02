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

    @wire(MessageContext) messageContext;

    selectedRowsSubscription;

    connectedCallback(){
        this.selectedRowsSubscription = subscribe(
            this.messageContext,
            SELECTED_ROWS,
            (message) => this.assignSelectionList(message)
        )
    }

    closeModal(){
        this.modalResult = null;
    }

    assignSelectionList(message){
        console.log(message)
        this.selectionList = message.selectedList;
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

    handleButtonClick(event){
        if(this.voucherType != null && this.certType != null && this.dueDate != null && this.selectionList != null){
            console.log("button go click");
            //this.dispatchEvent( new CustomEvent('getdemassociates', event ));
            console.log(this.selectionList);

            this.curList = [];
            this.selectionList.forEach((element) => this.curList.push(element.Id));
            console.log(this.selectionList);
            console.log(this.voucherType);
            console.log(this.certType);
            console.log(this.dueDate);

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

    callAssign(event){
        console.log("this works");
        let curList = [];
        this.selectionList.array.forEach(element => {
            console.log(element);
            curList.push(element.id);
        });
        Assign(curList, this.voucherType, this.certType, this.dueDate);
        this.selectionList = null;
    }

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