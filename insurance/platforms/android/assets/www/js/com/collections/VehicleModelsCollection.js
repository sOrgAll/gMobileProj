define([ 
		
		"jquery",
		"backbone",
		"com/models/VehicleModel",
		 
	], function( $, Backbone, VehicleModel ) {

    var VehicleModelsCollection = Backbone.Collection.extend( {
    	
        /**
         * The Collection constructor
         * @param models
         * @param options
         */
        initialize: function( models, options ) 
        {
			this.comparator = function(vehicle) {
				return vehicle.get("name");
			};
        },
        
        model: VehicleModel,

    });

    return VehicleModelsCollection;

});



