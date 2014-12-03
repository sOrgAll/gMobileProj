define([
        
    "jquery",
    "backbone",
    "datepicker",
    "com/views/PageView",
    "com/utils/Utils",
    "com/utils/DataUtils",
    "com/utils/TemplateUtils",
    "com/models/Constants",
    "com/models/ServiceProxyFactory",
    
    ], function( $, Backbone, Datepicker, PageView, Utils, DataUtils, TemplateUtils, Constants, ServiceProxyFactory ){
		
	var MakePaymentPageView = PageView.extend({
		
		// expiration year duration
		_expirationYearDuration: 5,
	
		/**
         * The View Constructor
         * @param el, DOM element of the page
         */
		initialize: function(options){
			
			PageView.prototype.initialize.call(this);
			var self = this;
			
			self._billingId = options && options.data && options.data.billingId && Number(options.data.billingId);
            self._userId = Number(DataUtils.getLocalStorageData(Constants.LS_KEY_USERID));

            // remove the enhance of JQM for the bootstrap datepicker
			$.mobile.ignoreContentEnabled = true;
			
			this.$el.on("pageshow", function(){
				self.render();
			});
		},
		
		/**
         * Renders UI for page
         * @param none
         */
		render: function(){
			
			PageView.prototype.render.call(this);
			var self = this,
				el = this.$el;
			
			// init datepicker
			el.find(".form_datetime").datetimepicker({
				format: "mm/dd/yyyy",
				todayBtn: true,
				autoclose: true,
				pickerPosition: "bottom-left",
				minView: 2,
                startDate: new Date(),
//				format: "HH:ii P",
//				startView: 1,
//				showMeridian: true,
//				minuteStep: 1,
			});
			
			var currentMonth = new Date().getMonth();
			var currentYear = new Date().getFullYear();
			
			// init expiration date select
			for(var i = 0; i < this._expirationYearDuration; i++){
				el.find("#expirationYearList").append("<option>" + (currentYear + i) + "</option>");
			}
			el.find("#expirationYearList").selectmenu( "refresh", true );
			
			// init payemnts info
			/*
			var onPaymentsHandler = function(payments){
				var totalPremium = 0;
				payments.each(function(payment){
					totalPremium += payment.get("amount");
				});
				self.$el.find("#premium").html(Utils.convertNumberToCurrency(totalPremium));
				var lastPayment = payments.sortById().last();
				if(lastPayment){
					self.$el.find("#payment").html(Utils.convertNumberToCurrency(lastPayment.get("amount")) +
							" on " + lastPayment.get("date"));
				}
			};
			ServiceProxyFactory.getServiceProxy().getPaymentHistoryByBillingId([self._userId, self._billingId],onPaymentsHandler);
			*/
			
			// according to Payment Amount and Date content to enable or disable raidos
			var setRadiosState = function(){
                if(el.find("#paymentDate").val() && el.find("#detail").val() && el.find("#detail").val() != 0 ){
					el.find( "[type=radio]" ).checkboxradio( "enable" );
					setPaymentInfo();
				} else{
					el.find( "[type=radio]" ).checkboxradio( "disable" );
					el.find("#accountCardInfo").css("display", "none");
				}
			};
			setRadiosState();
			
			// init payment info and method
			var setPaymentInfo = function(){
				var paymentInfo = DataUtils.getLocalStorageData(Constants.LS_KEY_SAVE_PAYMENT_INFO_AND_METHOD);
				if(paymentInfo){
					self.$el.find("#savePayment").attr("checked", "checked").checkboxradio("refresh");
					paymentInfo = JSON.parse(paymentInfo);
					if(paymentInfo.paymentType == Utils.getTranslation("%makePayment.input.account%")){
						self.$el.find("#account").trigger("click");
						self.$el.find("#card").attr("checked", false).checkboxradio("refresh");
						self.$el.find("#account").attr("checked", true).checkboxradio("refresh");
						self.$el.find("#accountNum").val(paymentInfo.accountNum);
						self.$el.find("#confirmAccountNum").val(paymentInfo.accountNum);
						self.$el.find("#routing").val(paymentInfo.routing);
						self.$el.find("#account").trigger("change");
					} else {
						self.$el.find("#card").trigger("click");
						self.$el.find("#account").attr("checked", false).checkboxradio("refresh");
						self.$el.find("#card").attr("checked", true).checkboxradio("refresh");
						self.$el.find("#cardNum").val(paymentInfo.cardNum);
						self.$el.find("#securityCode").val(paymentInfo.securityCode);
						self.$el.find("#expirationMonthList").val(paymentInfo.expirationMonthList).attr("selected", true).siblings("option").removeAttr("selected");
						self.$el.find("#expirationMonthList").selectmenu("refresh");
						self.$el.find("#expirationYearList").val(paymentInfo.expirationYearList).attr("selected", true).siblings("option").removeAttr("selected");
						self.$el.find("#expirationYearList").selectmenu("refresh");
						self.$el.find("#billingZipCode").val(paymentInfo.billingZipCode);
						self.$el.find("#card").trigger("change");
					}
				}
			};
			
			// init Payment Amount input event handler
			el.on("blur", "#detail", function(){
				if($(this).val().length > 6){
					var onOk = function() {
						el.find("#detail").val("");
					};
					Utils.showAlert('The Payment Amount input is too long.', onOk(), 'Confirmation', 'OK');
				}
				setRadiosState();
				var amount = $(this).val().match(/\S*/);
				$(this).attr("type", "text").val(Utils.convertNumberToCurrency(amount));
			}).on("focus", "#detail", function(){
				$(this).val("").attr("type", "number");
			}).on("change", "#paymentDate", function(){
				setRadiosState();
			}).on("blur", "#accountNum,#confirmAccountNum,#routing,#cardNum,#securityCode,#billingZipCode", function(){
				$(this).attr("type", "text");
			}).on("focus", "#accountNum,#confirmAccountNum,#routing,#cardNum,#securityCode,#billingZipCode", function(){
    			$(this).attr("type", "tel");
            });
			
			// init radio handler
			el.on("change", "#account", function(){
				self.$el.find("#accountCardInfo").css("display", "block").find("#cardDiv").css("display", "none");
				self.$el.find("#accountDiv").css("display", "block");
                self.$el.find("#enrollCard").parent().css("display", "none");
			}).on("change", "#card", function(){
				self.$el.find("#accountCardInfo").css("display", "block").find("#accountDiv").css("display", "none");
				self.$el.find("#cardDiv").css("display", "block");
                self.$el.find("#enrollCard").parent().css("display", "block");
			});
			
			// init button handler
			el.on("tap", "#submit", function(){
				var validatePayment = function(){
					var isPass = false;
					var onOk = function(){
					};

					if(self.$el.find("#cardDiv").css("display") == "block" &&
							self.$el.find("#expirationYear").val() == currentYear && 
							self.$el.find("#expirationMonth").val() < currentMonth){
						Utils.showAlert("Expiration date should be later than this month.", onOk, "Confirmation", "OK");
					} else if (self.$el.find("#account").is(":checked")){
						if(!self.$el.find("#accountNum").val()){
							Utils.showAlert("Account Number is not allowed to be blank.", onOk, "Confirmation", "OK");
						} else if(!self.$el.find("#accountNum").val().match(/^[0-9|-]+[0-9]*$/)){
							Utils.showAlert("Please enter the Account Number with a number or dash.", onOk, "Confirmation", "OK");
						} else if(!self.$el.find("#confirmAccountNum").val()){
							Utils.showAlert("Confirm Account Number is not allowed to be blank.", onOk, "Confirmation", "OK");
						} else if(!self.$el.find("#confirmAccountNum").val().match(/^[0-9|-]+[0-9]*$/)){
							Utils.showAlert("Please enter the Confirm Account Number with a number or dash.", onOk, "Confirmation", "OK");
						} else if(self.$el.find("#accountNum").val() != self.$el.find("#confirmAccountNum").val()){
							Utils.showAlert("Please doublecheck the account number you entered.", onOk, "Confirmation", "OK");
						} else if(!self.$el.find("#routing").val()){
							Utils.showAlert("Routing Number is not allowed to be blank.", onOk, "Confirmation", "OK");
						} else if(isNaN(self.$el.find("#routing").val())){
							Utils.showAlert("Please enter the Routing Number with a number.", onOk, "Confirmation", "OK");
						} else {
							isPass = true;
						}
					} else if(self.$el.find("#card").is(":checked")){
						if(!self.$el.find("#cardNum").val()){
							Utils.showAlert("Card Number is not allowed to be blank.", onOk, "Confirmation", "OK");
						} else if(isNaN(self.$el.find("#cardNum").val())){
							Utils.showAlert("Please enter the Card Number with a number.", onOk, "Confirmation", "OK");
						} else if(!self.$el.find("#securityCode").val()){
							Utils.showAlert("Security Code is not allowed to be blank.", onOk, "Confirmation", "OK");
						} else if(isNaN(self.$el.find("#securityCode").val())){
							Utils.showAlert("Please enter the Security Code with a number.", onOk, "Confirmation", "OK");
						} else if(!self.$el.find("#billingZipCode").val()){
							Utils.showAlert("Billing Zip Code is not allowed to be blank.", onOk, "Confirmation", "OK");
						} else if(isNaN(self.$el.find("#billingZipCode").val())){
							Utils.showAlert("Please enter the Billing Zip Code with a number.", onOk, "Confirmation", "OK");
						} else {
							isPass = true;
						}
					} else {
						isPass = true;
					}
					
					return isPass;
				};
				
				if(validatePayment()){
					//var data = {lastBillAmount : self.$el.find("#detail").val(), lastBillDate : self.$el.find("#paymentDate").val()};
					
					var paymentType = null;
					if(self.$el.find("#account").is(":checked")){
						paymentType = Utils.getTranslation("%makePayment.input.account%");
					} else if (self.$el.find("#card").is(":checked")){
						paymentType =  Utils.getTranslation("%makePayment.input.card%");
					};
					
					if(self.$el.find("#savePayment").is(":checked")){
						// save payment info and method
						var data = {
								"paymentType": paymentType, 
								"accountNum": self.$el.find("#accountNum").val(), 
								"routing": self.$el.find("#routing").val(),
								"cardNum": self.$el.find("#cardNum").val(),
								"securityCode": self.$el.find("#securityCode").val(),
								"expirationMonthList": self.$el.find("#expirationMonthList").val(),
								"expirationYearList": self.$el.find("#expirationYearList").val(),
								"billingZipCode": self.$el.find("#billingZipCode").val()
								};
						DataUtils.setLocalStorageData(Constants.LS_KEY_SAVE_PAYMENT_INFO_AND_METHOD, JSON.stringify(data));
					} else {
						//do not save payment info and method
						DataUtils.setLocalStorageData(Constants.LS_KEY_SAVE_PAYMENT_INFO_AND_METHOD, "");
					}
					
					var payChannel;
					if(self.$el.find("#enrollCard").is(":checked")){
						payChannel = "Auto";
					} else {
						payChannel = "Manual";
					}
					
					var currentDate = new moment();
					var amount = Utils.convertCurrencyToNumber(self.$el.find("#detail").val());
					var data = {
							amount : amount, 
							date : currentDate.format("YYYY-MM-DD"),
							paymentType : paymentType,
							payChannel : payChannel,
                            referId : self._billingId,
                            userId : self._userId
						};
					/*
					var onPaymentSubmitHandler = function(){
						var onOk = function() {};
						Utils.showAlert("Your payment is complete", onOk, "Confirmation", "OK");
						$.mobile.changePage("billing.html", {data : data});
					};
					ServiceProxyFactory.getServiceProxy().savePayment(data, onPaymentSubmitHandler);
					*/
					$.mobile.changePage("billing.html", {data : data});
				}
			}).on("click", "#cancel", function(){
				// fix 42814 [IVT]Page jump disorder when you click Cancel button in Make a Payment page
				// change "tap" to "click"
				$.mobile.changePage("home.html");
			});
		},
		
	});
	
	return MakePaymentPageView;
});
