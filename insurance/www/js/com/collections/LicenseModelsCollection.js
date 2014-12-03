define([ 
		
		"jquery",
		"backbone",
		"com/models/LicenseModel",
		 
	], function( $, Backbone, LicenseModel ) {

    var LicenseModelsCollection = Backbone.Collection.extend( {
    	
        /**
         * The Collection constructor
         * @param models
         * @param options
         */
        initialize: function( models, options ) 
        {
			this.comparator = function(license) {
				return license.get("licenseNum");
			};
        },
        
        model: LicenseModel,

    });

    return LicenseModelsCollection;

});



