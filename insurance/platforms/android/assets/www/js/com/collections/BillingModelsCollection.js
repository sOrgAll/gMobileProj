define([ 
		
		"jquery",
		"backbone",
		"com/models/DriverModel",
		 
	], function( $, Backbone, BillingModel ) {

    var BillingModelsCollection = Backbone.Collection.extend( {
    	
        /**
         * The Collection constructor
         * @param models
         * @param options
         */
        initialize: function( models, options ) 
        {
			this.comparator = function(billing) {
				return billing.get("billingId");
			};
        },
        
        model: BillingModel,

    });

    return BillingModelsCollection;

});



