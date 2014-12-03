define([ 
	
		"jquery", 
		"backbone",
		 
	], function( $, Backbone ) {

    var DriverModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"name": attributes["name"] || "",
				"vehicleId": attributes["vehicleId"] || "",
				"image": attributes["image"] || "",
				"license": attributes["license"] || "",
				"driverId" : attributes["driverId"] || this._getNewVehicleId()
			});
		},
		
		/**
		 * generate a driver id
		 * @param none
		 * @return id, string
		 */
		_getNewVehicleId: function()
		{
			var time = String(new Date().getTime());
			var id = time.substring(time.length-7);
			return id;
		},
		
    });

    return DriverModel;

});