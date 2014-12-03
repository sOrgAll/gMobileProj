define([ 
	
		"jquery", 
		"backbone",
		"moment",
		"com/models/Constants",
		 
	], function( $, Backbone, Moment, Constants ) {

    var DriverModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"driverId" : attributes["driverId"] || "",
				"fname": attributes["fname"] || "",
				"lname": attributes["lname"] || "",
				"marriage": attributes["marriage"] || "",
				"licenseId": attributes["licenseId"] || "",
				"state": attributes["state"] || "",
				"gender": attributes["gender"] || "",
				"birth": attributes["birth"] || "",
				"image": attributes["image"] || Constants.USER_DEFAULT_IMAGE,
				"status": attributes["status"] || ""
			});
		},
		
		/**
		 * generate a driver id
		 * @param none
		 * @return id, string
		 */
		_getNewDriverId: function()
		{
			var time = String(new Date().getTime());
			var id = time.substring(time.length-7);
			return id;
		},
		
    });

    return DriverModel;

});