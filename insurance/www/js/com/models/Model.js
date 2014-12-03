define([ 
	
		"jquery", 
		"backbone",
		"com/models/SettingsModel",
		"com/models/Constants",
		 
	], function( $, Backbone, SettingsModel, Constants ) {

    var Model = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"settings" : new SettingsModel(),
				"lat" : Constants.DEFAULT_USER_LAT,
				"lng" : Constants.DEFAULT_USER_LNG,
			});
			
			this._getUserLocation();
		},
		
		/**
		 * public mehod to refresh user's current location
		 * @param none
		 */
		refreshUserLocation: function() {
			this._getUserLocation();
		},
		
		/**
		 * get the user's current location
		 * @param none
		 */
		_getUserLocation: function()
		{
			var self = this;
			var onSuccess = function(position) {
			    self.set({"lat": position.coords.latitude, "lng": position.coords.longitude});
			    console.log("Model._getUserLocation success: " + position.coords.latitude + ", " + position.coords.longitude);
			};

			function onError(error) {
			    console.log("Model._getUserLocation error: " + error.message);
			};
			
			navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 5000});
			console.log("Getting user's location...");
		},
		
    });

    return Model;

});