define([ 
	
		"jquery", 
		"backbone",
		 
	], function( $, Backbone ) {

    var PolicyModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"policyId": attributes["policyId"] || "",
				"policyName": attributes["policyName"] || "",
				"userId": attributes["userId"] || ""
			});
		},
		
		/**
		 * generate a driver id
		 * @param none
		 * @return id, string
		 */
		_getNewPolicyId: function()
		{
			var time = String(new Date().getTime());
			var id = time.substring(time.length-7);
			return id;
		},
		
    });

    return PolicyModel;

});