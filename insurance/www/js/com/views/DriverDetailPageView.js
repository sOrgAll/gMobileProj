define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/views/PageView",
		"com/utils/DataUtils",
		"com/utils/Utils",
	
	], function( $, Backbone, Constants, ServiceProxyFactory, PageView, DataUtils, Utils ) {
		
    // Extends PagView class
    var DriverDetailPageView = PageView.extend({
    	
    	//_upadatedMartial: "",
    	
    	events: function events(){
			// view events handlers
			var domTreeEvents = {
				"pageshow": "render",
			};
			return this.onLoadAndHideEvents(domTreeEvents);
		},
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
			//Get the selection from Martial Update Page
			//this._upadatedMartial = options && options.data && options.data.updatedMartial ? options.data.updatedMartial : "";

        	PageView.prototype.initialize.call(this);
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	var self = this;
        	PageView.prototype.render.call(this);
        	
        	// trigger loading data start
        	self.$el.trigger("loaddatastarting");
        	
        	//init driver name
        	var driverId = DataUtils.getLocalStorageData(Constants.LS_KEY_SELECTED_DRIVER_ID);
        	/*
			var onDriver = function(driver) 
        	{
				self.$el.find("#driverName").html(driver.get("fname") + " " + driver.get("lname"));
				self.$el.find("#driverDetail .status").html(driver.get("status"));
				self.$el.find("#driverDetail .gender").html(driver.get("gender"));
				self.$el.find("#driverDetail .birth").html(driver.get("birth"));//.format("MM/DD/YYYY"));
				
				self.$el.find("#driverDetail .marriage").html(driver.get("marriage"));
				var licenseId = Number(driver.get("licenseId"));
	        	DataUtils.setLocalStorageData(Constants.LS_KEY_SELECTED_LICENSE_ID, licenseId);
	        	
	        	// trigger loading data start
	        	self.$el.trigger("loaddatastarting");

	        	// init license number and state
	        	var onLicense = function(license){
	    			var licenseNum = license.get("licenseNum");
	    			var licenseState = license.get("licenseState");
	    			var securetLicenseNum = Utils.replaceStringWithStar(0, licenseNum.length - 5, licenseNum);
					self.$el.find("#driverDetail .license").html(securetLicenseNum);
					self.$el.find("#driverDetail .state").html(licenseState);
					
					// trigger loading data finish
                	self.$el.trigger("loaddatafinished");
	        	};
	        	ServiceProxyFactory.getServiceProxy().getLicenseById([licenseId], onLicense);
	        	
	        	// trigger loading data start
	        	self.$el.trigger("loaddatastarting");

	        	//init vehicle name
	        	var vehicleId = DataUtils.getLocalStorageData(Constants.LS_KEY_SELECTED_VEHICLE_ID);
				var onVehicle = function(vehicle) 
	        	{
					self.$el.find("#vehicleName").html(vehicle.get("name"));
					
					// trigger loading data finish
                	self.$el.trigger("loaddatafinished");
	        	};
	        	ServiceProxyFactory.getServiceProxy().getVehicleById([Number(vehicleId)], onVehicle);
	        	
	        	// trigger loading data finish
            	self.$el.trigger("loaddatafinished");
	        	
        	};
        	ServiceProxyFactory.getServiceProxy().getDriverById([Number(driverId)], onDriver);
        	*/
	        self.$el.trigger("loaddatafinished");
        	
        	self.$el.on("tap", "#selectMartial", function(){
        		var currentMartial = self.$el.find("#driverDetail .marriage").html();
        		var data = {onSelectToPage: "driver_detail.html", currentMartial: currentMartial};
        		$.mobile.changePage("select_martial.html", {data:data, changeHash: false});
        	});
        	
        	self.$el.on("tap", "#changeLicenseInfo", function(){
        		var data = {onSelectToPage: "driver_detail.html"};
        		$.mobile.changePage("change_license_info.html", {data:data, changeHash: false});
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
    return DriverDetailPageView;

});