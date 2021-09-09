/////////////////////////////////
//
// Voucher Trigger Handler
// 
// methods:
//     OnVoucherAssignment: when an unused voucher is assigned a new user the status is changed to delivered
//     						an email is generated using the name, voucher type, code, due date, and cert type
//     						then the email is sent to the associate using their email address informing them of the assignment
//     						
// created on: 8/26/2021
// last edited: 8/26/2021
//
// This file is depricated and should be removed
// was not removed due to being included in the base package
// not enough time to test how it's removal might effect the package
// 
/////////////////////////////////

public class VoucherTriggerHandler {
    public static String messageFormat = 'To {0} {1},\nHere is your {2} {3} Voucher\nYou have until {4} to make your first attempt\nVoucher Code:{5}';
    public static void OnVoucherAssignment(List<Voucher__c> voucherList){
		List<Id> associateIds = new List<Id>();
        List<Voucher__c> changedVouchers = new List<Voucher__c>();
        for (Voucher__c curVoucher: voucherList){
            if (curVoucher.Status__c == 'Unused' && curVoucher.Associate__c != null ){
                changedVouchers.add(curVoucher);
                associateIds.add(curVoucher.Associate__c);
            }
        }
        List<Associate__c> associateList = [SELECT Id, Email__c, First_Name__c, Last_Name__c, NickName__c FROM Associate__c WHERE Id IN :associateIds];
        
        for (Associate__c curAssociate: associateList){
            for (Voucher__c curVoucher: voucherList){
                if (curVoucher.Status__c == 'Unused' && curVoucher.Associate__c == curAssociate.Id ){
                    curVoucher.Status__c = 'Delivered';
                    List<String> args = new List<String>{curAssociate.First_Name__c, curAssociate.Last_Name__c, curVoucher.Certification_Type__c, curVoucher.Voucher_Type__c, String.valueOf(curVoucher.Due_Date__c), curVoucher.Voucher_Code__c };
                    String newMessage = String.format(messageFormat,  args );
                    
                    EmailManager.sendMail(curAssociate.Email__c , 'New Voucher Assignment' , newMessage);
                    
                }
            }
        }
        
    }
}
