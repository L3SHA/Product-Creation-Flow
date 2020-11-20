({

    initPricebooks : function(component) {
        let getPricebooks = component.get('c.getPricebooks');
        getPricebooks.setCallback(this, function(response) {
            let state = response.getState();

            if (state === "SUCCESS") {
                var pricebooks = response.getReturnValue();

                component.set("v.pricebooks", pricebooks);

                if(pricebooks.length > 0) {
                    console.log(JSON.stringify(pricebooks));
                    this.setPriceBookEntries(component, pricebooks[0]);
                    component.set("v.selectedEntryId", pricebooks[0].PricebookEntries[0].Id);
                }
            }
        });
        $A.enqueueAction(getPricebooks); 
    },

    setPriceBookEntries: function(cmp, pricebook) {
        console.log("getting:" +JSON.stringify(pricebook));

        
        cmp.set("v.relatedEntries", pricebook.PricebookEntries);
    }
})