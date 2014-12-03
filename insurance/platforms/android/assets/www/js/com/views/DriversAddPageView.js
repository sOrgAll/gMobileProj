define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/models/DriverModel",
		"com/views/PageView",
		"com/utils/Utils",
		"com/utils/DataUtils",
	
	], function( $, Backbone, Constants, DriverModel, PageView, Utils, DataUtils ) {
		
    // Extends PagView class
    var DriversAddPageView = PageView.extend({
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
        	var self = this;
			PageView.prototype.initialize.call(this);
			
			this.$el.on("pagebeforeshow", function(){
				var selectedContact = DataUtils.getLocalStorageData(Constants.LS_KEY_NEW_DRIVER) || null;
				var addedLicensePhoto = DataUtils.getLocalStorageData(Constants.LS_KEY_NEW_DRIVER_PHOTO_ADDED) || false;
				self.render(selectedContact, addedLicensePhoto);
			});
        },
        
        /**
         * Renders UI for page
         * @param selectedContact, json object string
         * @param addedLicensePhoto, boolean
         */
        render: function(selectedContact, addedLicensePhoto) 
        {
        	PageView.prototype.render.call(this);
        	var self = this;
        	
        	var newDriver;
        	if(selectedContact) {
        		newDriver = new DriverModel($.parseJSON(selectedContact));
        		this.$el.find("#selectFromContactsBtn").text(newDriver.get("fname") + " " + newDriver.get("lname"));
        	}
        	
        	if(addedLicensePhoto) {
        		this.$el.find("#addLicenseBtn").text(Utils.getTranslation("%label.added%"));
        	}
        	
        	//add new driver handler
        	this.$el.off("click", "#addDriverBtn").on("click", "#addDriverBtn", function(){
        		if(newDriver) 
        		{ 
        			$.mobile.loading("show");
        			var onAdded = function() {
        				$.mobile.loading("hide");
        				history.back();
        			};
        			DataUtils.addNewUserDriver(newDriver, onAdded);
        		} 
        		else {
        			console.log("No driver selected to be added");
        		}
        		return false;
        	});
        	
        	//add license photo handler
        	this.$el.off("click", "#addLicenseBtn").on("click", "#addLicenseBtn", function(){
        		var onImage = function(image) {
        			if(image) {
        				DataUtils.setLocalStorageData(Constants.LS_KEY_NEW_DRIVER_PHOTO_ADDED, image);
        				self.render(selectedContact, image);
        			}
        		};
        		Utils.getImageFromGallery(onImage, $(this));
        	});
        	
            return this; //Maintains chainability
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
    return DriversAddPageView;

});