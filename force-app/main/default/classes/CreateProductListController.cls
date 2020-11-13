public with sharing class CreateProductListController {
    
    @AuraEnabled
    public static OpportunityLineItem createProduct() {
        return new OpportunityLineItem();
    }

    @AuraEnabled
    public static List<OpportunityLineItem> createListProducts() {
        return new List<OpportunityLineItem>();
    }

    @AuraEnabled
    public static PricebookEntry getPricebookEntry() {
        return [SELECT Id FROM PricebookEntry LIMIT 1];
    }
}