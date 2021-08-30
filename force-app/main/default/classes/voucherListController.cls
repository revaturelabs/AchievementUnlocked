public with sharing class voucherListController {
    
    @AuraEnabled(cacheable=true)
    public static List<Voucher__c> getVouchers(Id associateId) {
        return [SELECT Name, Certification_Type__c, Voucher_Type__c FROM Voucher__c WHERE Associate__c = :associateId];
    }
}
