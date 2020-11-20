public with sharing class OpportunityController {
    @AuraEnabled
    public static List<PricebookEntry> getPricebookEntries(Id pricebookId){
        Pricebook2 pricebook = [SELECT Id FROM Pricebook2 WHERE Id = :pricebookId];
        
        return [SELECT Id, Name FROM PricebookEntry WHERE Pricebook2Id = :pricebook.Id];
    }

    @AuraEnabled
    public static List<Pricebook2> getPricebooks(){
        return [SELECT Name, (SELECT Name FROM PricebookEntries) FROM Pricebook2];
    }
}