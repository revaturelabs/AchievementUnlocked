public class VoucherController {
    
	@AuraEnabled
    public static String GetEligibility(Id VoucherId){
        Voucher__c curVoucher = [SELECT Max_Date__c, Number_of_Attempts__c FROM Voucher__c WHERE Id =:VoucherId];
        return 'dinglehopper';
    }
}