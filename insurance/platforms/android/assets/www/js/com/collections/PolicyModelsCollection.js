define([ 
		
		"jquery",
		"backbone",
		"com/models/VehicleModel",
		 
	], function( $, Backbone, PolicyModel ) {

    var PolicyModelsCollection = Backbone.Collection.extend( {
    	
        /**
         * The Collection constructor
         * @param models
         * @param options
         */
        initialize: function( models, options ) 
        {
			this.comparator = function(policy) {
				return policy.get("policyName");
			};
        },
        
        model: PolicyModel,

    });

    return PolicyModelsCollection;

});



