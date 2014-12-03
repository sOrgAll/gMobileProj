define([ 
	
		"jquery", 
		"backbone",
		"moment",
		 
	], function( $, Backbone, Moment ) {

    var MessageModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"messageId": attributes["messageId"] || "",
				"subject": attributes["subject"] || "",
				"date": attributes["date"] || "",
				"content": attributes["content"] || "",
				"requiredAction": attributes["requiredAction"] || false,
				"isRead": attributes["isRead"] || false,
				"userId": attributes["userId"] || "",
			});
		},
		
    });

    return MessageModel;

});