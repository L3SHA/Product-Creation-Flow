({
    doInit: function(component, event, helper) {
        helper.initColumns(component);
        helper.initContacts(component);
        helper.initRole(component);
        helper.initListRoles(component);
        helper.initPickList(component);
    },

    selectContact: function(component){
        component.set("v.showError", false);
    },
    
    handleSaveRole: function(component, event, helper) {
        var selectedContacts = component.find("contactsTable").getSelectedRows();
        if (selectedContacts.length == 0){
            component.set("v.showError", true);
            component.set("v.message", 'Please, choose a contact!');
            return;
        }
        helper.addRole(component);
    },

    handleRowAction: function (component, event, helper) {
        helper.deleteRole(component, event);
    },

    changePrimaryContact: function(component, event, helper){
        helper.selectPrimaryContact(component, event);
    },
})