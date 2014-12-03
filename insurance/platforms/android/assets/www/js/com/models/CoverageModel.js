define([ 
	
		"jquery", 
		"backbone",
		 
	], function( $, Backbone ) {

    var CoverageModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"coverageId": attributes["coverageId"] || "",
				"name": attributes["name"] || "",
				"limit": attributes["limit"] || "",
				"type": attributes["type"] || "",
				"definition": attributes["definition"] || "",
				"covered": attributes["covered"] || "",
				"additionOptions": attributes["additionOptions"] || ""
			});
		},
		
    });

    return CoverageModel;

});