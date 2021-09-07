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
        
    @AuraEnabled(cacheable=false)
    public static String newVouchers(String voucherType, Date expDate, String voucherCodes){

        integer voucherCodesCount = 0;
        List<String> voucherCodeList = New List<String>();
        if(vouchercodes.length() > 2){
	        voucherCodeList = voucherCodes.split('\n');        
	        voucherCodesCount = voucherCodeList.size();
        }else{
            voucherCodesCount = 0;
        }

        String results = '';
        if (voucherCodesCount > 0){
        
            List<Voucher__c> voucherList = new List<Voucher__c>();
            
            for(String curCode : voucherCodeList){
                Voucher__c curVoucher = new Voucher__c();
                curVoucher.Expiration_Date__c = expDate;
                curVoucher.Voucher_Type__c = voucherType;
                curVoucher.Voucher_Code__c = curCode;
                voucherList.add(curVoucher);
            }    
    
            try{
                Database.insert(voucherList);
                results = 'Vouchers added successfully!';
            } catch(Exception e){
                results = String.valueOf(e);
            }
            
        } else{
            results = 'No voucher codes found';
        }
        return results;

    }
    
}