////////////////////////////////
//
// Mock Data Generator Test class
// 
// also tests voucher assignment triggers
// 
//  Code Coverage: 94%
//  Created by: Richard 'Jerry' Laughter
//  Created on: 8/26/2021
//  Last Edited: 8/26/2021
//  
////////////////////////////////

@isTest
public class TestMockDataGenerator {
    
    @isTest
    public static void genTest(){
        MockDataGenerator gen = new MockDataGenerator();
        gen.generate(0);
        gen = new MockDataGenerator();
        gen.generate(2);
        gen = new MockDataGenerator();
        gen.generate(4);
        gen = new MockDataGenerator();
        gen.generate(6);
        gen = new MockDataGenerator();
        gen.generate(8);
        gen = new MockDataGenerator();
        gen.generate(10);

        
    }
}
