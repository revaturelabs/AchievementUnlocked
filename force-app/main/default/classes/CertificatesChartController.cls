public class CertificatesChartController {
	// @desc : retrieve all associates who have earned at least one certificate
    @AuraEnabled(cacheable=true)
    public static Integer associatesWithCerts() {
        List<AggregateResult> results = [SELECT COUNT_DISTINCT(Voucher__r.Associate__c) 
                                         FROM Attempt__c 
                                         WHERE Passed__c = True];
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
        List<AggregateResult> results = [SELECT COUNT_DISTINCT(Voucher__r.Associate__c) 
                                         FROM Attempt__c 
                                         WHERE Passed__c = True 
                                         AND Attempt__c.Voucher__r.Certification_Type__c = :certType];
        Integer certifiedAssociates = (Integer) results[0].get('expr0');
        return certifiedAssociates;
    }
    
    
    // @desc : retrieve number of associates who have not earned a specific certification
    @AuraEnabled(cacheable=true)
    public static Integer associatesWithoutSpecificCert(String certType) {
        Integer numberOfAssociates = [SELECT COUNT() FROM Associate__c];
        Integer associatesWithoutCerts = numberOfAssociates - associatesWithSpecificCert(certType);
        return associatesWithoutCerts;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<String> getCertTypes() {
        Schema.DescribeFieldResult fieldResult = Voucher__c.Certification_Type__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        List<String> picklistLabels = new List<String>();
        for(Schema.PicklistEntry entry: ple) {
            picklistLabels.add(entry.getLabel());
        }
        System.debug(picklistLabels);
        return picklistLabels;
    }
}