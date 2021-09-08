////////////////////////////////
//
// Mock Data generator V5
// 
// for creating random but valid records
// 
//
// created on 8/16/2021
// last edited 9/8/2021
// 
// Use:
// MockDataGenerator gen = new MockDataGenerator();
// gen.generate();
// 
// data:
// gen.accountList // list of accounts
// gen.contactList // list of contacts
// gen.voucherList // list of vouchers
// gen.cohortList  // list of cohorts
// gen.associateList // list of associates
// gen.attemptList // list of attempts
// gen.assignedVouchers // list of assigned vouchers
// 
// methods:
// gen.getRandomObject()
// ((Voucher__c)gen.getRandomObject(gen.voucherList)) // returns a random voucher
// 
// vouchers come in assigned and unassigned, only an assigned voucher will have attempts attached
// no vouchers of matching certification and type will be assigned to the same associate
//
////////////////////////////////

public class MockDataGenerator {

    public integer numOfAccounts = 10;
    public integer numOfContacts = 20;
    public integer numOfFacilities = 30;
    public integer numOfGuildHalls = 20;
    public integer numOfGuildMembers = 30;
    public integer numOfItems = 30;
    public integer numOfParties = 30;
    public integer numOfQuests = 30;
    public integer numOfAssociates = 10;
    public integer numOfVouchers = 10;
    public integer numOfCohorts = 2;
    public integer numOfAttempts = 10;

    
    public List<String> firstNames = new List<String>{'Liam', 'Noah', 'Oliver', 'Elijah', 'William', 'James', 'Benjamin', 'Lucas', 'Henry', 'Alexander', 'Mason', 'Michael', 'Ethan', 'Daniel', 'Jacob', 'Logan', 'Jackson', 'Levi', 'Sebastian', 'Mateo', 'Jack', 'Owen', 'Theodore', 'Aiden', 'Samuel', 'Joseph', 'John', 'David'};
    public List<String> lastNames = new List<String>{'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee'};
    public List<String> Adverbs = new List<String>{'boldly', 'bravely', 'brightly', 'cheerfully', 'deftly', 'devotedly', 'eagerly', 'elegantly', 'faithfully', 'fortunately', 'gleefully', 'gracefully', 'happily', 'honestly', 'innocently', 'kindly', 'merrily', 'obediently', 'perfectly', 'politely', 'powerfully', 'safely', 'victoriously', 'warmly', 'vivaciously'};
    public List<String> Nouns = new List<String>{'meat', 'year', 'thanks', 'music', 'person', 'reading', 'method', 'data', 'food', 'understanding', 'theory', 'law', 'bird', 'literature', 'problem', 'software', 'control', 'knowledge', 'power', 'ability', 'economics', 'love', 'internet', 'television', 'science', 'library', 'nature', 'fact', 'product', 'idea', 'temperature', 'investment', 'area', 'society', 'activity', 'story', 'industry'};
    public List<String> Adjectives = new List<String>{'adorable', 'adventurous', 'aggressive', 'agreeable', 'alert', 'alive', 'amused', 'angry', 'annoyed', 'annoying', 'anxious', 'arrogant', 'ashamed', 'attractive', 'average', 'awful', 'bad', 'beautiful', 'better', 'bewildered', 'black', 'bloody', 'blue', 'blue-eyed', 'blushing', 'bored', 'brainy', 'brave', 'breakable', 'bright', 'busy', 'calm', 'careful', 'cautious', 'charming', 'cheerful', 'clean', 'clear', 'clever', 'cloudy', 'clumsy', 'colorful'};
    public List<String> States = new List<String>{'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'NewHampshire', 'NewJersey', 'NewMexico', 'NewYork', 'NorthCarolina', 'NorthDakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'RhodeIsland', 'SouthCarolina', 'SouthDakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'WestVirginia', 'Wisconsin', 'Wyoming'};
    public List<String> Races = new List<String>{'Aarakocra', 'Aasimar', 'Bugbear', 'Centuar', 'Changeling', 'Dragonborn', 'Dwarf', 'Elf', 'Firbolg', 'Genasi', 'Gith', 'Gnome', 'Goblin', 'Goliath', 'Half-Elf', 'Halfling', 'Half-Orc', 'Hobgoblin', 'Human', 'Kalashtar', 'Kenku', 'Kobold', 'Lizardfolk', 'Loxodon', 'Minotaur', 'Orc', 'Shifter', 'Simic Hybrid', 'Tabaxi', 'Tiefling', 'Tortle', 'Triton', 'Vedalken', 'Warforged', 'Yuan-ti Pureblood'};
    public List<String> Certifications = new List<String>{'ADM', 'PD1', 'Advanced ADM', 'PD2', 'Platform App Builder', 'JS Developer 1'};
        
    final string cons = 'bcdfghjklmnpqrstvwxz';
    final string vowels = 'aeiou';
    final integer maxNameLength = 12;
    
    public List<Account> accountList = new List<Account>();
    public List<Contact> contactList = new List<Contact>();
    public List<Voucher__c> voucherList = new List<Voucher__c>();
    public List<Cohort__c> cohortList = new List<Cohort__c>();
    public List<Associate__c> associateList = new List<Associate__c>();
    public List<Attempt__c> attemptList = new List<Attempt__c>();
    public List<Voucher__c> assignedVouchers = new List<Voucher__c>();
    
    public void generate(Integer cohortNum){
        // cohorts are ten weeks
        // there are 10 cohorts
        // a week is 7 days, a cohort is 70 days long
        // the first cohort should start 2 weeks ago
        // 14 days * cohort number
        // 

        Date startDate = Date.today() - (cohortNum * 14);
        Date endDate = startDate + 70;
        System.debug(startDate);
        System.debug(endDate);

        String cert1 = getSelection(Certifications);
        String cert2 = getSelection(Certifications);
        while(cert2 == cert1){
            cert2 = getSelection(Certifications);            
        }
        generateAccounts(numOfAccounts);
        generateContacts(numOfContacts);
        Cohort__c curCohort = new Cohort__c();
        curCohort.Start_Date__c = startDate;
        curCohort.End_Date__c = endDate;
        database.insert(curCohort);
        generateAssociates(10, curCohort);
        generateVouchers(cert1, cert2);
        generateAttempts();
        releaseAssociates();
        
    }
    
    public void releaseAssociates(){
        for(Associate__c curAssociate: associateList){
            integer releaseRand = rollDice(4);
            if(releaseRand == 0){
                curAssociate.Current_Status__c = 'Released';
                curAssociate.Release_Reason__c = 'Could not keep up with Cohort';
            }
        }
        database.update(associateList);
    }
    
    public void generateAttempts(){
        for(Voucher__c curVoucher: voucherList){
            if(Date.today() > curVoucher.Due_Date__c){
                Integer count = 0;
                do{
                    String certTypeStr = curVoucher.Certification_Type__c.replace(' ', '_');
                    Id recordTypeId = Schema.SObjectType.Attempt__c.getRecordTypeInfosByDeveloperName()
                        .get(certTypeStr ).getRecordTypeId();
                    Attempt__c curAttempt = new Attempt__c();
                    curAttempt.RecordTypeId = recordTypeId;
                    curAttempt.Voucher__c = curVoucher.Id;
                    curAttempt.Attempt_Type__c = curVoucher.Voucher_Type__c;
                    scoreAttempt(curAttempt, curVoucher);
                    if(count == 0){
                        curAttempt.Date__c = curVoucher.Due_Date__c;
                    } else if(count == 1){
                        curAttempt.Date__c = curVoucher.Due_Date__c + 1;                        
                    } else{
                        curAttempt.Date__c = curVoucher.Due_Date__c + 14;                        
                    }
                    curVoucher.Status__c = 'Used';
                    attemptList.add(curAttempt);
                    count ++;
                }while(count < 3 && curVoucher.Certified__c == False && curVoucher.Voucher_Type__c == 'Certification');
            }
        }
        database.insert(attemptList);
        database.update(voucherList);
    }
    
    public void scoreAttempt(Attempt__c curAttempt, Voucher__c curVoucher){
        if (curVoucher.Certification_Type__c == 'ADM' ){
            
            curAttempt.Configuration_and_Setup__c = rollDice(65) + 35 ;
            curAttempt.Data_and_Analytics_Management__c = rollDice(65) + 35;
            curAttempt.Object_Manager_and_Lightning_App_Builder__c = rollDice(65) + 35;
            curAttempt.Productivity_and_Collaboration__c = rollDice(65) + 35;
            curAttempt.Sales_and_Marketing_Applications__c = rollDice(65) + 35;
            curAttempt.Service_and_Support_Applications__c = rollDice(65) + 35;
            curAttempt.Workflow_Process_Automation__c = rollDice(65) + 35;
            
            Decimal totalScore = ((curAttempt.Configuration_and_Setup__c * .2) + 
                                  (curAttempt.Data_and_Analytics_Management__c * .14) + 
                                  (curAttempt.Object_Manager_and_Lightning_App_Builder__c * .2) + 
                                  (curAttempt.Productivity_and_Collaboration__c * .07) + 
                                  (curAttempt.Sales_and_Marketing_Applications__c * .12) +
                                  (curAttempt.Service_and_Support_Applications__c * .11) +
                                  (curAttempt.Workflow_Process_Automation__c * .16));
            if(totalScore > 64){
                curAttempt.Passed__c = True;
                if(curVoucher.Voucher_Type__c == 'Certification'){
                    curVoucher.Certified__c = True;
                }
            }                
            
            
        } else if (curVoucher.Certification_Type__c == 'PD1' ){
            curAttempt.Salesforce_Fundamentals__c = rollDice(65) + 35;
            curAttempt.Data_Modeling_and_Management__c = rollDice(65) + 35;
            curAttempt.Process_Automation_and_Logic__c = rollDice(65) + 35;
            curAttempt.User_Interface__c = rollDice(65) + 35;
            curAttempt.Testing_Debugging_and_Deployment__c = rollDice(65) + 35;

            Decimal totalScore = ((curAttempt.Salesforce_Fundamentals__c * .07) + 
                                  (curAttempt.Data_Modeling_and_Management__c * .13) + 
                                  (curAttempt.Process_Automation_and_Logic__c * .40) + 
                                  (curAttempt.User_Interface__c * .23) + 
                                  (curAttempt.Testing_Debugging_and_Deployment__c * .17));
            if(totalScore > 64){
                curAttempt.Passed__c = True;
                if(curVoucher.Voucher_Type__c == 'Certification'){
                    curVoucher.Certified__c = True;
                }
            }                
            
        } else if (curVoucher.Certification_Type__c == 'Advanced ADM'){           
            curAttempt.Security_and_Access__c = rollDice(65) + 35;
            curAttempt.Extending_Custom_Objects_and_Application__c = rollDice(65) + 35;
            curAttempt.Auditing_and_Monitoring__c = rollDice(65) + 35;
            curAttempt.Sales_Cloud_Applications__c = rollDice(65) + 35;
            curAttempt.Service_Cloud_Applications__c = rollDice(65) + 35;
            curAttempt.Data_Management__c = rollDice(65) + 35;
            curAttempt.Content_Management__c = rollDice(65) + 35;
            curAttempt.Change_Management__c = rollDice(65) + 35;
            curAttempt.Analytics_Reports_and_Dashboards__c = rollDice(65) + 35;
            curAttempt.Process_Automation__c = rollDice(65) + 35;


            Decimal totalScore = ((curAttempt.Security_and_Access__c * .20) + 
                                  (curAttempt.Extending_Custom_Objects_and_Application__c * .08) + 
                                  (curAttempt.Auditing_and_Monitoring__c * .06) + 
                                  (curAttempt.Sales_Cloud_Applications__c * .10) + 
                                  (curAttempt.Service_Cloud_Applications__c * .10) +
                                  (curAttempt.Data_Management__c * .10) + 
                                  (curAttempt.Content_Management__c * .03) +
                                  (curAttempt.Change_Management__c * .1) +
                                  (curAttempt.Analytics_Reports_and_Dashboards__c * .1) + 
                                  (curAttempt.Process_Automation__c * .13));
            if(totalScore > 64){
                curAttempt.Passed__c = True;
                if(curVoucher.Voucher_Type__c == 'Certification'){
                    curVoucher.Certified__c = True;
                }
            }                
         

        } else if (curVoucher.Certification_Type__c == 'PD2'){
            curAttempt.Salesforce_Fundamentals__c = rollDice(65) + 35;
            curAttempt.Data_Modeling_and_Management__c = rollDice(65) + 35;
            curAttempt.Process_Automation_and_Logic__c = rollDice(65) + 35;
            curAttempt.User_Interface__c = rollDice(65) + 35;
            curAttempt.Performance__c = rollDice(65) + 35;
            curAttempt.Integration__c = rollDice(65) + 35;
            curAttempt.Testing__c = rollDice(65) + 35;
            curAttempt.Debug_and_Deployment_Tools__c = rollDice(65) + 35;
            
            
            Decimal totalScore = ((curAttempt.Salesforce_Fundamentals__c * .05) + 
                                  (curAttempt.Data_Modeling_and_Management__c * .06) + 
                                  (curAttempt.Process_Automation_and_Logic__c * .20) + 
                                  (curAttempt.User_Interface__c * .19) + 
                                  (curAttempt.Performance__c * .16) +
                                  (curAttempt.Integration__c * .15) + 
                                  (curAttempt.Testing__c * .14) +
                                  (curAttempt.Debug_and_Deployment_Tools__c * .05));
            if(totalScore > 64){
                curAttempt.Passed__c = True;
                if(curVoucher.Voucher_Type__c == 'Certification'){
                    curVoucher.Certified__c = True;
                }
            }                

            
        } else if (curVoucher.Certification_Type__c == 'Platform App Builder'){
            curAttempt.Salesforce_Fundamentals__c = rollDice(65) + 35;
            curAttempt.Data_Modeling_and_Management__c = rollDice(65) + 35;
            curAttempt.Business_Logic_and_Process_Automation__c = rollDice(65) + 35;
            curAttempt.User_Interface__c = rollDice(65) + 35;
            curAttempt.App_Deployment__c = rollDice(65) + 35;
            
            
            Decimal totalScore = ((curAttempt.Salesforce_Fundamentals__c * .23) + 
                                  (curAttempt.Data_Modeling_and_Management__c * .22) + 
                                  (curAttempt.Business_Logic_and_Process_Automation__c * .28) + 
                                  (curAttempt.User_Interface__c * .17) + 
                                  (curAttempt.App_Deployment__c * .10));
            if(totalScore > 64){
                curAttempt.Passed__c = True;
                if(curVoucher.Voucher_Type__c == 'Certification'){
                    curVoucher.Certified__c = True;
                }
            }                

            
        } else if (curVoucher.Certification_Type__c == 'JS Developer 1'){
            curAttempt.Variables_Types_and_Collections__c = rollDice(65) + 35;
            curAttempt.Objects_Functions_and_Classes__c = rollDice(65) + 35;
            curAttempt.Browser_and_Events__c = rollDice(65) + 35;
            curAttempt.Debugging_and_Error_Handling__c = rollDice(65) + 35;
            curAttempt.Asynchronous_Programming__c = rollDice(65) + 35;
            curAttempt.Server_Side_JavaScript__c = rollDice(65) + 35;
            curAttempt.Testing__c = rollDice(65) + 35;
            Decimal totalScore = ((curAttempt.Variables_Types_and_Collections__c * .23) + 
                                  (curAttempt.Objects_Functions_and_Classes__c * .25) + 
                                  (curAttempt.Browser_and_Events__c * .17) + 
                                  (curAttempt.Debugging_and_Error_Handling__c * .07) + 
                                  (curAttempt.Asynchronous_Programming__c * .13) +
                                  (curAttempt.Server_Side_JavaScript__c * .08) + 
                                  (curAttempt.Testing__c * .07));
            if(totalScore > 64){
                curAttempt.Passed__c = True;
                if(curVoucher.Voucher_Type__c == 'Certification'){
                    curVoucher.Certified__c = True;
                }
            }                
        }
    }
        
    public void generateAssociates(integer maxAssociates, Cohort__c curCohort){
        String status = '';
        if(curCohort.End_Date__c < Date.today()){
            status = getSelection(new List<String>{'Staging', 'Selected'});
        } else{
            status = 'Training';
        }
        for(integer index = 0; index < maxAssociates; index++){
            Associate__c curAssociate = new Associate__c();
            curAssociate.Current_Status__c = status;
            curAssociate.Employment_Start_Date__c = curCohort.Start_Date__c;
            curAssociate.First_Name__c = getSelection(firstNames);
            curAssociate.Last_Name__c = getSelection(lastNames);
            curAssociate.Email__c = genEmail(curAssociate.First_Name__c + ' ' + curAssociate.Last_Name__c);
            curAssociate.Cohort__c = curCohort.Id;
            associateList.add(curAssociate);
        }
        database.insert(associateList);
    }

    public void generateVouchers(String cert1, String cert2){
        for(Associate__c curAssociate : associateList){
            if(curAssociate.Employment_Start_Date__c < Date.today() - (6 * 7) ){
                // practice certification 1
                Voucher__c curVoucher1 = new Voucher__c();
                curVoucher1.Due_Date__c = curAssociate.Employment_Start_Date__c + (5*7);
                curVoucher1.Expiration_Date__c = Date.today() + 365;
                curVoucher1.Status__c = 'Pending';
                curVoucher1.Voucher_Code__c = 'revature_' + GenGib(22);            
                curVoucher1.Voucher_Type__c = 'Practice';
                curVoucher1.Certification_Type__c = cert1;
                curVoucher1.Associate__c = curAssociate.Id;
                voucherList.add(curVoucher1);
                System.debug(curVoucher1.Voucher_Code__c);
            }
            if(curAssociate.Employment_Start_Date__c < Date.today() - (5 * 7) ){
                // full certification 1
                Voucher__c curVoucher2 = new Voucher__c();
                curVoucher2.Due_Date__c = curAssociate.Employment_Start_Date__c + (6*7);
                curVoucher2.Expiration_Date__c = Date.today() + 365;
                curVoucher2.Status__c = 'Pending';
                curVoucher2.Voucher_Code__c = GenGibNumbers(16);                
                curVoucher2.Voucher_Type__c = 'Certification';
                curVoucher2.Certification_Type__c = cert1;
                curVoucher2.Associate__c = curAssociate.Id;
                voucherList.add(curVoucher2);
                System.debug(curVoucher2.Voucher_Code__c);

            }
            if(curAssociate.Employment_Start_Date__c < Date.today() - (3 * 7) ){
                // practice certification 2
                Voucher__c curVoucher3 = new Voucher__c();
                curVoucher3.Due_Date__c = curAssociate.Employment_Start_Date__c + (8*7);
                curVoucher3.Expiration_Date__c = Date.today() + 365;
                curVoucher3.Status__c = 'Pending';
                curVoucher3.Voucher_Code__c = 'revature_' + GenGib(22);            
                curVoucher3.Voucher_Type__c = 'Practice';
                curVoucher3.Certification_Type__c = cert2;
                curVoucher3.Associate__c = curAssociate.Id;
                voucherList.add(curVoucher3);
                System.debug(curVoucher3.Voucher_Code__c);

            }
            if(curAssociate.Employment_Start_Date__c < Date.today() - (2 * 7) ){
                // full certification 2
                Voucher__c curVoucher4 = new Voucher__c();
                curVoucher4.Due_Date__c = curAssociate.Employment_Start_Date__c + (9*7);
                curVoucher4.Expiration_Date__c = Date.today() + 365;
                curVoucher4.Status__c = 'Pending';
                curVoucher4.Voucher_Code__c = GenGibNumbers(16);                
                curVoucher4.Voucher_Type__c = 'Certification';
                curVoucher4.Certification_Type__c = cert2;
                curVoucher4.Associate__c = curAssociate.Id;
                voucherList.add(curVoucher4);
                System.debug(curVoucher4.Voucher_Code__c);

            }
        }
        database.insert(voucherList);
        
    }

    public Date getDate(integer additionalYear){
        integer year = integer.valueof(2021 + additionalYear);
        integer month = integer.valueof(8 );
        integer day =  integer.valueof(Math.random() * 28 + 1);
        Date myDate = Date.newInstance(year, month ,day );
        return myDate;
    }
    
    public String getPostal(){
        String int1 = String.valueOf(integer.valueof(Math.random() * 10));
        String int2 = String.valueOf(integer.valueof(Math.random() * 10));
        String int3 = String.valueOf(integer.valueof(Math.random() * 10));
        String int4 = String.valueOf(integer.valueof(Math.random() * 10));
        String int5 = String.valueOf(integer.valueof(Math.random() * 10));
        return int1 + int2 + int3 + int4 + int5;
    }
    
    public String genEmail(String name){
        String[] splitStr = name.split(' ');
        String newStr = '';
        for(String s: splitStr){
            newStr = newStr + s;
        }
        return newStr + string.valueof(integer.valueof(math.random() * 2000)) + '@totesfakesite.com';
    }

    public sObject getRandomObject(List<sObject> objList){
        system.debug(objList);
        return objList[Integer.valueOf(Math.random()* objList.size() ) ] ;
    }
    
    public integer rollDice(Integer dSize){
        return integer.valueOf(Math.random() * dSize);
    }
                    
    public void generateContacts(integer maxContacts){
        contactList = new List<Contact>();
        for (integer index = 0; index < maxContacts; index++ ){
            Contact con = new Contact();
            con.FirstName = getSelection( firstNames);
            con.LastName = getSelection(lastNames);
            contactList.add(con);
        }
        database.insert(contactList);
    }       

    public void generateAccounts(integer maxAccounts){
        accountList = new List<Account>();
        for(integer cur = 0; cur < maxAccounts; cur++){
            Account acc = new Account();
            acc.Name = getEsoName(); //GenGibberish(15);
            accountList.add(acc);
        }
        database.insert(accountList);
    }

    public string getSelection(List<String> strList){
        return strList[Integer.valueOf(Math.random()*strList.size() ) ];        
    }
    
    public string getEsoName(){
        return getSelection(Adverbs) + ' ' + getSelection(Adjectives) + ' ' + getSelection(Nouns);
    }
    
    public string GenGib(integer length){
        //selects the length of the name, min 3, max 15
        //integer length = Integer.valueof((Math.random()*maxNameLength))+3;
        //selects if the vowels are the even letters or not
        final string nums = '1234567890abcdefghijklmnopqrstuvwxyz';
        string pokeName = '';

        //loops over the length of the name
        for(integer pos = 0; pos < length; pos++){
            string letter = '';
            //if the pos mod 2 doesn't match even then use a random consanant, else use a random vowel
            integer selection = Integer.valueof((Math.random()*nums.length()));
            letter = nums.substring(selection, selection+1);
            pokeName += letter;
        }
        return pokeName;
    }
    
    public string GenGibNumbers(integer length){
        //selects the length of the name, min 3, max 15
        //integer length = Integer.valueof((Math.random()*maxNameLength))+3;
        //selects if the vowels are the even letters or not
        final string nums = '1234567890';

        integer even = Integer.valueof((Math.random()*2));
        string pokeName = '';

        //loops over the length of the name
        for(integer pos = 0; pos < length; pos++){
            string letter = '';
            //if the pos mod 2 doesn't match even then use a random consanant, else use a random vowel
            integer selection = Integer.valueof((Math.random()*nums.length()));
            letter = nums.substring(selection, selection+1);
            pokeName += letter;
        }
        return pokeName;
    }
    
        
}
