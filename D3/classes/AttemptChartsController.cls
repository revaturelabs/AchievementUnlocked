public with sharing class AttemptChartsController {
    @AuraEnabled
    public static String serverEcho(String firstName) {
        return ('Hello from the server, ' + firstName);
    }

    @AuraEnabled(cacheable=true)
    public static List<SObject> getADMOverview(){
        List<Associate__c> A =  [SELECT Name, (SELECT Name, Number_of_Attempts__c, Certification_Type__c, Certified__c FROM Vouchers__r WHERE Certification_Type__c='ADM' AND Certified__c=True) FROM Associate__c WHERE Associate__c.Id IN (SELECT Associate__c FROM Voucher__c WHERE Certified__c=True AND Certification_Type__c='ADM')];
        System.debug(A);
        for(Associate__c ac : A){
            for(Voucher__c c: ac.Vouchers__r)
                System.debug('v Name:'+c.Name + ' cert type: ' + c.Certification_Type__c + ' att: ' + c.Number_of_Attempts__c);
        }
        return A;
    }

    @AuraEnabled(cacheable=true)
    public static List<CohortWrapper> getCohorts(){
        //use LIMIT  5 OFFSET 5 then increment offest
        List<Cohort__c> cohorts = [SELECT Name, Id FROM Cohort__c];
        List<CohortWrapper> returnCohorts = new List<CohortWrapper>();
        returnCohorts.add(new CohortWrapper('origin', '', '', null, null, null, null));
        System.debug(cohorts);
        for(Cohort__c c : cohorts){
            List<Associate__c> a = 
            [SELECT Name, (SELECT Name, Number_of_Attempts__c, Certification_Type__c, Certified__c FROM Vouchers__r WHERE Certification_Type__c='ADM' AND Certified__c=True) FROM Associate__c WHERE Cohort__c= :c.Id AND Associate__c.Id IN (SELECT Associate__c FROM Voucher__c WHERE Certified__c=True AND Certification_Type__c='ADM')];
            //[SELECT Name, Cohort__c FROM Associate__c WHERE Cohort__c= :c.Id];
            System.debug('coo: ' + c.Name);
            System.debug(a);
            Integer att1 = 0, att2 = 0, att3 = 0, att4 = 0;
            for(Associate__c b: a){
                System.debug('aName: ' + b.Name);
                for(Voucher__c v : b.Vouchers__r){
                    //System.debug('vName: ' + v.Name);
                    Decimal temp = v.Number_of_Attempts__c;
                    if(temp == 1) att1++;
                    else if(temp == 2) att2++;
                    else if(temp == 3) att3++;
                    else if(temp >= 4) att4++;
                }
            }
            returnCohorts.add(new CohortWrapper(c.Name, 's', 'origin', att1, att2, att3, att4));
        }
        System.debug('returnCohorts: ' + returnCohorts);
        return returnCohorts;
    }

    public class CohortWrapper{
        @AuraEnabled public String model_name;
        @AuraEnabled public String startDate;
        @AuraEnabled public String parent;

        @AuraEnabled public Integer field1;
        @AuraEnabled public Integer field2;
        @AuraEnabled public Integer field3;
        @AuraEnabled public Integer field4;

        public CohortWrapper(String name, String start, String p, 
        Integer num1, Integer num2, Integer num3, Integer num4){
                this.model_name = name;
                this.startDate = start;
                this.parent = p;
                this.field1 = num1;
                this.field2 = num2;
                this.field3 = num3;
                this.field4 = num4;
        }

    }
}
