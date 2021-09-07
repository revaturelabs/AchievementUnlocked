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

    get voucherOptions(){
        return [
            {label: "Certification", value: "Certification"},
            {label: "Practice", value: "Practice"}
        ];
    }

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

    closeModal(){
        this.modalResult = null;
    }

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