trigger VoucherTrigger on Voucher__c (before insert, before update, before delete, after insert, after update, after delete, after undelete) {
    Switch on Trigger.operationType{
        when BEFORE_INSERT {
            
        } when BEFORE_UPDATE {
            
        } when BEFORE_DELETE {
            
        } when AFTER_INSERT {
            
        } when AFTER_UPDATE {
            
        } when AFTER_DELETE {
            
        } when AFTER_UNDELETE {
            
        } when else {
            //you're not suppose to be here
        }
    }
}