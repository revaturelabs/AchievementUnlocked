// Author: Zackary Frazier
// Last Modify Date: 9/7/2021
// Description: test class for CertificatesChartController

@isTest
public class TestCertificatesChartController {
	@testSetup
    public static void setup() {
		List<Cohort__c> cohorts = new List<Cohort__c>();
        for(Integer i = 0; i < 10; i++) {
            cohorts.add(new Cohort__c());
        }        
        insert cohorts;
        
        List<Associate__c> associates = new List<Associate__c>();
        for(Integer i  =0; i < 10; i++) {
            associates.add(new Associate__c(
            	Cohort__c = cohorts[0].Id
            ));
        }
        insert associates;
        
        List<Voucher__c> vouchers = new List<Voucher__c>();
        for(Integer i = 0; i < 10; i++) {
            vouchers.add(new Voucher__c(
                Associate__c = associates[i].Id,
                Voucher_Type__c = 'Certification',
                Certification_Type__c = (Math.mod(i, 2) == 0) ? 'ADM' : 'PD1' 
            ));
        }
        insert vouchers;
        
        List<Attempt__c> attempts = new List<Attempt__c>();
        for(Integer i = 0; i < 10; i++) {
            attempts.add(new Attempt__c(
            	Voucher__c = vouchers[i].Id,
                Attempt_Type__c = 'Certification',
                Passed__c = (Math.mod(i, 2) == 0)
            ));
        }
        insert attempts;
        
        vouchers = new List<Voucher__c>();
        for(Integer i = 0; i < 10; i++) {
            vouchers.add(new Voucher__c(
                Associate__c = associates[i].Id,
                Voucher_Type__c = 'Practice',
                Certification_Type__c = (Math.mod(i, 2) == 0) ? 'ADM' : 'PD1' 
            ));
        }
        insert vouchers;
        
        attempts = new List<Attempt__c>();
        for(Integer i = 0; i < 10; i++) {
            attempts.add(new Attempt__c(
                Voucher__c = vouchers[i].Id,
                Attempt_Type__c = 'Practice',
                Passed__c = (Math.mod(i, 2) == 0)
            ));
        }
    }
    
    // positive test
    @isTest
    public static void testAssociatesWithCerts01() {
        System.assertEquals(5, CertificatesChartController.associatesWithCerts());
    }
    
    // negative test
    @isTest
    public static void testAssociatesWithCerts02() {
        // if practice tests are counted, then this would be 10
        System.assertNotEquals(10, CertificatesChartController.associatesWithCerts());
    }
    
    // positive test
    @isTest
    public static void testAssociatesWithoutCerts01() {
        // half have certs, half should not
        System.assertEquals(5, CertificatesChartController.associatesWithoutCerts());
    }
    
    // negative test
    @isTest
    public static void testAssociatesWithoutCerts02() {
        // Ensure practice tests aren't counted
        System.assertNotEquals(10, CertificatesChartController.associatesWithoutCerts());
    }
    
    // all ADMs should be passed
    @isTest
    public static void testAssociatesWithSpecificCert01() {
        System.assertEquals(5, CertificatesChartController.associatesWithSpecificCert('ADM'));
    }
    
    // all PD1s should be failed
    @isTest
    public static void testAssociatesWithSpecificCert02() {
        System.assertEquals(0, CertificatesChartController.associatesWithSpecificCert('PD1'));
    }
    
    @isTest 
    public static void testAssociatesWithoutSpecificCert01() {
        System.assertEquals(5, CertificatesChartController.associatesWithoutSpecificCert('ADM'));
    }
    
    @isTest
    public static void testAssociatesWithoutSpecificCert02() {
        System.assertEquals(10, CertificatesChartController.associatesWithoutSpecificCert('PD1'));
    }
    
    
    @isTest 
    public static void testAssociatesInCohortWithCerts01() {
        Cohort__c cohort = [SELECT Name FROM Cohort__c LIMIT 1];
        System.assertEquals(5, CertificatesChartController.associatesInCohortWithCerts(cohort.Name));
    }
    
    @isTest
    public static void testAssociatesInCohortWithCerts02() {
        Cohort__c cohort = [SELECT Name FROM Cohort__c LIMIT 1];
        System.assertNotEquals(10, CertificatesChartController.associatesInCohortWithCerts(cohort.Name));
    }
    
    @isTest
    public static void testAssociatesInCohortWithoutCerts01() {
        Cohort__c cohort = [SELECT Name FROM Cohort__c LIMIT 1];
        System.assertEquals(5, CertificatesChartController.associatesInCohortWithoutCerts(cohort.Name));
    }
    
    @isTest
    public static void testAssociatesInCohortWithoutCerts02() {
        Cohort__c cohort = [SELECT Name FROM Cohort__c LIMIT 1];
        System.assertNotEquals(10, CertificatesChartController.associatesInCohortWithoutCerts(cohort.Name));
    }
    
    @isTest
    public static void testAssociatesInCohortWithSpecificCert01() {
        List<Cohort__c> cohorts = [SELECT Name FROM Cohort__c LIMIT 2];
       	System.assertEquals(5, CertificatesChartController.associatesInCohortWithSpecificCert(cohorts[0].Name, 'ADM'));
        System.assertEquals(0, CertificatesChartController.associatesInCohortWithSpecificCert(cohorts[1].Name, 'ADM'));
    }
    
    @isTest
    public static void testAssociatesInCohortWithSpecificCert02() {
        List<Cohort__c> cohorts = [SELECT Name FROM Cohort__c LIMIT 2];
       	System.assertNotEquals(10, CertificatesChartController.associatesInCohortWithSpecificCert(cohorts[0].Name, 'ADM'));
        System.assertNotEquals(5, CertificatesChartController.associatesInCohortWithSpecificCert(cohorts[1].Name, 'ADM'));
    }
    
    @isTest
    public static void testAssociatesInCohortWithoutSpecificCert01() {
        List<Cohort__c> cohorts = [SELECT Name FROM Cohort__c LIMIT 2];
       	System.assertEquals(5, CertificatesChartController.associatesInCohortWithoutSpecificCert(cohorts[0].Name, 'ADM'));
    }
    
        @isTest
    public static void testAssociatesInCohortWithoutSpecificCert02() {
        List<Cohort__c> cohorts = [SELECT Name FROM Cohort__c LIMIT 2];
       	System.assertNotEquals(10, CertificatesChartController.associatesInCohortWithoutSpecificCert(cohorts[0].Name, 'ADM'));
    }
    
    
    // verify that the cert types are correct
    @isTest
    public static void testGetCertTypes() {
        List<String> certTypes = CertificatesChartController.getCertTypes();
        List<String> expectedTypes = new List<String>{ 'ADM', 'PD1', 'Advanced ADM', 'PD2', 'Platform App Builder', 'JS Developer 1' };
        System.assertEquals(expectedTypes.size(), certTypes.size());
        for(Integer i = 0; i < expectedTypes.size(); i++) {
            System.assertEquals(expectedTypes[i], certTypes[i]);
        }
    }
    
    @isTest
    public static void testGetCohortNames() {
        List<Cohort__c> cohorts = [SELECT Name FROM Cohort__c];
        List<String> cohortNames = CertificatesChartController.getCohortNames();
        System.assertEquals(cohorts.size(), cohortNames.size());
      	for(Cohort__c cohort: cohorts) {
            System.assert(cohortNames.contains(cohort.Name));
        }
    }
}
