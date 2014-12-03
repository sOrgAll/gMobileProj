define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/models/DriverModel",
		"com/views/PageView",
		"com/utils/TemplateUtils",
		"com/utils/DataUtils",
	
	], function( $, Backbone, Constants, DriverModel, PageView, TemplateUtils, DataUtils ) {
		
    // Extends PagView class
    var DriversContactsPageView = PageView.extend({
    	
    	_contacts: null, //array of contacts objects
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function() 
        {
        	var self = this;
			PageView.prototype.initialize.call(this);
			
			//initialize components so it would be ready for the splash page
			this.$el.on("pageshow", function(){
				DataUtils.setLocalStorageData(Constants.LS_KEY_NEW_DRIVER, "");
				self.render();
			});
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	PageView.prototype.render.call(this);
        	var self = this;
        	
        	var onError = function() {
        		$.mobile.loading("hide");
        		console.error("An error occurred while loading contacts.");
        	};
        	var onContacts = function(contacts) {
        		$.mobile.loading("hide");
        		self._renderContactsList(contacts);
        		
        		console.log("Contacts found:");
        		console.log(contacts);
        	};
			var options = {};
			options.filter = Constants.CONTACTS_FILTER;
			options.multiple=true;
			var fields = ["*"];
			
			if(navigator.contacts) {
				$.mobile.loading("show");
				navigator.contacts.find(fields, onContacts, onError, options);
			}
			else {
				console.log("Contacts not available");
			}
			
			//contact tap handler
			this.$el.on("click", "#contactsList .contact", function(){
				var id = $(this).attr("data-id");
				var contact = self._getContactById(id);
				var json = JSON.stringify( new DriverModel(contact).toJSON() );
				DataUtils.setLocalStorageData(Constants.LS_KEY_NEW_DRIVER, json);
				DataUtils.setLocalStorageData(Constants.LS_KEY_NEW_DRIVER_PHOTO_ADDED, ""); //reset license image
				history.back();
				return false;
			});
        	
            return this; //Maintains chainability
        },
        
        /**
         * render the contacts list
         * @param contacts, array of contacts objects
         */
        _renderContactsList: function(contacts)
        {
        	var self = this;
        	this._contacts = [];
	    	/* iOS example contact return
	    	 * {"id":1,"rawId":null,"displayName":null,"name":{"givenName":"John","formatted":"John Smith","middleName":null,"familyName":"Smith","honorificPrefix":null,"honorificSuffix":null},"nickname":null,"phoneNumbers":null,"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null}
	    	 */
	    	
	    	//sort contacts by name
	    	function sortByName(a, b) {
				var nameA = a.name.formatted.toLowerCase();
	    		var nameB = b.name.formatted.toLowerCase();
	    		if (nameA < nameB) {return -1;}
	    		if (nameA > nameB) {return 1;}
	    		return 0;
			}
	    	contacts.sort(sortByName);
	    	
	        for (var i=0; i<contacts.length; i++) 
	        {
	            var contact = contacts[i];
	            if(contact && contact.name && contact.name.formatted && 
	            		contact.photos && contact.photos[0] && contact.photos[0].value)
	        	{
	        		var num = Math.round(Math.random() * 10000000);
					while(num.length < 7){
						num += "0";
					}
					var license = num + " IL"; 
					var dob = contact.birthday ? contact.birthday : null;
	            	var c = {id: i, fname: contact.name.givenName, lname: contact.name.familyName,
	            		image: contact.photos[0].value, license: license, gender: "n/a", dob: dob};
	            	this._contacts.push(c);
	        	}
	        }
	        
	        var onTemplate = function(html) {
	        	self.$el.find("#contactsList").html(html).listview("refresh");
	        };
	        var params = {contacts: this._contacts};
	        TemplateUtils.getTemplate("contacts_list_row", params, onTemplate);
        },
        
        /**
         * loop through contacts in memory and retrieve a contact object by an id
         * @param id, string
         * @return contact, object
         */
        _getContactById: function(id)
        {
        	var contact;
        	for(var i in this._contacts)
        	{
        		var c = this._contacts[i];
        		if(c.id == id) {
        			contact = c;
        			break;
        		}
        	}
        	return contact;
        },
        
         /**
         * do any cleanup, remove window binding here
         * @param none
         */
        dispose: function() {
        	PageView.prototype.dispose.call(this);
        },

    });

    // Returns the View class
    return DriversContactsPageView;

});