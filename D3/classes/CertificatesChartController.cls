// Author: Zackary Frazier
// Last Modify Date: 9/7/2021
// Description: Apex controller for the certificatesChart LWC

public with sharing class CertificatesChartController {
  // @desc : retrieve all associates who have earned at least one certificate
  @AuraEnabled(cacheable=true)
  public static Integer associatesWithCerts() {
    List<AggregateResult> results = [
      SELECT COUNT_DISTINCT(Voucher__r.Associate__c)
      FROM Attempt__c
      WHERE Passed__c = TRUE AND Attempt_Type__c = 'Certification'
    ];
    Integer certifiedAssociates = (Integer) results[0].get('expr0');
    return certifiedAssociates;
  }

  // @desc : retrieve number of associates who have not earned any certification
  @AuraEnabled(cacheable=true)
  public static Integer associatesWithoutCerts() {
    Integer numberOfAssociates = [SELECT COUNT() FROM Associate__c];
    Integer associatesWithoutCerts = numberOfAssociates - associatesWithCerts();
    return associatesWithoutCerts;
  }

  // @desc : retrieve all associates who have earned a specific certificate
  @AuraEnabled(cacheable=true)
  public static Integer associatesWithSpecificCert(String certType) {
    List<AggregateResult> results = [
      SELECT COUNT_DISTINCT(Voucher__r.Associate__c)
      FROM Attempt__c
      WHERE
        Passed__c = TRUE
        AND Attempt_Type__c = 'Certification'
        AND Voucher__r.Certification_Type__c = :certType
    ];
    Integer certifiedAssociates = (Integer) results[0].get('expr0');
    return certifiedAssociates;
  }

  // @desc : retrieve number of associates who have not earned a specific certification
  @AuraEnabled(cacheable=true)
  public static Integer associatesWithoutSpecificCert(String certType) {
    Integer numberOfAssociates = [SELECT COUNT() FROM Associate__c];
    Integer associatesWithoutCerts =
      numberOfAssociates - associatesWithSpecificCert(certType);
    return associatesWithoutCerts;
  }

  // @desc : retrieve all associates within a cohort who have earned at least one certificate
  @AuraEnabled(cacheable=true)
  public static Integer associatesInCohortWithCerts(String cohortName) {
    List<AggregateResult> results = [
      SELECT COUNT_DISTINCT(Voucher__r.Associate__c)
      FROM Attempt__c
      WHERE
        Passed__c = TRUE
        AND Attempt_Type__c = 'Certification'
        AND Voucher__r.Associate__r.Cohort__r.Name = :cohortName
    ];
    Integer certifiedAssociates = (Integer) results[0].get('expr0');
    return certifiedAssociates;
  }

  // @desc : retrieve number of associates in a cohort who have not earned any certification
  @AuraEnabled(cacheable=true)
  public static Integer associatesInCohortWithoutCerts(String cohortName) {
    Integer numberOfAssociates = [
      SELECT COUNT()
      FROM Associate__c
      WHERE Cohort__r.Name = :cohortName
    ];
    Integer associatesWithoutCerts =
      numberOfAssociates - associatesInCohortWithCerts(cohortName);
    return associatesWithoutCerts;
  }

  // @desc : retrieve the number of associates in a cohort who have earned a specific cert
  @AuraEnabled(cacheable=true)
  public static Integer associatesInCohortWithSpecificCert(
    String cohortName,
    String certType
  ) {
    List<AggregateResult> results = [
      SELECT COUNT_DISTINCT(Voucher__r.Associate__c)
      FROM Attempt__c
      WHERE
        Passed__c = TRUE
        AND Voucher__r.Certification_Type__c = :certType
        AND Voucher__r.Associate__r.Cohort__r.Name = :cohortName
    ];
    Integer certifiedAssociates = (Integer) results[0].get('expr0');
    return certifiedAssociates;
  }

  // @desc : retrieve the number of associates within a cohort who have not earned a specific cert
  @AuraEnabled(cacheable=true)
  public static Integer associatesInCohortWithoutSpecificCert(
    String cohortName,
    String certType
  ) {
    Integer numberOfAssociates = [
      SELECT COUNT()
      FROM Associate__c
      WHERE Cohort__r.Name = :cohortName
    ];
    Integer associatesWithoutCerts =
      numberOfAssociates -
      associatesInCohortWithSpecificCert(cohortName, certType);
    return associatesWithoutCerts;
  }

  // @desc : retrieve a list of all possible certificate types
  @AuraEnabled(cacheable=true)
  public static List<String> getCertTypes() {
    Schema.DescribeFieldResult fieldResult = Voucher__c.Certification_Type__c.getDescribe();
    List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
    List<String> picklistLabels = new List<String>();
    for (Schema.PicklistEntry entry : ple) {
      picklistLabels.add(entry.getLabel());
    }
    return picklistLabels;
  }

  // @desc : retrieve all cohort Name values
  @AuraEnabled(cacheable=true)
  public static List<String> getCohortNames() {
    List<String> cohortNames = new List<String>();
    for (Cohort__c cohort : [SELECT Name FROM Cohort__c]) {
      cohortNames.add(cohort.Name);
    }
    return cohortNames;
  }

  // @desc : given cohort id, retrieve cohort name
  @AuraEnabled(cacheable=true)
  public static String getCohortName(String id) {
    Cohort__c cohort = [SELECT Name FROM Cohort__c WHERE Id=:id];
    return cohort.Name;
  }

}
