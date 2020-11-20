({
    init : function(component, event, helper) {
        helper.initPricebooks(component);
    },

    pricebookChange : function(component, event, helper) {
        console.log(JSON.stringify(component.get("v.pricebooks")));
        console.log("var"+ component.get("v.selectedBookId"));
        var bookId = component.get("v.selectedBookId");
        var books = component.get("v.pricebooks");
        var book = books.find(prBook => prBook.Id === bookId);
        helper.setPriceBookEntries(component, book);
        
    }

})