/////////////////////////////////
//
// Voucher Assignment class
// Created by Richard 'Jerry' Laughter
// created on: 9/1/2021
// last edited: 9/5/2021
//
// Creates and assigns vouchers to users based on need, warns if number of vouchers falls below 50
//
/////////////////////////////////

public class VoucherAssignment {
	//the assignment method, assigns vouchers to users, warns if there aren't enough vouchers to go around
	//also warns if the number of vouchers falls below 50
    @AuraEnabled(cacheable=false)
    public static String Assign(List<Associate__c> associateIds, String voucherType, String certType, Date dueDate){
		Integer numberOfVouchers = associateIds.size();

        //obtains a list of empty vouchers ready for use, selects by voucher type
        List<Voucher__c> voucherList = [SELECT Id, Due_Date__c, Certification_Type__c, Associate__c, Status__c FROM Voucher__c WHERE Associate__c = NULL AND Voucher_Type__c =:voucherType LIMIT :numberOfVouchers ];

	    //Assigns vouchers one by one, removes associates from the associateIds list    
        for(integer index = 0; index < voucherList.size(); index++){
            voucherList[index].Due_Date__c = dueDate;
            voucherList[index].Status__c = 'Delivered';
            voucherList[index].Certification_Type__c = certType;

            Id curId = associateIds[0].Id;
            associateIds.remove(0);
            voucherList[index].Associate__c = Id.valueOf(curId);

        }
        String message = '';
		//if the updated vouchers fail returns the error reason
        try{
	        database.update(voucherList);        
        }catch(exception e){
            return String.valueof(e);
        }
		//if there are any remaining associates it returns the names of the associates that have not been assigned
        if(associateIds.size() > 0){
            message = 'Not enough vouchers, ';
            for(Associate__c curAssociate: associateIds){
                message += curAssociate.First_Name__c + ' ' + curAssociate.Last_Name__c + ', ';
            }
            message += 'Did not recieve vouchers';
        }
        //checks how many vouchers remain, if less than 50 returns a warning notifying the trainer
        Integer availableVouchers = [SELECT COUNT() FROM Voucher__c WHERE Voucher_Type__c =:voucherType AND Associate__c = NULL ];
        if(availableVouchers < 50){
            message += ' WARNING: ONLY ' + availableVouchers + ' ' + voucherType + ' VOUCHERS REMAINING';
        }
        return message;
    }
        
    //creates new vouchers using a newline separated string
    @AuraEnabled(cacheable=false)
    public static String newVouchers(String voucherType, Date expDate, String voucherCodes){

        //turns the string into a list of strings, checks for the size, if no valid data has been entered
        //then it returns an error
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
        	//creates a new voucher object for each string in the list
        	//assigns the same voucehr type and expiration date to the voucher
            List<Voucher__c> voucherList = new List<Voucher__c>();
            
            for(String curCode : voucherCodeList){
                Voucher__c curVoucher = new Voucher__c();
                curVoucher.Expiration_Date__c = expDate;
                curVoucher.Voucher_Type__c = voucherType;
                curVoucher.Voucher_Code__c = curCode;
                voucherList.add(curVoucher);
            }    
    		// attempts to submit them and notifies the user of any error
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
