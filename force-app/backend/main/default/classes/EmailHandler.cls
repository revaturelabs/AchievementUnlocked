public class EmailHandler {
    @future
    Public static void SendEmail(String address, String Voucher, String codeType, Date dueDate, String voucherCode){
        String emailTemplate = 'You have been assigned a {0} {1} Voucher, you have until {2} to make your first attempt. Voucher Code: {3}';
		String dateDue = String.valueOf(dueDate);
        String body = String.format(emailTemplate, new List<String>{Voucher, codeType, dateDue, voucherCode});

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {address};
        mail.setToAddresses(toAddresses);
        mail.setSubject('New Salesforce Voucher Assignment');
        mail.setPlainTextBody(body);
        Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
        
    }
}