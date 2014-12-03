define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/views/PageView",
		"com/utils/DataUtils",
		"com/utils/TemplateUtils",
	
	], function( $, Backbone, Constants, ServiceProxyFactory, PageView, DataUtils, TemplateUtils ) {
		
    // Extends PagView class
    var SelectVehiclePageView = PageView.extend({
    	
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
			var onData = function(vehicles) 
        	{
        		var onTemplate = function(html) {
        			self.$el.find("#vehiclesList").append(html).listview("refresh");
        			
        			// trigger loading data finish
                	self.$el.trigger("loaddatafinished");
        		};
        		
        		var items = [];
        		vehicles.each(function(vehicle) {
        			var context = {name: vehicle.get("name"), id: vehicle.get("vehicleId"),
        				image: vehicle.get("image"), license: vehicle.get("license"), 
        				vin : vehicle.get("vin")};
        			items.push(context);
        		});
        		var params = {vehicles: items};
        		
        		TemplateUtils.getTemplate("accident_vehicles_list_row", params, onTemplate);
        	};
        	ServiceProxyFactory.getServiceProxy().getVehicleByUser([DataUtils.getLocalStorageData(Constants.LS_KEY_USERID)], onData);
        	*/
        	self.$el.trigger("loaddatafinished");
        	
        	//vehicle tap handler
        	this.$el.on("tap", "#vehiclesList .vehicle", function(){
        		var vehicleId = Number($(this).attr("data-id"));
        		
        		/*
        		var onVehicle = function(vehicle) 
            	{
        			var accidentReportObject = JSON.parse(DataUtils.getLocalStorageData(Constants.LS_KEY_ACCIDENT_REPORT_OBJECT));
        			var vehicleInfo = {"vehicleId": vehicleId, "vehicleName": vehicle.get("name")};
        			accidentReportObject.vehicleInfo = vehicleInfo;
        			DataUtils.setLocalStorageData(Constants.LS_KEY_ACCIDENT_REPORT_OBJECT, JSON.stringify(accidentReportObject));
        			
            		if(self._onSelectToPage) {
            			$.mobile.changePage(self._onSelectToPage);
            		} else {
            			history.back();
            		}
            	};
            	ServiceProxyFactory.getServiceProxy().getVehicleById([vehicleId], onVehicle);
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
    return SelectVehiclePageView;

});