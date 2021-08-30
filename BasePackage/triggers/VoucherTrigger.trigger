/////////////////////////////
// 
// Simple trigger on the voucher object
// currently only runs on before update for when vouchers are assigned
//
// created on 8/26/2021
// last updated 8/26/2021
// 
// //////////////////////////////

trigger VoucherTrigger on Voucher__c (before insert, before update, before delete, after insert, after update, after delete) {
    Switch on Trigger.operationType{
        when BEFORE_INSERT{
            
        } when BEFORE_UPDATE{

        } when BEFORE_DELETE{
            
        } when AFTER_INSERT{
            
        } when AFTER_UPDATE{
            
        } when AFTER_DELETE{
            
        } when AFTER_UNDELETE{
            
        } when else{
            // you're not suppose to be here
            // no one was suppose to be here
        }
    }
}