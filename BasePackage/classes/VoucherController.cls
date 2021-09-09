// This file is depricated and should be removed
// was not removed due to being included in the base package
// not enough time to test how it's removal might effect the package

public class VoucherController {
    
	@AuraEnabled
    public static String GetEligibility(Id VoucherId){
        Voucher__c curVoucher = [SELECT Max_Date__c, Number_of_Attempts__c FROM Voucher__c WHERE Id =:VoucherId];
        return 'functional';
    }
}
