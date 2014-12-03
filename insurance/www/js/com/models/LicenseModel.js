define([ 
	
		"jquery", 
		"backbone",
		"moment",
		 
	], function( $, Backbone, Moment ) {

    var LicenseModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"licenseId": attributes["licenseId"] || "",
				"expirationYear": attributes["expirationYear"] || "",
				"expirationMonth": attributes["expirationMonth"] || "",
				"expirationDay": attributes["expirationDay"] || "",
				"licenseNum": attributes["licenseNum"] || "",
				"licenseState": attributes["licenseState"] || ""
			});
		}
    });

    return LicenseModel;

});