@isTest
private class viewControllerTest {

    static void singleSetup() {
        Cohort__c c = new Cohort__c();
        c.Start_Date__c = Date.newInstance(2000, 1, 1);
        insert c;
        c = [SELECT Id FROM Cohort__c LIMIT 1];
        Associate__c a = new Associate__c();
        a.Cohort__c = c.Id;
        a.First_Name__c = 'Bob';
        a.Last_Name__c = 'Smith';
        a.Current_Status__c = 'Staging';
        insert a;
        a = [SELECT Id FROM Associate__c LIMIT 1];
        Voucher__c v = new Voucher__c();
        v.Associate__c = a.Id;
        v.Certification_Type__c = 'ADM';
        v.Status__c = 'Delivered';
        insert v;
        v = [SELECT Id FROM Voucher__c LIMIT 1];
        Attempt__c att = new Attempt__c();
        att.Voucher__c = v.Id;
        att.Attempt_Type__c = 'Certification';
        att.Passed__c = true;
        insert att;
    }
    
    static void bulkSetup() {
        List<Cohort__c> cohorts = new List<Cohort__c>();
        for (Integer i=0; i<3; i++) {
            Cohort__c c = new Cohort__c();
            c.Start_Date__c = Date.newInstance(2000 + i, 1, 1);
            c.End_Date__c = c.Start_Date__c.addYears(1);
            cohorts.add(c);
        }
        Database.insert(cohorts);
    }
    
    static void cohortFilteringSetup() {
        List<Cohort__c> cohorts = new List<Cohort__c>();
        // Create 4 active cohorts
        for (Integer i=0; i<4; i++) {
            Cohort__c c = new Cohort__c();
            c.Start_Date__c = Date.today().addDays(-i);
            c.End_Date__c = Date.today().addDays(i);
            cohorts.add(c);
        }
        // Create 5 inactive cohorts; 2 that have already completed
        // and 3 that have yet to start
        for (Integer i=0; i<2; i++) {
            Cohort__c c = new Cohort__c();
            c.Start_Date__c = Date.today().addDays(-(i+2));
            c.End_Date__c = Date.today().addDays(-(i+1));
            cohorts.add(c);
        }
        for (Integer i=0; i<3; i++) {
            Cohort__c c = new Cohort__c();
            c.Start_Date__c = Date.today().addDays((i+1));
            c.End_Date__c = Date.today().addDays((i+2));
            cohorts.add(c);
        }
        Database.insert(cohorts);
    }
    
    // Cohort Testing
    
    // A positive test on a single cohort
    @isTest
    static void getCohortsSinglePositive() {
        singleSetup();
        List<Cohort__c> cohorts = viewController.getCohorts();
        system.assertEquals(1, cohorts.size());
        system.assertEquals(Date.newInstance(2000, 1, 1), cohorts[0].Start_Date__c);
    }
    
    // A positive test for multiple cohorts
    @isTest
    static void getCohortsBulkPositive() {
        bulkSetup();
        List<Cohort__c> cohorts = viewController.getCohorts();
        system.assertEquals(3, cohorts.size());
    }
    
    // Tests the getFilteredCohorts on getting 'all' cohorts
    @isTest
    static void getFilteredCohortsAllBulkPositive() {
        cohortFilteringSetup();
        List<Cohort__c> cohorts = viewController.getFilteredCohorts('all');
        system.assertEquals(9, cohorts.size());
    }
    
    // Tests the getFilteredCohorts on getting 'active' cohorts
    @isTest
    static void getFilteredCohortsActiveBulkPositive() {
        cohortFilteringSetup();
        List<Cohort__c> cohorts = viewController.getFilteredCohorts('active');
        system.assertEquals(4, cohorts.size());
    }
    
    // Tests the getFilteredCohorts on getting 'inactive' cohorts
    @isTest
    static void getFilteredCohortsInactiveBulkPositive() {
        cohortFilteringSetup();
        List<Cohort__c> cohorts = viewController.getFilteredCohorts('inactive');
        system.assertEquals(5, cohorts.size());
    }
    
    // Associate Testing
    
    // Tests the getAllAssociates method on retrieving a single associate
    // with no arguments
    @isTest
    static void getAllAssociatesSinglePositive() {
        singleSetup();
        List<Associate__c> associates = viewController.getAllAssociates();
        system.assertEquals(1, associates.size());
        system.assertEquals('Bob', associates[0].First_Name__c);
        system.assertEquals('Smith', associates[0].Last_Name__c);
        system.assertEquals('Staging', associates[0].Current_Status__c);
    }
    
