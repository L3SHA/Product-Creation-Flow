({
    getAllAccounts: function(component, event, helper){
        var action = component.get("c.getAllAccounts");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if(state === "SUCCESS"){
                this.accountsLoaded(component);
                component.set("v.rows", response.getReturnValue());
            }
            else{
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },

    handleSearch: function(component, searchTerm){
        var action = component.get("c.searchAccounts");
        action.setParams({
            searchTerm: searchTerm
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                this.accountsLoaded(component);
                component.set("v.rows", response.getReturnValue());
            }
            else{
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },

    accountsLoaded: function(component) {
        var cols = [
            {
                'label': 'Name',
                'fieldName': 'Name',
                'type': 'text'
            },
            {
                'label': 'Phone',
                'fieldName': 'Phone',
                'type': 'phone'
            },
            {
                'label': 'Website',
                'fieldName': 'Website',
                'type': 'url'
            },
            {
                'label': 'Action',
                'type': 'button',
                'typeAttributes': {
                    'label': 'Choose',
                    'name': 'choose_account'
                }
            }
        ];
        component.set("v.cols", cols);
    },

    nextFlowScreen: function(component, event, helper){
        var actionClicked = event.getSource().getLocalId();
        var navigate = component.get("v.navigateFlow");
        navigate(actionClicked);
    },
    
})