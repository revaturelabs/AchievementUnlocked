///////////////////////////////
//
// A basic boilerplate email manager
// 
// takes in address, subject, and body and sends an email
// 
// Created on: 8/26/2021
// Last edited: 8/26/2021
//
// This file is depricated and should be removed
// was not removed due to being included in the base package
// not enough time to test how it's removal might effect the package
// 
///////////////////////////////

public class EmailManager {
    public static void sendMail(String address, String subject, String body) {

        Messaging.SingleEmailMessage newMail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {address};

        newMail.setToAddresses(toAddresses);
        newMail.setSubject(subject);
        newMail.setPlainTextBody(body);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { newMail });
        
    }
}
