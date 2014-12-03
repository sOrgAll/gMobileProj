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
    var VehicleInfoPageView = PageView.extend({
    	
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
        	var self = this;
			PageView.prototype.initialize.call(this, options);
			
			//initialize components so it would be ready for the splash page
			//this.$el.on("pageshow", function(){
				//self.render();
			//});
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	var self = this;
        	PageView.prototype.render.call(this);
        	self.$el.trigger("loaddatastarting");
        	
        	//init vehicle name
        	var vehicleId = Number(DataUtils.getLocalStorageData(Constants.LS_KEY_SELECTED_VEHICLE_ID));
        	/*
			var onVehicle = function(vehicle) 
        	{
				self.$el.find("#vehicleName").html(vehicle.get("name"));
				self.$el.find("#vehicleInfo .lpn").html(vehicle.get("license"));
				self.$el.find("#vehicleInfo .vin").html(vehicle.get("vin"));
                self.$el.trigger("loaddatafinished");
        	};
        	ServiceProxyFactory.getServiceProxy().getVehicleById([vehicleId], onVehicle);
        	*/
        	self.$el.trigger("loaddatafinished");
        	
        	//view id card handler
        	this.$el.on("tap", "#viewIDCardBtn", function(){
        		$.mobile.changePage("idcard.html");
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
    return VehicleInfoPageView;

});
