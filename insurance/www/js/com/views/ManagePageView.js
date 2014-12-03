define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/views/PageView",
		"com/views/SideMenuPanel",
		"com/utils/DataUtils",
		"com/utils/TemplateUtils",
	
	], function( $, Backbone, Constants, ServiceProxyFactory, PageView, SideMenuPanel, DataUtils, TemplateUtils ) {
		
    // Extends PagView class
    var ManagePageView = PageView.extend({

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
			
            DataUtils.setLocalStorageData(Constants.LS_KEY_SELECTED_VEHICLE_ID, "");
			////initialize components so it would be ready for the splash page
			//this.$el.on("pageshow", function(){
				
				////reset data memory
				//DataUtils.setLocalStorageData(Constants.LS_KEY_SELECTED_VEHICLE_ID, "");
				
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
        	
        	/*
        	//init vehicle list
			var onData = function(vehicles) 
        	{
        		var onTemplate = function(html) {
        			self.$el.find("#vehiclesList").append(html).listview("refresh");
        		};
        		
        		var items = [];
        		vehicles.each(function(vehicle) {
        			var context = {name: vehicle.get("name"), id: vehicle.get("vehicleId"),
        				image: vehicle.get("image"), license: vehicle.get("license"), 
        				vin : vehicle.get("vin")};
        			items.push(context);
        		});
        		var params = {vehicles: items};
        		TemplateUtils.getTemplate("vehicles_list_row", params, onTemplate);
                self.$el.trigger("loaddatafinished");
        	};
        	ServiceProxyFactory.getServiceProxy().getVehicleByUser([DataUtils.getLocalStorageData(Constants.LS_KEY_USERID)], onData);
        	*/
        	self.$el.trigger("loaddatafinished");
        	
        	//render the left side menu
			new SideMenuPanel({el: this.$el.find("#menuPanel"), currentPageId: "#manage"});
			
        	//vehicle tap handler
        	this.$el.on("tap", "#vehiclesList .vehicle", function(){
        		var id = $(this).attr("data-id");
        		DataUtils.setLocalStorageData(Constants.LS_KEY_SELECTED_VEHICLE_ID, id);
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
    return ManagePageView;

});
