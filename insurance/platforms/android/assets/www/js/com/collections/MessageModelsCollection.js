define([ 
		
		"jquery",
		"backbone",
		"com/models/MessageModel",
		 
	], function( $, Backbone, MessageModel ) {

    var MessageModelsCollection = Backbone.Collection.extend( {
    	
        /**
         * The Collection constructor
         * @param models
         * @param options
         */
        initialize: function( models, options ) 
        {
			this.comparator = function(message) {
				return message.get("title");
			};
        },
        
        model: MessageModel,

    });

    return MessageModelsCollection;

});
