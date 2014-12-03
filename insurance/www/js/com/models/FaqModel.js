/* JavaScript content from js/com/models/FaqModel.js in folder common */
define([ 
	
		"jquery", 
		"backbone",
		 
	], function( $, Backbone ) {

    var FaqModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"faqId": attributes["faqId"] || "",
				"question": attributes["question"] || "",
				"answer": attributes["answer"] || ""
			});
		},
	
    });

    return FaqModel;

});