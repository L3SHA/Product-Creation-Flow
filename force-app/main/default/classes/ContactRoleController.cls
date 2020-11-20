public with sharing class ContactRoleController {
    @AuraEnabled
    public static OpportunityContactRole createRole() {
        return new OpportunityContactRole();
    }

    @AuraEnabled
    public static List<OpportunityContactRole> createListRoles() {
        return new List<OpportunityContactRole>();
    }

    @AuraEnabled
    public static List<Contact> getAllContacts(String accountId){
        return [SELECT Id, Name, AccountId FROM Contact WHERE AccountId = :accountId ORDER BY Name ASC];
    }

    @AuraEnabled
    public static List<String> getPickList(){
        List<String> optionList = new List<String>();
        
        Schema.DescribeFieldResult fieldRes = OpportunityContactRole.Role.getDescribe();
        List<Schema.PicklistEntry> entries = fieldRes.getPicklistValues();
        
        for(Schema.PicklistEntry en: entries){
            optionList.add(en.getLabel());
        }
		        
        return optionList;   
    }
}