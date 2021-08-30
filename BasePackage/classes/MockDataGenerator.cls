////////////////////////////////
//
// Mock Data generator V4
// 
// for creating random but valid records
// 
//
// created on 8/16/2021
// last edited 8/26/2021
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
    
    public void generate(){
        generateAccounts(numOfAccounts);
        generateContacts(numOfContacts);
        generateAssociates(numOfAssociates);
        generateCohorts(numOfCohorts);
        generateVouchers(numOfVouchers);
        assignVouchers();
        generateAttempts(numOfAttempts);
        
    }

    public void assignVouchers(){
        integer vouchersToAssign = rollDice(voucherList.size());
        for (integer index = 0; index < vouchersToAssign; index++){
            Voucher__c curVoucher = ((Voucher__c) getRandomObject(voucherList));
            while (assignedVouchers.contains(curVoucher)){
            	curVoucher = ((Voucher__c) getRandomObject(voucherList));                
            }
            Associate__c curAssociate = ((Associate__c) getRandomObject(associateList));
            while ( duplicateVoucher(curVoucher, curAssociate) ){
            	curAssociate = ((Associate__c) getRandomObject(associateList));             
            }
            curVoucher.Associate__c = curAssociate.Id;
            assignedVouchers.add(curVoucher);
        }
        database.update(assignedVouchers);
    }
    
    public boolean duplicateVoucher(Voucher__c curVoucher, Associate__c curAssociate){
        for (Voucher__c indexVoucher : assignedVouchers){
            if (indexVoucher.Associate__c == curAssociate.id && indexVoucher.Certification_Type__c == curVoucher.Certification_Type__c && indexVoucher.Voucher_Type__c == curVoucher.Voucher_Type__c ){
                return true;
            }
        }
        return false;
    }
    
    public void generateAttempts(integer maxAttempts){
        for (integer index = 0; index < maxAttempts; index++){
            Attempt__c curAttempt = new Attempt__c();
            Voucher__c curVoucher = ((Voucher__c) getRandomObject(assignedVouchers));
            curAttempt.Voucher__c = curVoucher.id;
            curAttempt.Attempt_Type__c = curVoucher.Voucher_Type__c ;

            if (curVoucher.Certification_Type__c == 'ADM' ){

                curAttempt.Configuration_and_Setup__c = rollDice(100) ;
                curAttempt.Data_and_Analytics_Management__c = rollDice(100);
                curAttempt.Object_Manager_and_Lightning_App_Builder__c = rollDice(100);
                curAttempt.Productivity_and_Collaboration__c = rollDice(100);
                curAttempt.Sales_and_Marketing_Applications__c = rollDice(100);
                curAttempt.Service_and_Support_Applications__c = rollDice(100);
                curAttempt.Workflow_Process_Automation__c = rollDice(100);

            } else if (curVoucher.Certification_Type__c == 'PD1' ){
                curAttempt.Salesforce_Fundamentals__c = rollDice(100);
                curAttempt.Data_Modeling_and_Management__c = rollDice(100);
                curAttempt.Process_Automation_and_Logic__c = rollDice(100);
                curAttempt.User_Interface__c = rollDice(100);
                curAttempt.Testing_Debugging_and_Deployment__c = rollDice(100);
                
            } else if (curVoucher.Certification_Type__c == 'Advanced ADM'){           
                curAttempt.Security_and_Access__c = rollDice(100);
                curAttempt.Extending_Custom_Objects_and_Application__c = rollDice(100);
                curAttempt.Auditing_and_Monitoring__c = rollDice(100);
                curAttempt.Sales_Cloud_Applications__c = rollDice(100);
                curAttempt.Service_Cloud_Applications__c = rollDice(100);
                curAttempt.Data_Management__c = rollDice(100);
                curAttempt.Content_Management__c = rollDice(100);
                curAttempt.Change_Management__c = rollDice(100);
                curAttempt.Analytics_Reports_and_Dashboards__c = rollDice(100);
                curAttempt.Process_Automation__c = rollDice(100);
                
            } else if (curVoucher.Certification_Type__c == 'PD2'){
                curAttempt.Salesforce_Fundamentals__c = rollDice(100);
                curAttempt.Data_Modeling_and_Management__c = rollDice(100);
                curAttempt.Process_Automation_and_Logic__c = rollDice(100);
                curAttempt.User_Interface__c = rollDice(100);
                curAttempt.Performance__c = rollDice(100);
                curAttempt.Integration__c = rollDice(100);
                curAttempt.Testing__c = rollDice(100);
                curAttempt.Debug_and_Deployment_Tools__c = rollDice(100);
                
            } else if (curVoucher.Certification_Type__c == 'Platform App Builder'){
                curAttempt.Salesforce_Fundamentals__c = rollDice(100);
                curAttempt.Data_Modeling_and_Management__c = rollDice(100);
                curAttempt.Business_Logic_and_Process_Automation__c = rollDice(100);
                curAttempt.User_Interface__c = rollDice(100);
                curAttempt.App_Deployment__c = rollDice(100);
                
            } else if (curVoucher.Certification_Type__c == 'JS Developer 1'){
                curAttempt.Variables_Types_and_Collections__c = rollDice(100);
                curAttempt.Objects_Functions_and_Classes__c = rollDice(100);
                curAttempt.Browser_and_Events__c = rollDice(100);
                curAttempt.Debugging_and_Error_Handling__c = rollDice(100);
                curAttempt.Asynchronous_Programming__c = rollDice(100);
                curAttempt.Server_Side_JavaScript__c = rollDice(100);
                curAttempt.Testing__c = rollDice(100);
            }
            attemptList.add(curAttempt);
        }
        Database.insert(attemptList);
    }
    
    public void generateAssociates(integer maxAssociates){
        for(integer index = 0; index < maxAssociates; index++){
            Associate__c curAssociate = new Associate__c();
            curAssociate.Account__c = ((Account) getRandomObject(AccountList)).id;
            curAssociate.Current_Status__c = getSelection( new List<String>{'Training'} ); // , 'Staging', 'Selected', 'Released' 
            curAssociate.Employment_Start_Date__c = Date.today() - 50;
            curAssociate.First_Name__c = getSelection(firstNames);
            curAssociate.Last_Name__c = getSelection(lastNames);
            curAssociate.Email__c = genEmail(curAssociate.First_Name__c + ' ' + curAssociate.Last_Name__c);
            associateList.add(curAssociate);
        }
        database.insert(associateList);
    }
    
    public void generateCohorts(integer maxCohorts){
        for(integer index = 0; index < maxCohorts; index++){
            Cohort__c curCohort = new Cohort__c();
            curCohort.Start_Date__c = Date.today() - 50;
            curCohort.End_Date__c = Date.today() + 20;
            cohortList.add(curCohort);
        }
        database.insert(cohortList);
    }
    
    public void generateVouchers(integer maxVouchers){
        for(integer index = 0; index < maxVouchers; index++){
            Voucher__c curVoucher = new Voucher__c();

            String cert = getSelection(Certifications );
            String vType = getSelection(new List<String>{'Practice', 'Certification'});
            
            curVoucher.Certification_Type__c = cert;

            curVoucher.Due_Date__c = getDate(0);
            curVoucher.Expiration_Date__c = getDate(1);
            curVoucher.Status__c = 'Unused';
            curVoucher.Voucher_Code__c = GenGibNumbers(20);
            curVoucher.Voucher_Type__c = vType;
            voucherList.add(curVoucher);
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
        return 'laughteralan@gmail.com'; //newStr + string.valueof(integer.valueof(math.random() * 2000)) + '@totesfakesite.com';
    }

    public sObject getRandomObject(List<sObject> objList){
        system.debug(objList);
        return objList[Integer.valueOf(Math.random()* objList.size() ) ] ;
    }
    
    public integer rollDice(Integer dSize){
        return integer.valueOf(Math.random() * dSize);
    }
                    
    public void generateContacts(integer maxContacts){
        for (integer index = 0; index < maxContacts; index++ ){
            Contact con = new Contact();
            con.FirstName = getSelection( firstNames);
            con.LastName = getSelection(lastNames);
            contactList.add(con);
        }
        database.insert(contactList);
    }       

    public void generateAccounts(integer maxAccounts){
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
    
    
    public string GenGibNumbers(integer length){
        //selects the length of the name, min 3, max 15
        //integer length = Integer.valueof((Math.random()*maxNameLength))+3;
        //selects if the vowels are the even letters or not
        final string nums = '123456789';
        final string zero = '0';

        integer even = Integer.valueof((Math.random()*2));
        string pokeName = '';

        //loops over the length of the name
        for(integer pos = 0; pos < length; pos++){
            string letter = '';
            //if the pos mod 2 doesn't match even then use a random consanant, else use a random vowel
            if (Math.mod(pos, 2) != even){
                integer selection = Integer.valueof((Math.random()*nums.length()));
                letter = nums.substring(selection, selection+1);
            }else{
                integer selection = Integer.valueof((Math.random()*zero.length()));
                letter = zero.substring(selection, selection+1);                
            }
            pokeName += letter;
        }
        return pokeName;
    }
    
        
}