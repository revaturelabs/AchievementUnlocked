public with sharing class ExperienceController {
  // ADM
  // grab the voucher for adm
  @AuraEnabled(cacheable=true)
  public static List<Voucher__c> getVoucherAdm() {
    return [
      SELECT
        id,
        Voucher_Type__c,
        Voucher_Code__c,
        Certification_Type__c,
        Associate__r.User__c
      FROM Voucher__c
      WHERE
        Certification_Type__c = 'ADM'
        AND Associate__r.User__c = :UserInfo.getUserId()
    ];
  }
  // grab the past attempts for adm
  @AuraEnabled(cacheable=true)
  public static List<Attempt__c> getPracticeAttemptsAdm() {
    return [
      SELECT
        Id,
        Attempt_Type__c,
        Passed__c,
        Practice_Score__c,
        Voucher__c,
        Voucher__r.Associate__r.User__c,
        Voucher__r.Certification_Type__c
      FROM Attempt__c
      WHERE
        Voucher__r.Certification_Type__c = 'ADM'
        AND Voucher__r.Associate__r.User__c = :UserInfo.getUserId()
    ];
  }
  // grab cert status and attempt due date for adm
  @AuraEnabled(cacheable=true)
  public static List<Voucher__c> getCertStatusAdm() {
    return [
      SELECT
        Id,
        Certified__c,
        Due_Date__c,
        Associate__r.User__c,
        Voucher_Type__c,
        Certification_Type__c
      FROM Voucher__c
      WHERE
        Associate__r.User__c = :UserInfo.getUserId()
        AND Voucher_Type__c != 'Practice'
        AND Certification_Type__c = 'Advanced ADM'
    ];
  }

  // Advanced Adm
  //grab voucher for advanced adm
  // grab the voucher for adm
  @AuraEnabled(cacheable=true)
  public static List<Voucher__c> getVoucherAdvancedAdm() {
    return [
      SELECT
        id,
        Voucher_Type__c,
        Voucher_Code__c,
        Certification_Type__c,
        Associate__r.User__c
      FROM Voucher__c
      WHERE
        Certification_Type__c = 'Advanced ADM'
        AND Associate__r.User__c = :UserInfo.getUserId()
    ];
  }
  // grab the past attempts for Advanced adm
  @AuraEnabled(cacheable=true)
  public static List<Attempt__c> getPracticeAttemptsAdvancedAdm() {
    return [
      SELECT
        Id,
        Attempt_Type__c,
        Passed__c,
        Practice_Score__c,
        Voucher__c,
        Voucher__r.Associate__r.User__c,
        Voucher__r.Certification_Type__c
      FROM Attempt__c
      WHERE
        Voucher__r.Certification_Type__c = 'Advanced ADM'
        AND Voucher__r.Associate__r.User__c = :UserInfo.getUserId()
    ];
  }
  // grab cert status and attempt due date for adv adm
  @AuraEnabled(cacheable=true)
  public static List<Voucher__c> getCertStatusAdvancedAdm() {
    return [
      SELECT
        Id,
        Certified__c,
        Due_Date__c,
        Associate__r.User__c,
        Voucher_Type__c,
        Certification_Type__c
      FROM Voucher__c
      WHERE
        Associate__r.User__c = :UserInfo.getUserId()
        AND Voucher_Type__c != 'Practice'
        AND Certification_Type__c = 'Advanced ADM'
    ];
  }

  // JavaScript
  // grab the voucher for javascript
  @AuraEnabled(cacheable=true)
  public static List<Voucher__c> getVoucherJavascr() {
    return [
      SELECT
        id,
        Voucher_Type__c,
        Voucher_Code__c,
        Certification_Type__c,
        Associate__r.User__c
      FROM Voucher__c
      WHERE
        Certification_Type__c = 'JS Developer 1'
        AND Associate__r.User__c = :UserInfo.getUserId()
    ];
  }
  // grab the past attempts for javascript
  @AuraEnabled(cacheable=true)
  public static List<Attempt__c> getPracticeAttemptsJavascr() {
    return [
      SELECT
        Id,
        Attempt_Type__c,
        Passed__c,
        Practice_Score__c,
        Voucher__c,
        Voucher__r.Associate__r.User__c,
        Voucher__r.Certification_Type__c
      FROM Attempt__c
      WHERE
        Voucher__r.Certification_Type__c = 'JS Developer 1'
        AND Voucher__r.Associate__r.User__c = :UserInfo.getUserId()
    ];
  }
  // grab cert status and attempt due date for javascript
  @AuraEnabled(cacheable=true)
  public static List<Voucher__c> getCertStatusJavascr() {
    return [
      SELECT
        Id,
        Certified__c,
        Due_Date__c,
        Associate__r.User__c,
        Voucher_Type__c,
        Certification_Type__c
      FROM Voucher__c
      WHERE
        Associate__r.User__c = :UserInfo.getUserId()
        AND Voucher_Type__c != 'Practice'
        AND Certification_Type__c = 'JS Developer 1'
    ];
  }

  // Pd1
  // grab the voucher for Pd1
  @AuraEnabled(cacheable=true)
  public static List<Voucher__c> getVoucherPd1() {
    return [
      SELECT
        id,
        Voucher_Type__c,
        Voucher_Code__c,
        Certification_Type__c,
        Associate__r.User__c
      FROM Voucher__c
      WHERE
        Certification_Type__c = 'PD1'
        AND Associate__r.User__c = :UserInfo.getUserId()
    ];
  }
  // grab the past attempts for Pd1
  @AuraEnabled(cacheable=true)
  public static List<Attempt__c> getPracticeAttemptsPd1() {
    return [
      SELECT
        Id,
        Attempt_Type__c,
        Passed__c,
        Practice_Score__c,
        Voucher__c,
        Voucher__r.Associate__r.User__c,
        Voucher__r.Certification_Type__c
      FROM Attempt__c
      WHERE
        Voucher__r.Certification_Type__c = 'PD1'
        AND Voucher__r.Associate__r.User__c = :UserInfo.getUserId()
    ];
  }
  // grab cert status and attempt due date for Pd1
  @AuraEnabled(cacheable=true)
  public static List<Voucher__c> getCertStatusPd1() {
    return [
      SELECT
        Id,
        Certified__c,
        Due_Date__c,
        Associate__r.User__c,
        Voucher_Type__c,
        Certification_Type__c
      FROM Voucher__c
      WHERE
        Associate__r.User__c = :UserInfo.getUserId()
        AND Voucher_Type__c != 'Practice'
        AND Certification_Type__c = 'PD1'
    ];
  }

  // Pd2
  // grab the voucher for Pd2
  @AuraEnabled(cacheable=true)
  public static List<Voucher__c> getVoucherPd2() {
    return [
      SELECT
        id,
        Voucher_Type__c,
        Voucher_Code__c,
        Certification_Type__c,
        Associate__r.User__c
      FROM Voucher__c
      WHERE
        Certification_Type__c = 'PD2'
        AND Associate__r.User__c = :UserInfo.getUserId()
    ];
  }
  // grab the past attempts for Pd2
  @AuraEnabled(cacheable=true)
  public static List<Attempt__c> getPracticeAttemptsPd2() {
    return [
      SELECT
        Id,
        Attempt_Type__c,
        Passed__c,
        Practice_Score__c,
        Voucher__c,
        Voucher__r.Associate__r.User__c,
        Voucher__r.Certification_Type__c
      FROM Attempt__c
      WHERE
        Voucher__r.Certification_Type__c = 'PD2'
        AND Voucher__r.Associate__r.User__c = :UserInfo.getUserId()
    ];
  }
  // grab cert status and attempt due date for Pd2
  @AuraEnabled(cacheable=true)
  public static List<Voucher__c> getCertStatusPd2() {
    return [
      SELECT
        Id,
        Certified__c,
        Due_Date__c,
        Associate__r.User__c,
        Voucher_Type__c,
        Certification_Type__c
      FROM Voucher__c
      WHERE
        Associate__r.User__c = :UserInfo.getUserId()
        AND Voucher_Type__c != 'Practice'
        AND Certification_Type__c = 'PD2'
    ];
  }
  
  // Pab
  // grab the voucher for Pab
  @AuraEnabled(cacheable=true)
  public static List<Voucher__c> getVoucherPab() {
    return [
      SELECT
        id,
        Voucher_Type__c,
        Voucher_Code__c,
        Certification_Type__c,
        Associate__r.User__c
      FROM Voucher__c
      WHERE
        Certification_Type__c = 'Platform App Builder'
        AND Associate__r.User__c = :UserInfo.getUserId()
    ];
  }
  // grab the past attempts for Pab
  @AuraEnabled(cacheable=true)
  public static List<Attempt__c> getPracticeAttemptsPab() {
    return [
      SELECT
        Id,
        Attempt_Type__c,
        Passed__c,
        Practice_Score__c,
        Voucher__c,
        Voucher__r.Associate__r.User__c,
        Voucher__r.Certification_Type__c
      FROM Attempt__c
      WHERE
        Voucher__r.Certification_Type__c = 'Platform App Builder'
        AND Voucher__r.Associate__r.User__c = :UserInfo.getUserId()
    ];
  }
  // grab cert status and attempt due date for Pab
  @AuraEnabled(cacheable=true)
  public static List<Voucher__c> getCertStatusPab() {
    return [
      SELECT
        Id,
        Certified__c,
        Due_Date__c,
        Associate__r.User__c,
        Voucher_Type__c,
        Certification_Type__c
      FROM Voucher__c
      WHERE
        Associate__r.User__c = :UserInfo.getUserId()
        AND Voucher_Type__c != 'Practice'
        AND Certification_Type__c = 'Platform App Builder'
    ];
  }
}
