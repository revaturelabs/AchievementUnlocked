///////////////////////////////
//
// A basic boilerplate email manager
// 
// takes in address, subject, and body and sends an email
// 
// Created on: 8/26/2021
// Last edited: 8/26/2021
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