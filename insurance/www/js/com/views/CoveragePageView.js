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
    var CoveragePageView = PageView.extend({
    	
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
			PageView.prototype.initialize.call(this, options);
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	var self = this;
        	var el = this.$el;
        	PageView.prototype.render.call(this);
        	
        	// trigger loading data start
        	self.$el.trigger("loaddatastarting");

        	//init vehicle name
        	var vehicleId = Number(DataUtils.getLocalStorageData(Constants.LS_KEY_SELECTED_VEHICLE_ID));
        	/*
			var onVehicle = function(vehicle) 
        	{
				self.$el.find("#vehicleName").html(vehicle.get("name"));
				self.$el.find("#coverageVehicle").prepend(vehicle.get("name"));
				
				var onCoverage = function(coverages){
					// create lists according coverage type
	        		coverages.each(function(coverage) {
	        			// trigger loading data start
	                	self.$el.trigger("loaddatastarting");
	                	
	        			var context = {name: coverage.get("name"), coverageId: coverage.get("coverageId"),
	        					limit: coverage.get("limit")};
		        		var items = [];
	        			items.push(context);
		        		var params = {coverages: items};
		        		TemplateUtils.getTemplate("coverages_list_row", params, function(html){
							var divider = coverage.get("type") == "Vehicle Coverage" ? el.find("#coverageVehicle") : 
								el.find("[data-role=list-divider]:contains(" + coverage.get("type") + ")");
							if(divider){
								divider.after(html);
							}
							el.find("#coverage").listview("refresh");
							
							// trigger loading data finish
		                	self.$el.trigger("loaddatafinished");
		        		});
	        		});
	        		
	        		// trigger loading data finish
                	self.$el.trigger("loaddatafinished");

				};
				// append the coverage list
				ServiceProxyFactory.getServiceProxy().getCoveragesByVehicleId([vehicleId], onCoverage);
        	};
        	ServiceProxyFactory.getServiceProxy().getVehicleById([vehicleId], onVehicle);
        	*/
        	self.$el.trigger("loaddatafinished");
        	
        	//claim tap handler
        	//fix 42734: [IVT]Page jump disorder in Coverage page, tap caused double event
        	this.$el.on("tap", "#coverage .coverageDetailLink", function(){
        		self.$el.off("tap");
        		var data = {coverageId: $(this).attr("data-id")};
				$.mobile.changePage("coverage_detail.html", {data: data});
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
    return CoveragePageView;

});