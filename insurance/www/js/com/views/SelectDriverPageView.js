define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/views/PageView",
		"com/utils/DataUtils",
		"com/utils/TemplateUtils",
		"com/utils/Utils",
	
	], function( $, Backbone, Constants, ServiceProxyFactory, PageView, DataUtils, TemplateUtils, Utils) {
		
    // Extends PagView class
    var SelectDriverPageView = PageView.extend({
    	
    	_onSelectToPage: "", //url to redirect the user after a vehicle is selected, default is to go back

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
        	this._onSelectToPage = options && options.data && options.data.onSelectToPage ? options.data.onSelectToPage : "";
        	this._vehicleId = options && options.data && options.data.vehicleId;
        	
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
        	
        	//init vehicle list
        	/*
        	var onVehicle = function(vehicle){
        		
    			var onDriver = function(driver){
            		if(driver){
            			
            			// trigger loading data start
                    	self.$el.trigger("loaddatastarting");
                    	
                		var onLicense = function(license) {
                    		
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

                    		var items = [];
                			var birth = driver.get("birth");//.format("YYYY-MM-DD"); 
                			var lic = license.get("licenseNum");
            				var license = Utils.replaceStringWithStar(0, lic.length - 5, lic);
                			var context = {fname: driver.get("fname"), lname: driver.get("lname"), id: driver.get("driverId"),
                				image: driver.get("image"), license: license, state: driver.get("state"),
                				gender: driver.get("gender"), birth: birth, status: driver.get("status")};
                			items.push(context);
                    		var params = {drivers: items};
                    		TemplateUtils.getTemplate("drivers_list_row", params, onTemplate);
                		};
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
        	ServiceProxyFactory.getServiceProxy().getVehicleById([Number(this._vehicleId)], onVehicle);
        	*/
        	self.$el.trigger("loaddatafinished");
        	
        	//vehicle tap handler
        	this.$el.on("tap", "#driversList .driver", function(){
        		var driverId = Number($(this).attr("data-id"));
        		
        		/*
        		var onDriver = function(driver) 
            	{
        			var accidentReportObject = JSON.parse(DataUtils.getLocalStorageData(Constants.LS_KEY_ACCIDENT_REPORT_OBJECT));
        			var driverInfo = {"driverId": driverId, "driverName": driver.get("fname") + " " + driver.get("lname")};
        			accidentReportObject.driverInfo = driverInfo;
        			DataUtils.setLocalStorageData(Constants.LS_KEY_ACCIDENT_REPORT_OBJECT, JSON.stringify(accidentReportObject));
        			
            		if(self._onSelectToPage) {
            			$.mobile.changePage(self._onSelectToPage);
            		} else {
            			history.back();
            		}
            	};
            	ServiceProxyFactory.getServiceProxy().getDriverById([driverId], onDriver);
            	*/
            	if(self._onSelectToPage) {
        			$.mobile.changePage(self._onSelectToPage);
        		} else {
        			history.back();
        		}
        		
        	});
            return this; 
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
    return SelectDriverPageView;

});