    // Tests the getCohortAssociates method on retrieving a single associate 
    // with a cohort
    @isTest
    static void getCohortAssociatesSinglePositive() {
        singleSetup();
        Cohort__c c = [SELECT Id FROM Cohort__c LIMIT 1];
        List<Associate__c> associates = viewController.getCohortAssociates(c.Id);
        system.assertEquals(1, associates.size());
        system.assertEquals(c.Id, associates[0].Cohort__c);
        system.assertEquals('Bob', associates[0].First_Name__c);
        system.assertEquals('Smith', associates[0].Last_Name__c);
        system.assertEquals('Staging', associates[0].Current_Status__c);
    }
    
    // Tests the getAssociates method on retrieving a single associate 
    // with all parameters set.
    @isTest
    static void getAssociatesSinglePositive() {
        singleSetup();
        Cohort__c c = [SELECT Id FROM Cohort__c LIMIT 1];
        List<Associate__c> associates = viewController.getAssociates(c.Id, null, 'Last_Name__c', 'ASC', 1);
        system.assertEquals(1, associates.size());
        system.assertEquals(c.Id, associates[0].Cohort__c);
        system.assertEquals('Bob', associates[0].First_Name__c);
        system.assertEquals('Smith', associates[0].Last_Name__c);
        system.assertEquals('Staging', associates[0].Current_Status__c);
    }
    
    // Tests the getAssociates method on retrieving a single associate 
    // with all parameters set and cohortId null.
    @isTest
    static void getAssociatesCohortNullSinglePositive() {
        singleSetup();
        Cohort__c c = [SELECT Id FROM Cohort__c LIMIT 1];
        viewController.Filters f = new viewController.Filters();
        List<Associate__c> associates = viewController.getAssociates(null, f, 'Last_Name__c', 'ASC', 1);
        system.assertEquals(1, associates.size());
        system.assertEquals(c.Id, associates[0].Cohort__c);
        system.assertEquals('Bob', associates[0].First_Name__c);
        system.assertEquals('Smith', associates[0].Last_Name__c);
        system.assertEquals('Staging', associates[0].Current_Status__c);
    }
    
    // Tests the getAssociates method on retrieving a single associate 
    // with all parameters set and filters null.
    @isTest
    static void getAssociatesFiltersNullSinglePositive() {
        singleSetup();
        Cohort__c c = [SELECT Id FROM Cohort__c LIMIT 1];
        List<Associate__c> associates = viewController.getAssociates(c.Id, null, 'Last_Name__c', 'ASC', 1);
        system.assertEquals(1, associates.size());
        system.assertEquals(c.Id, associates[0].Cohort__c);
        system.assertEquals('Bob', associates[0].First_Name__c);
        system.assertEquals('Smith', associates[0].Last_Name__c);
        system.assertEquals('Staging', associates[0].Current_Status__c);
    }
    
    // Tests the getAssociates method on retrieving a single associate 
    // with all parameters set, cohort null, and filters null.
    @isTest
    static void getAssociatesCohortAndFiltersNulllSinglePositive() {
        singleSetup();
        Cohort__c c = [SELECT Id FROM Cohort__c LIMIT 1];
        List<Associate__c> associates = viewController.getAssociates(null, null, 'Last_Name__c', 'ASC', 1);
        system.assertEquals(1, associates.size());
        system.assertEquals(c.Id, associates[0].Cohort__c);
        system.assertEquals('Bob', associates[0].First_Name__c);
        system.assertEquals('Smith', associates[0].Last_Name__c);
        system.assertEquals('Staging', associates[0].Current_Status__c);
    }
    
    // Tests the getAssociates method on not retrieving a single associate 
    @isTest
    static void getAssociatesCohortIdFiltersNullSingleNegative() {
        singleSetup();
        Cohort__c c = new Cohort__c();
        Date d = Date.newInstance(2012, 3, 3);
        c.Start_Date__c = d;
        insert c;
        c = [SELECT Id FROM Cohort__c WHERE Start_Date__c = :d];
        List<Associate__c> associates = viewController.getAssociates(c.Id, null, 'Last_Name__c', 'ASC', 1);
        system.assertEquals(0, associates.size());
    }
    
    // Tests the getAssociates method on filtering with a searchKey
    @isTest
    static void getAssociatesFilterSearchKeySinglePositive() {
        singleSetup();
        viewController.Filters f = new viewController.Filters();
        f.searchKey = 'Smith';
        List<Associate__c> a = viewController.getAssociates(null, f, 'Last_Name__c', 'ASC', 1);
        system.assertEquals(1, a.size());
        system.assertEquals('Smith', a[0].Last_Name__c);
    }
    
