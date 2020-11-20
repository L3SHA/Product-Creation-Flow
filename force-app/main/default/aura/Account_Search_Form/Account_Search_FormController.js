({
    onInit: function(component, event, helper){
        helper.getAllAccounts(component, event, helper);
    },

    onSearchTermChange: function(component, event, helper) {
        var searchTerm = component.get("v.searchTerm");
        var delayMillis = 500;
        var timeoutId = component.get("v.searchTimeoutId");
        clearTimeout(timeoutId);
        timeoutId = setTimeout($A.getCallback(function() {
            helper.handleSearch(component, searchTerm);
        }), delayMillis);
        component.set("v.searchTimeoutId", timeoutId);
    },

    handleNewAccount: function(component, event, helper){
        component.set("v.isNewAccount", true);
        helper.nextFlowScreen(component, event, helper);
    },

    handleChooseAccount: function(component, event, helper){
        var row = event.getParam('row');
        component.set("v.selectedAccount", row);
        component.set("v.isNewAccount", false);
        helper.nextFlowScreen(component, event, helper);
    },

})