public with sharing class ExperienceController {
  // method to grab the voucher for adm
  @AuraEnabled(cacheable=true)
  public static List<Voucher__c> getVoucherADM() {
    return [
      SELECT id, Voucher_Type__c, Voucher_Code__c, Certification_Type__c
      FROM Voucher__c
      WHERE Certification_Type__c = 'ADM'
    ];
  }
}