    // Tests the getAssociates method on filtering with a searchKey
    @isTest
    static void getAssociatesFilterSearchKeySingleNegative() {
        singleSetup();
        viewController.Filters f = new viewController.Filters();
        f.searchKey = 'Jones';
        List<Associate__c> a = viewController.getAssociates(null, f, 'Last_Name__c', 'ASC', 1);
        system.assertEquals(0, a.size());
    }
    
    // Tests the getAssociates method on filtering with statuses
    @isTest
    static void getAssociatesFilterStatusesSinglePositive() {
        singleSetup();
        viewController.Filters f = new viewController.Filters();
        List<String> statuses = new List<String>();
        statuses.add('Staging');
        f.statuses = statuses;
        List<Associate__c> a = viewController.getAssociates(null, f, 'Last_Name__c', 'ASC', 1);
        system.assertEquals(1, a.size());
        system.assertEquals('Staging', a[0].Current_Status__c);
    }
    
    // Tests the getAssociates method on filtering with statuses
    @isTest
    static void getAssociatesFilterStatusesSingleNegative() {
        singleSetup();
        viewController.Filters f = new viewController.Filters();
        List<String> statuses = new List<String>();
        statuses.add('Training');
        f.statuses = statuses;
        List<Associate__c> a = viewController.getAssociates(null, f, 'Last_Name__c', 'ASC', 1);
        system.assertEquals(0, a.size());
    }
    
    // Tests the getAssociates method on filtering with search keys and statuses
    @isTest
    static void getAssociatesFilterSearchKeyAndStatusesSinglePositive() {
        singleSetup();
        viewController.Filters f = new viewController.Filters();
        List<String> statuses = new List<String>();
        statuses.add('Staging');
        f.statuses = statuses;
        f.searchKey = 'Smith';
        List<Associate__c> a = viewController.getAssociates(null, f, 'Last_Name__c', 'ASC', 1);
        system.assertEquals(1, a.size());
        system.assertEquals('Staging', a[0].Current_Status__c);
        system.assertEquals('Smith', a[0].Last_Name__c);
    }
    
    // Tests the getAssociates method with cohortIds and filters
    @isTest
    static void getAssociatesCohortAndFiltersSinglePositive() {
        singleSetup();
        Cohort__c c = [SELECT Id FROM Cohort__c LIMIT 1];
        viewController.Filters f = new viewController.Filters();
        List<String> statuses = new List<String>();
        statuses.add('Staging');
        f.statuses = statuses;
        f.searchKey = 'Smith';
        List<Associate__c> a = viewController.getAssociates(c.Id, f, 'Last_Name__c', 'ASC', 1);
        system.assertEquals(1, a.size());
        system.assertEquals('Staging', a[0].Current_Status__c);
        system.assertEquals('Smith', a[0].Last_Name__c);
        system.assertEquals(c.Id, a[0].Cohort__c);
    }

    // Tests the getAssociates method with a certification filter
    @isTest
    static void getAssociatesCertTypeSinglePositive() {
        singleSetup();
        viewController.Filters f = new viewController.Filters();
        f.certs = new List<String>();
        f.certs.add('ADM');
        List<Associate__c> a = viewController.getAssociates(null, f, 'Last_Name__c', 'ASC', 1);
        system.AssertEquals(1, a.size());
    }
    
    // Tests the getAssociates method with a certification filter
    @isTest
    static void getAssociatesCertTypeSingleNegative() {
        singleSetup();
        viewController.Filters f = new viewController.Filters();
        f.certs = new List<String>();
        f.certs.add('PD1');
        List<Associate__c> a = viewController.getAssociates(null, f, 'Last_Name__c', 'ASC', 1);
        system.AssertEquals(0, a.size());
    }
    
    // Voucher Testing
     
    // Tests the getVouchers method on retrieving a single voucher
    @isTest
    static void getVouchersSinglePositive() {
        singleSetup();
        Associate__c a = [SELECT Id FROM Associate__c LIMIT 1];
        List<Voucher__c> v = viewController.getVouchers(a.Id);
        system.assertEquals(1, v.size());
        system.assertEquals(a.Id, v[0].Associate__c);
        system.assertEquals('ADM', v[0].Certification_Type__c);
        system.assertEquals('Delivered', v[0].Status__c);
    }
    
    // Attempt Testing
    
    // Tests the getAttempts method on retrieving a single attempt
    @isTest
    static void getAttemptsSinglePositive() {
        singleSetup();
        Associate__c a = [SELECT Id FROM Associate__c LIMIT 1];
        List<Attempt__c> attempts = viewController.getAttempts(a.Id);
        system.assertEquals(1, attempts.size());
        system.assertEquals('Certification', attempts[0].Attempt_Type__c);
        system.assert(attempts[0].Passed__c);
    }
}