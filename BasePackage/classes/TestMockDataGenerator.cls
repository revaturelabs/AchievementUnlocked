////////////////////////////////
//
// Mock Data Generator Test class
// 
// also tests voucher assignment triggers
// 
//  Code Coverage: 88%
//  
//  Created on: 8/26/2021
//  Last Edited: 8/26/2021
//  
////////////////////////////////

@isTest
public class TestMockDataGenerator {
    
	@isTest
    public static void genTest(){
        MockDataGenerator gen = new MockDataGenerator();
        gen.generate();
        Voucher__c curVoucher = [SELECT Id FROM Voucher__c LIMIT 1];
        Attempt__c attempt1 = new Attempt__c();
        Attempt__c attempt2 = new Attempt__c();
        
        attempt1.Voucher__c = curVoucher.Id;
        Database.insert(attempt1);
        attempt2.Voucher__c = curVoucher.Id;
        Database.insert(attempt2);
        
    }
}