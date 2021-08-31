public class AttemptTriggerHandler {
    
    public static List<Integer> daysLimit = new List<Integer>{0,1,14,0,1,14};
    public static void setEligibility(List<Attempt__c> attemptList){
        List<Id> voucherIdList = new List<Id>();
        for (Attempt__c curAttempt : attemptList){
            if(curAttempt.Attempt_Type__c == 'Certification' ){
                voucherIdList.add(curAttempt.Voucher__c);
            }
        }
        List<Voucher__c> voucherList = [SELECT Max_Date__c, Number_of_Attempts__c, Eligible_By__c FROM Voucher__c WHERE Id IN :voucherIdList ];
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