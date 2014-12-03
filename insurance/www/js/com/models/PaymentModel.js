define([ 
	
		"jquery", 
		"backbone",
		"moment",
		 
	], function( $, Backbone, Moment ) {

    var PaymentModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"paymentId": attributes["paymentId"] || this._getNewPaymentId(),
				"amount": attributes["amount"] || 0,
				"date": attributes["date"] || "",
				"paymentType": attributes["paymentType"] || "",
				"payChannel": attributes["payChannel"] || "",
				"billingId": attributes["billingId"] || "",
			});
		},
    
	    /**
		 * generate a payment id
		 * @param none
		 * @return id, string
		 */
		_getNewPaymentId: function()
		{
			var time = String(new Date().getTime());
			var id = time.substring(time.length-7);
			return id;
		},
	
    },
    {
        
    	TYPE : 
    	[
    	 "Checking Account",
    	 "Credit Card"
    	 ]
    	
    });

    return PaymentModel;

});