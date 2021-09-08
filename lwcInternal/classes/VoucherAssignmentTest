///////////////////////////////////
//
// Voucher Assignment Test class
// 
// Created 9/5/2021
// Last edited 9/5/2021
// 
// Tests both positive and negative inputs for the voucher assignment class using the mock data generator
// 
// code coverage: 91%
// //////////////////////////////////

@isTest
public class VoucherAssignmentTest {
	@isTest
    public static void testVoucherAssignment(){
        MockDataGenerator gen = new MockDataGenerator();
        gen.generate(1);
    
        String vouchercodes = '132465798\n987654321\n8224148565';
        Date ExpDate = Date.today() + 50;
        String result  = VoucherAssignment.newVouchers('Practice', expDate, vouchercodes);
        
        String finAssociates= VoucherAssignment.Assign(gen.associateList, 'Practice' , 'ADM', Date.today() );
        
    }
    
    @isTest
    public static void testVoucherAssignmentNegative(){
        MockDataGenerator gen = new MockDataGenerator();
        gen.generate(1);
    
        String vouchercodes = '1';
        Date ExpDate = Date.today() + 50;
        String result  = VoucherAssignment.newVouchers('Practice', expDate, vouchercodes);
        
        String finAssociates= VoucherAssignment.Assign(gen.associateList, 'Practice' , 'ADM', Date.today() );
        
    }
    
}
