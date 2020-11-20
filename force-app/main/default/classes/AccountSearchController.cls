public with sharing class AccountSearchController {
    
    @AuraEnabled
    public static List<Account> searchAccounts( String searchTerm ) {
        List<Account> accounts = new List<Account>();
        if ( String.isNotBlank( searchTerm ) ) {
            List<List<SObject>> searchResults = [
                FIND :searchTerm
                RETURNING Account(
                    Id, Name, Phone, Website
                    ORDER BY Name
                )
            ];
            accounts = searchResults[0];
        }
        return accounts;
    }

    @AuraEnabled
    public static List<Account> getAllAccounts(){
        return [SELECT Id, Name, Phone, Website FROM Account ORDER BY Name];
    }
    
}