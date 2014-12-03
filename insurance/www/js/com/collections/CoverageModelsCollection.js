define([ 
		
		"jquery",
		"backbone",
		"com/models/CoverageModel",
		 
	], function( $, Backbone, CoverageModel ) {

    var CoverageModelsCollection = Backbone.Collection.extend( {
    	
        /**
         * The Collection constructor
         * @param models
         * @param options
         */
        initialize: function( models, options ) 
        {
			this.comparator = function(coverage) {
				return coverage.get("name");
			};
        },
        
        model: CoverageModel,

    });

    return CoverageModelsCollection;

});



