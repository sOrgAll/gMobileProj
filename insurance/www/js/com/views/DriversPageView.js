define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/views/PageView",
		"com/utils/DataUtils",
		"com/utils/TemplateUtils",
		"com/utils/Utils",
	
	], function( $, Backbone, Constants, ServiceProxyFactory, PageView, DataUtils, TemplateUtils, Utils ) {
		
    // Extends PagView class
    var DriversPageView = PageView.extend({
    	
    	_onSelectToPage: "driver_detail.html", //url to redirect the user after a driver is selected, default is to go back
    	
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
        initialize: function() 
        {
			PageView.prototype.initialize.call(this);
			
        	//reset data memory
			//DataUtils.setLocalStorageData(Constants.LS_KEY_NEW_DRIVER_PHOTO_ADDED, "");
			//DataUtils.setLocalStorageData(Constants.LS_KEY_NEW_DRIVER, "");
        	DataUtils.setLocalStorageData(Constants.LS_KEY_SELECTED_DRIVER_ID, "");
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	PageView.prototype.render.call(this);

        	var self = this;
        	
        	// trigger loading data start
        	self.$el.trigger("loaddatastarting");
        	
        	/*
        	var onVehicle = function(vehicle){
        		
            	var onDriver = function(driver) 
            	{
            		var onLicense = function(license){
                		var onTemplate = function(html) {
                			self.$el.find("#driversList").append(html).listview("refresh");
                			
                			//driver image load error handler
        		        	self.$el.find("#driversList .driver img").error(function(){
        		        		console.log("Driver image load error: " + $(this).attr("src"));
        		        		$(this).attr("src", Constants.USER_DEFAULT_IMAGE); //use default image
        		        	});
        		        	
        		        	// trigger loading data finish
		                	self.$el.trigger("loaddatafinished");
                		};

                		var licenseNum = license.get("licenseNum");
        				var licNum = Utils.replaceStringWithStar(0, licenseNum.length - 5, licenseNum);

                		var items = [];
            			//var birth = driver.get("birth").format("YYYY-MM-DD"); 
            			var context = {fname: driver.get("fname"), lname: driver.get("lname"), id: driver.get("driverId"),
            				image: driver.get("image"), license: licNum, state: driver.get("state"),
            				gender: driver.get("gender"), birth: driver.get("birth"), status: driver.get("status")};
            			items.push(context);
                		var params = {drivers: items};
                		TemplateUtils.getTemplate("drivers_list_row", params, onTemplate);
            		};

            		if(driver){
            			// trigger loading data start
            			self.$el.trigger("loaddatastarting");
            			
            			ServiceProxyFactory.getServiceProxy().getLicenseById([Number(driver.get("licenseId"))], onLicense);
            		}
            		
            		// trigger loading data finish
                	self.$el.trigger("loaddatafinished");
    				
            	};

        		var driverIds = vehicle.get("driverIds");
        		$.each(driverIds, function(){
        			// trigger loading data start
                	self.$el.trigger("loaddatastarting");
                	
           			ServiceProxyFactory.getServiceProxy().getDriverById([this.driverId], onDriver);
        		});
        		
        		// trigger loading data finish
            	self.$el.trigger("loaddatafinished");
        	};
        	
        	var vehicleId = Number(DataUtils.getLocalStorageData(Constants.LS_KEY_SELECTED_VEHICLE_ID));
        	ServiceProxyFactory.getServiceProxy().getVehicleById([vehicleId], onVehicle);
        	*/
        	self.$el.trigger("loaddatafinished");
        	
        	//driver tap handler
        	this.$el.on("click", "#driversList .driver", function(){
        		var id = $(this).attr("data-id");
        		DataUtils.setLocalStorageData(Constants.LS_KEY_SELECTED_DRIVER_ID, id);
        		
        		if(self._onSelectToPage) {
        			$.mobile.changePage(self._onSelectToPage);
        		} else {
        			history.back();
        		}
        		return false;
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
    return DriversPageView;

});