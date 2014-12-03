define([ 
	
		"jquery", 
		"backbone",
		 
	], function( $, Backbone ) {

    var BillingModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"billingId": attributes["billingId"] || "",
				"vehicleId": attributes["vehicleId"] || "",
				"policyBalance": attributes["policyBalance"] || "",
				"nextBillAmount": attributes["nextBillAmount"] || "",
				"nextBillDate" : attributes["nextBillDate"] || ""
			});
		},
		
    });

    return BillingModel;

});