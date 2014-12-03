define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/views/PageView",
		"com/utils/DataUtils",
	
	], function( $, Backbone, Constants, ServiceProxyFactory, PageView, DataUtils ) {
		
    // Extends PagView class
    var PolicyDetailPageView = PageView.extend({
    	
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
        	var self = this;
			PageView.prototype.initialize.call(this);
			
			//initialize components so it would be ready for the splash page
            /*this.$el.on("pageshow", function(){*/
            /*self.render();*/
            /*});*/
			
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	var self = this;
        	self.$el.trigger("loaddatastarting");
        	PageView.prototype.render.call(this);
        	
        	//init vehicle name
        	var vehicleId = Number(DataUtils.getLocalStorageData(Constants.LS_KEY_SELECTED_VEHICLE_ID));
        	/*
			var onVehicle = function(vehicle) 
        	{
				self.$el.find("#vehicleName").html(vehicle.get("name"));
                self.$el.trigger("loaddatafinished");
        	};
        	ServiceProxyFactory.getServiceProxy().getVehicleById([vehicleId], onVehicle);
        	*/
        	self.$el.trigger("loaddatafinished");
        	
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
    return PolicyDetailPageView;

});
