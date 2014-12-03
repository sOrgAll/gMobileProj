define([ 
		
		"jquery",
		"backbone",
		"com/models/ClaimModel",
		 
	], function( $, Backbone, ClaimModel ) {

    var ClaimModelsCollection = Backbone.Collection.extend( {
    	
        /**
         * The Collection constructor
         * @param models
         * @param options
         */
        initialize: function( models, options ) 
        {
        	this.sortByStatus();
        },
        
        /**
         * sort by status
         * @param none
         */
        sortByStatus: function() 
        {
        	this.comparator = function(claim) {
        		return claim.get("status");
			};
        },
        
        model: ClaimModel,

    });

    return ClaimModelsCollection;

});



