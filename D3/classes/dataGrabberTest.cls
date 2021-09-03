@isTest
public class dataGrabberTest {
	
    @isTest(SeeAllData=true)
    public static void getData() {
        //See if getCerts() can retrieve any data
        List<String> myList = new List<String>();
        system.assert(myList.size()==0);
        myList = dataGrabber.getCerts();
        system.assert(myList.size() > 0);
        
        //See if getCohorts() can retrieve any data
        List<String> myOtherList = new List<String>();
        system.assert(myOtherList.size()==0);
        myOtherList = dataGrabber.getCohorts(false);
        system.assert(myOtherList.size() > 0);
    }
    
    @isTest(SeeAllData=true)
    public static void getScores() {
        List<Object> listOfObjects = new List<Object>();
        system.assert(listOfObjects.size() == 0);
        listOfObjects = dataGrabber.getScoresbyCohort('Cohort-0001', 'ADM', false);
        system.assert(listOfObjects.size() > 0);
        listOfObjects = dataGrabber.getScoresbyCohort('Cohort-0001', 'PD1', false);
        system.assert(listOfObjects.size() > 0);
        listOfObjects = dataGrabber.getScoresbyCohort('Cohort-0001', 'Advanced ADM', false);
        system.assert(listOfObjects.size() > 0);
        listOfObjects = dataGrabber.getScoresbyCohort('Cohort-0001', 'PD2', false);
        system.assert(listOfObjects.size() > 0);
        listOfObjects = dataGrabber.getScoresbyCohort('Cohort-0001', 'Platform App Builder', false);
        system.assert(listOfObjects.size() > 0);
        listOfObjects = dataGrabber.getScoresbyCohort('Cohort-0001', 'JS Developer 1', false);
        system.assert(listOfObjects.size() > 0);
        listOfObjects = dataGrabber.getScoresbyCohort('Cohort-0001', 'Defunct Test', true);
        system.assert(listOfObjects.size() > 2);
    }
}