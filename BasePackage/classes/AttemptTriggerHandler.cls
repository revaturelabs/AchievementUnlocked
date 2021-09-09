//////////////////////////////////
//
// Attempt Trigger Handler
// 
// Created on 8/25/2021
// Last Edited 8/27/2021 
//
// Sets the eligible date for the next attempt on the voucher by getting the number of attempts and adding the number of days
//     from the daysLimit list to the date of the last attempt
//
//////////////////////////////////

public class AttemptTriggerHandler {
    
    public static List<Integer> daysLimit = new List<Integer>{0,1,14,0,1,14};
    public static void setEligibility(List<Attempt__c> attemptList){
        //gets a list of all certification attempts and uses that to get the associated vouchers
        List<Id> voucherIdList = new List<Id>();
        for (Attempt__c curAttempt : attemptList){
            if(curAttempt.Attempt_Type__c == 'Certification' ){
                voucherIdList.add(curAttempt.Voucher__c);
            }
        }
        List<Voucher__c> voucherList = [SELECT Max_Date__c, Number_of_Attempts__c, Eligible_By__c FROM Voucher__c WHERE Id IN :voucherIdList ];

        // iterates through each voucher and checks the number of attempts
        // the number of attempts acts as a key for the daysLimit list
        // adds those days to the date of the last attempt
        for( Voucher__c curVoucher : voucherList ){
            system.assert(True, curVoucher.Number_of_Attempts__c);
            if (curVoucher.Number_of_Attempts__c > 0){
                DateTime dT = curVoucher.Max_Date__c;
                DateTime ndt = dt.addDays(daysLimit[Integer.valueof(curVoucher.Number_of_Attempts__c)] );
                Date myDate = date.newinstance(ndT.year(), ndT.month(), ndT.day());
                curVoucher.Eligible_By__c = myDate;
            }else{
                curVoucher.Eligible_By__c = system.today();
            }
        }
        database.update(voucherList);
    }
}
