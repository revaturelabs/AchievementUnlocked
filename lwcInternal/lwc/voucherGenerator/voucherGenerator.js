///////////////////////////
//
// Voucher Generator Component
//
// Created by Richard 'Jerry' Laughter
//
// Created on 9/3/2021
// Last Edited 9/4/2021
//
// Generates voucher objects using the newVouchers method in the VoucherAssignment apex class
// /////////////////////////

import { LightningElement, track } from 'lwc';
import newVouchers from '@salesforce/apex/VoucherAssignment.newVouchers';

export default class VoucherGenerator extends LightningElement {
    @track
    expDate = null;

    @track
    voucherType = null;

    @track
    voucherCodeText = '';

    @track
    result = null;

    @track
    modalResult = null;

    //voucher options for the voucher type picklist
    get voucherOptions(){
        return [
            {label: "Certification", value: "Certification"},
            {label: "Practice", value: "Practice"}
        ];
    }

    //on button click if voucherType, expDate, and voucherCodeText have all been set calls the newVouchers method
    // sets the result and modalResult variables using the return
    // modal result opens the alert modal and displays the results of the creation attempt
    handleButtonClick(event){
        if(this.voucherType != null && this.expDate != null && this.voucherCodeText != null){
            console.log("button go click");
            //this.dispatchEvent( new CustomEvent('getdemassociates', event ));

            newVouchers({voucherType: this.voucherType, expDate: this.expDate, voucherCodes: this.voucherCodeText})
            .then((result) => {
                this.result = result;
                this.modalResult = this.result;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    //nullifies the modalResult variable closing the modal
    closeModal(){
        this.modalResult = null;
    }

    //handlers for setting the voucehrType, expDate, and voucherCodeText
    handleVoucherSelection(event){
        this.voucherType = event.detail.value;
        console.log("voucher selected: " + this.voucherType);
    }

    handleExpDateSelection(event){
        this.expDate = event.detail.value;
        console.log("expdate selected: " + this.expDate.toString());
    }

    handleVoucherText(event){
        this.voucherCodeText = event.detail.value;
    }

}
