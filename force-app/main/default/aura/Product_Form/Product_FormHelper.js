({
    initColumns: function(component) {
        component.set('v.columns', [
            {label: 'Opportunity Product Name', fieldName: 'Name', type: 'text'},
            {label: 'Unit Price', fieldName: 'UnitPrice', type: 'currency'},
            {label: 'Quantity', fieldName: 'Quantity', type: 'number'},
            {label: 'Action', type: 'button', typeAttributes: { label: 'Delete', name: 'delete'}}
        ]);
    },

    initProduct: function(component) {
        var newProduct = {
            'sobjectType': 'OpportunityLineItem',
            'Name': ''
        };

        component.set("v.Product", newProduct);
    },

    initListProducts: function(component) {
        var newProducts = [];

        component.set("v.Products", newProducts);
    },

    initPriceBookEntries: function(component) {
        let getEntriesAction = component.get("c.getPricebookEntries");
        getEntriesAction.setCallback(this, function(response) {
            let state = response.getState();

            if (state === "SUCCESS") {
                component.set("v.priceEntries", response.getReturnValue());
                component.set("v.PriceBookID", (response.getReturnValue())[0].Id)
            }
        });
        $A.enqueueAction(getEntriesAction); 
    },

    addProduct: function(component) {
        let product = component.get("v.Product");
        let products = component.get("v.Products");
        component.set("v.isEmpty", false);

        const selectedEntry = component.get("v.PriceBookID");
        product.PricebookEntryId = selectedEntry;

        products.push(product);
        this.initProduct(component);
        
    },

    deleteProduct: function(component, event) {
        var action = event.getParam('action');
        var row = event.getParam('row');

        switch(action.name){
            case 'delete': {
                var rows = component.get('v.Products');
                var rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
                component.set('v.Products', rows);

                if(rows.length == 0) {
                    component.set("v.isEmpty", true);  
                }
            }
            break;
        }
    },

})