public class VoucherAssignment {
    @AuraEnabled(cacheable=false)
    public static List<Associate__c> Assign(List<Associate__c> associateIds, String voucherType, String certType, Date dueDate){
		Integer numberOfVouchers = associateIds.size();
        List<Voucher__c> voucherList = [SELECT Id, Due_Date__c, Associate__c, Status__c FROM Voucher__c WHERE Associate__c = NULL AND Certification_Type__c =:certType AND Voucher_Type__c =:voucherType LIMIT :numberOfVouchers ];

        
        for(integer index = 0; index < voucherList.size(); index++){
            voucherList[index].Due_Date__c = dueDate;
            voucherList[index].Status__c = 'Delivered';

            Id curId = associateIds[0].Id;
            associateIds.remove(0);
            voucherList[index].Associate__c = Id.valueOf(curId);

        }
        database.update(voucherList);
        
        return associateIds;

    }
}