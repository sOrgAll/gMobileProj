define([ 
	
		"jquery", 
		"backbone",
		"moment",
		 
	], function( $, Backbone, Moment ) {

    var ClaimModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"claimId": attributes["claimId"] || "",
				"userId": attributes["userId"] || "",
				"status": attributes["status"] || 0,
				"date": attributes["date"] || "",
				"location": attributes["location"] || "",
				"whether": attributes["whether"] || "",
				"locationPics": attributes["locationPics"] || "",
				"isInjuries": attributes["isInjuries"] || "",
				"vehicleId": attributes["vehicleId"] || "",
				"driverId": attributes["driverId"] || "",
				"damagePics": attributes["damagePics"] || "",
				"isWitness": attributes["isWitness"] || "",
				"witness": attributes["witness"] || "",
				"policeCase": attributes["policeCase"] || ""
			});
		}
	
    },
    {
        
    	STATUS : 
    	{
    		0: "Open",
    		1: "Closed"
		}	
    	
    });

    return ClaimModel;

});