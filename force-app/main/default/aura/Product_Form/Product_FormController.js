({
    doInit: function(component, event, helper) {
        helper.initColumns(component);
        helper.initProduct(component);
        helper.initListProducts(component);
        helper.initPriceBookEntries(component);
    },
    
    handleSaveProduct: function(component, event, helper) {
        const allValid = component.find('field').reduce(function (correctValid, inputCmp) {
            inputCmp.reportValidity();
            return correctValid && inputCmp.checkValidity();
        }, true);

        if(!allValid) {
            return;
        }

        helper.addProduct(component);
    },

    handleRowAction: function (component, event, helper) {
        helper.deleteProduct(component, event);
    },

})