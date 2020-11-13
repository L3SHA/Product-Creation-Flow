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
        let getProductAction = component.get("c.createProduct");
        getProductAction.setCallback(this, function(response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.Product", response.getReturnValue());
            }
            else{
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(getProductAction);
    },

    initListProducts: function(component) {
        let getListAction = component.get("c.createListProducts");
        getListAction.setCallback(this, function(response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.Products", response.getReturnValue());
            }
            else{
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(getListAction);
    },

    addProduct: function(component) {
        let product = component.get("v.Product");
        let products = component.get("v.Products");
        component.set("v.isEmpty", false);

        let getPriceBookAction = component.get("c.getPricebookEntry");
        getPriceBookAction.setCallback(this, function(response) {
            let state = response.getState();
            if(state === "SUCCESS") {

                product.PricebookEntryId = response.getReturnValue().Id;

                products.push(product);
                component.set("v.Products", products);

                let getProductAction = component.get("c.createProduct");
                getProductAction.setCallback(this, function(response) {
                    let state = response.getState();
                    if(state === "SUCCESS") {
                        component.set("v.Product", response.getReturnValue());
                    }
                });
                $A.enqueueAction(getProductAction);
            }
            else{
                console.log("Failed with state: " + state);
            }
        });

        $A.enqueueAction(getPriceBookAction);
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