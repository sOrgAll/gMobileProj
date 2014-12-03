define([ 
		
		"jquery",
		"backbone",
		"com/models/PaymentModel",
		 
	], function( $, Backbone, PaymentModel ) {

    var PaymentModelsCollection = Backbone.Collection.extend( {
    	
        /**
         * The Collection constructor
         * @param models
         * @param options
         */
        initialize: function( models, options ) 
        {
        	this.sortById();
        },
        
        /**
         * sort by id
         * @param none
         */
        sortById: function() 
        {
        	this.comparator = function(payment) {
        		return payment.get("paymentId");
			};
			return this;
        },
        
        model: PaymentModel,

    });

    return PaymentModelsCollection;

});



