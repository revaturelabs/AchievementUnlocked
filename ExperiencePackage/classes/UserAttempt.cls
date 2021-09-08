/* UserAttempt.cls
* Created: 8/23/2021
* Last Modified: 9/7/2021
* Authors: Evan DeVizio, Nouh Anies
* Purpose: Server-side controller for retrieving 
           a list of Attempt__c and/or Voucher__c objects.
*/
public with sharing class UserAttempt { // with sharing for security settings

    @AuraEnabled(cacheable=true) // make method available in LWC
    public static List<Attempt__c> getAttempts(){
        List<Attempt__c> attemptList = new List<Attempt__c>();
        attemptList = [SELECT Id, Name, Attempt_Type__c, Voucher__r.Due_Date__c, Voucher__r.Certification_Type__c,
                       Voucher__r.Associate__r.First_Name__c,
                       textDate__c, Passed__c, Practice_Score__c, Weighted__c FROM Attempt__c
                       WHERE Voucher__r.Associate__r.User__c = :UserInfo.getUserId()];
        return attemptList;
    }
    
    @AuraEnabled(cacheable=true) // make method available in LWC
    public static List<Voucher__c> getVouchers(){
        List<Voucher__c> voucherList = new List<Voucher__c>();
        voucherList = [SELECT Id, Name, Due_Date__c, Voucher_Type__c, Voucher_Code__c,
                      Expiration_Date__c, Eligible_By__c, Certification_Type__c,
                      Associate__r.First_Name__c, (SELECT Name FROM Attempts__r) FROM Voucher__c
                      WHERE Associate__r.User__c = :UserInfo.getUserId()];
        return voucherList;
    }
}
