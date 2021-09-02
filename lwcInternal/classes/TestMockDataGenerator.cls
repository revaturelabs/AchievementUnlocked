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
    }
}