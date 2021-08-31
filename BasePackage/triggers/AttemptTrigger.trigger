trigger AttemptTrigger on Attempt__c (before insert, before update, before delete, after insert, after update, after delete, after undelete) {
    Switch on Trigger.operationType{
        when BEFORE_INSERT{
            
            
        } when BEFORE_UPDATE{
            
        } when BEFORE_DELETE{
            
        } when AFTER_INSERT{
		    AttemptTriggerHandler.setEligibility(trigger.new);
        } when AFTER_UPDATE{
		    AttemptTriggerHandler.setEligibility(trigger.new);
        } when AFTER_DELETE{
		    AttemptTriggerHandler.setEligibility(trigger.old);
        } when AFTER_UNDELETE{
		    AttemptTriggerHandler.setEligibility(trigger.old);
        } when else{
            //you're not suppose to be here
            //no one was suppose to be here
        }
    }
    
}