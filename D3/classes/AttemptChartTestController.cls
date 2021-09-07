@isTest
public class AttemptChartTestController {
    

    @testSetup
    public static void setup() {
        // SETUP TAKEN FROM TESTCERTIFICATESCHARTCONTROLLER
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
        //insert attempts;
    }//*/

    @isTest
    public static void runTests() {
        List<Cohort__c> cList = [SELECT Name, Id FROM Cohort__c];
        List<Associate__c> aList = [SELECT Name, Id, (SELECT Name, Number_of_Attempts__c FROM Vouchers__r) FROM Associate__c WHERE Cohort__r.Id =:cList[0].Id];
        System.debug(cList);
        //System.debug(aList);
        for(Associate__c a : aList){
            System.debug(a);
            for(Voucher__c v : a.Vouchers__r){
                System.debug('mumofatt: ' + v.Number_of_Attempts__c);
            }
        }
        System.assertNotEquals(null, AttemptChartsController.getCohortById(String.valueOf(cList[1].Id)));
        System.assertNotEquals(null, AttemptChartsController.getCohortWrapperConvert(aList, 'ADM'));

        System.debug(AttemptChartsController.getCohorts());
        System.assertNotEquals(null, AttemptChartsController.getCohorts());
        System.assertNotEquals(null, AttemptChartsController.getADMOverview());
    }

    /*@isTest(SeeAllData=true)
    public static void runTestsWithLiveData(){
        List<Cohort__c> cList = [SELECT Name, Id FROM Cohort__c];
        List<Associate__c> aList = [SELECT Name, Id, (SELECT Name, Number_of_Attempts__c FROM Vouchers__r) FROM Associate__c WHERE Cohort__r.Id =:cList[0].Id];

        System.assertNotEquals(null, AttemptChartsController.getCohortById(String.valueOf(cList[1].Id)));
        System.assertNotEquals(null, AttemptChartsController.getCohortWrapperConvert(aList, 'ADM'));

        System.debug(AttemptChartsController.getCohorts());
        System.assertNotEquals(null, AttemptChartsController.getCohorts());
        System.assertNotEquals(null, AttemptChartsController.getADMOverview());
    
    }//*/
}
