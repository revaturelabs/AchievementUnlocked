////////////////////////////////
//
// Mock Data generator V4
// 
// for creating random but valid records
// note: for testing context use only, not for demonstration purposes
//
// created on 8/16/2021
// last edited 8/25/2021
//
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
    
    public void generate(){
        generateAccounts(numOfAccounts);
        generateContacts(numOfContacts);
        
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
        for (integer index = 0; index < maxContacts; index++ ){
            Contact con = new Contact();
            con.FirstName = getSelection( firstNames);
            con.LastName = getSelection(lastNames);
            contactList.add(con);
        }
        database.insert(contactList);
        system.debug(contactList);
    }	    

    public void generateAccounts(integer maxAccounts){
        for(integer cur = 0; cur < maxAccounts; cur++){
            Account acc = new Account();
            acc.Name = getEsoName(); //GenGibberish(15);
            accountList.add(acc);
        }
        database.insert(accountList);
        system.debug(accountList);
    }

    public string getSelection(List<String> strList){
        return strList[Integer.valueOf(Math.random()*strList.size() ) ];        
    }
    
    public string getEsoName(){
        return getSelection(Adverbs) + ' ' + getSelection(Adjectives) + ' ' + getSelection(Nouns);
    }
    
    public string getFullName(){
        return getSelection(firstNames) + ' ' + getSelection(lastNames);
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
    
	public string GenGibberish(integer length){
		//selects the length of the name, min 3, max 15
        //integer length = Integer.valueof((Math.random()*maxNameLength))+3;
		//selects if the vowels are the even letters or not

        integer even = Integer.valueof((Math.random()*2));
        string pokeName = '';

        //loops over the length of the name
        for(integer pos = 0; pos < length; pos++){
			string letter = '';
			//if the pos mod 2 doesn't match even then use a random consanant, else use a random vowel
            if (Math.mod(pos, 2) != even){
				integer selection = Integer.valueof((Math.random()*cons.length()));
                letter = cons.substring(selection, selection+1);
            }else{
				integer selection = Integer.valueof((Math.random()*vowels.length()));
                letter = vowels.substring(selection, selection+1);                
            }
            pokeName += letter;
        }
        return pokeName;
    }
        
}