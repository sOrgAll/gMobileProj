define([ 
		
		"jquery", 
		"backbone",
		"com/views/PageView",
		"com/utils/Utils",
        "com/utils/DataUtils",
		"com/utils/TemplateUtils",
        "com/models/Constants",
		"com/models/ServiceProxyFactory",
	
	], function( $, Backbone, PageView, Utils, DataUtils, TemplateUtils, Constants, ServiceProxyFactory ) {
		
    // Extends PagView class
    var PaymentHistoryPageView = PageView.extend({
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
        	var self = this;
			PageView.prototype.initialize.call(this);
			
			self._billingId = options && options.data && options.data.billingId && Number(options.data.billingId);
            self._userId = Number(DataUtils.getLocalStorageData(Constants.LS_KEY_USERID));

            //initialize components so it would be ready for the splash page
			this.$el.on("pageshow", function(){
				self.render();
			});
			
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	var self = this;
        	PageView.prototype.render.call(this);
        	
        	// init payemnts info
        	/*
			var onPaymentsHandler = function(payments){
				var items = [];
				payments.each(function(payment){
					items.push({type: payment.get("paymentType") + " - " +  payment.get("payChannel"),
							amount: Utils.convertNumberToCurrency(payment.get("amount")), date: payment.get("date")});
				});
				var onTemplate = function(html){
					self.$el.find("#payments").append(html).listview("refresh");
				};
				TemplateUtils.getTemplate("payments_list_row", {payments: items}, onTemplate);
			};
			ServiceProxyFactory.getServiceProxy().getPaymentHistoryByBillingId([self._userId, self._billingId],onPaymentsHandler);
			*/
			
            return this; //Maintains chainability
        },
        
         /**
         * do any cleanup, remove window binding here
         * @param none
         */
        dispose: function() {
        	PageView.prototype.dispose.call(this);
        },

    });

    // Returns the View class
    return PaymentHistoryPageView;

});