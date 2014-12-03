define([ 
		
		"jquery", 
		"backbone",
		"com/views/PageView",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/utils/DataUtils",
		"com/utils/Utils",
	
	], function( $, Backbone, PageView, Constants, ServiceProxyFactory, DataUtils, Utils ) {
		
    // Extends PagView class
    var BillingPageView = PageView.extend({

    	events: function events(){
			// view events handlers
			var domTreeEvents = {
				"pageshow": "render",
			};
			return this.onLoadAndHideEvents(domTreeEvents);
		},
    	
    	_lastBillAmount: "",
    	_lastBillDate: "",
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
        	var self = this;
        	self._lastBillAmount = options && options.data && options.data.lastBillAmount ? options.data.lastBillAmount : "";
        	self._lastBillDate = options && options.data && options.data.lastBillDate ? options.data.lastBillDate : "";
        	self._vehicleId = Number(DataUtils.getLocalStorageData(Constants.LS_KEY_SELECTED_VEHICLE_ID));
            self._userId = Number(DataUtils.getLocalStorageData(Constants.LS_KEY_USERID));
        	
			PageView.prototype.initialize.call(this);
			
			//initialize components so it would be ready for the splash page
			//this.$el.on("pageshow", function(){
				//self.render();
			//});
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	var self = this,
        		el = this.$el;
        	PageView.prototype.render.call(this);
        	//self.$el.trigger("loaddatastarting");

        	var billDate = moment(self._lastBillDate);
        	
        	if (self._lastBillAmount != "") {        		
        		self.$el.find("#currBillAmount").text(self._lastBillAmount);
        		self.$el.find("#currBillDate").text(billDate.format("MM/DD/YYYY"));
        		self.$el.find("#nextBillAmount").text(self._lastBillAmount);
        		self.$el.find("#nextBillDate").text(billDate.add("months", 1).format("MM/DD/YYYY"));
        	}
        	
        	/*
        	self.$el.trigger("loaddatastarting");
        	var onBilling = function(billing){
        		self._billingId = Number(billing.get("billingId"));
        		self.$el.find("#policyBalance").html(Utils.convertNumberToCurrency(billing.get("policyBalance")));
        		self.$el.find("#nextBillAmount").html(Utils.convertNumberToCurrency(billing.get("nextBillAmount")) + 
        				" on " + billing.get("nextBillDate"));
        		
        		var onPaymentsHandler = function(payments){
	        		var lastPayment = payments.sortById().last();
	        		if(lastPayment){
						self.$el.find("#currBillAmount").html(Utils.convertNumberToCurrency(lastPayment.get("amount")) +
								" on " + lastPayment.get("date"));
	        		}
                    self.$el.trigger("loaddatafinished");
        		};
				ServiceProxyFactory.getServiceProxy().getPaymentHistoryByBillingId([self._userId, self._billingId], onPaymentsHandler);
				
                self.$el.trigger("loaddatafinished");
        	};
        	
        	ServiceProxyFactory.getServiceProxy().getBillingByVehicleId([this._vehicleId], onBilling);
        	*/
        	self.$el.trigger("loaddatafinished");
        	
        	el.on("tap", "#makePayment", function(){
        		$.mobile.changePage("make_payment.html", {data : {billingId : self._billingId}});
        	}).on("tap", "#paymentHistory", function(){
        		$.mobile.changePage("payment_history.html", {data : {billingId : self._billingId}});
        	});
        	
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
    return BillingPageView;

});
