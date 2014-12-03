define([ 
		
		"jquery",
		"backbone",
		"com/models/DriverModel",
		 
	], function( $, Backbone, DriverModel ) {

    var DriverModelsCollection = Backbone.Collection.extend( {
    	
        /**
         * The Collection constructor
         * @param models
         * @param options
         */
        initialize: function( models, options ) 
        {
			this.comparator = function(driver) {
				return driver.get("fname");
			};
        },
        
        model: DriverModel,

    });

    return DriverModelsCollection;

});



