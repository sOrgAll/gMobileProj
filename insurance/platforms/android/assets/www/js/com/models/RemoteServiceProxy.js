define([ 
	
		"jquery", 
		"backbone",
		"moment",
		"com/utils/DataUtils",
		"com/utils/Utils",
		"com/models/ServiceProxy",
		"com/models/Constants",
		"com/models/VehicleModel",
		"com/collections/VehicleModelsCollection",
		"com/models/PolicyModel",
		"com/collections/PolicyModelsCollection",
		"com/models/CoverageModel",
		"com/collections/CoverageModelsCollection",
		"com/models/DriverModel",
		"com/models/LicenseModel",
		"com/models/ClaimModel",
		"com/collections/ClaimModelsCollection",
		"com/models/PaymentModel",
		"com/collections/PaymentModelsCollection",
		"com/models/BillingModel",
		"com/models/MessageModel",
		"com/collections/MessageModelsCollection",
		"com/models/FaqModel",
		"com/collections/FaqModelsCollection",
		
	], function( $, Backbone, Moment, DataUtils, Utils, ServiceProxy, Constants, VehicleModel, VehicleModelsCollection, PolicyModel, PolicyModelsCollection,
			CoverageModel, CoverageModelsCollection, DriverModel, LicenseModel, ClaimModel, ClaimModelsCollection, PaymentModel, PaymentModelsCollection, 
			BillingModel, MessageModel, MessageModelsCollection, FaqModel, FaqModelsCollection )
	{

    var RemoteServiceProxy = ServiceProxy.extend({

        _insuranceBaseUrl: "http://" + Constants.DEFAULT_API_INSURANCE_SERVER_ADDRESS + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT,
        _paymentBaseUrl: "http://" + Constants.DEFAULT_API_PAYMENT_SERVER_ADDRESS + ":" + Constants.DEFAULT_API_PAYMENT_SERVER_PORT,
        _messageBaseUrl: "http://" + Constants.DEFAULT_API_MESSAGE_SERVER_ADDRESS + ":" + Constants.DEFAULT_API_MESSAGE_SERVER_PORT,
        _authBaseUrl: "http://" + Constants.DEFAULT_API_AUTHENTICATION_SERVER_ADDRESS + ":" + Constants.DEFAULT_API_AUTHENTICATION_SERVER_PORT,

    	/**
		 * user login
		 * @param userInfo, user info
		 * @param onLoginHandler, function to handle login result
		 */
		login: function(userInfo, onLoginHandler){
			var onSuccess = function(response){
				console.log("response  = "+JSON.stringify(response));
				DataUtils.setLocalStorageData(Constants.LS_KEY_USERID, response.data.userId);
				//DataUtils.setLocalStorageData(Constants.LS_KEY_TOKEN, response.invocationResult.token);
				//DataUtils.setLocalStorageData(Constants.LS_KEY_SESSION_ID, response.invocationResult.sessionId);
				onLoginHandler(response);
			};
			
			//get user name and password
			var userName = userInfo.username;
			var password = userInfo.password;

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._authBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_AUTHENTICATION_SERVER_PORT;
            }

            var url = this._authBaseUrl + "/auth/users?userName=" + userName + "&password=" + password;
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
		/**
		 * load the user's policy data
		 * @param userInfo, user id
		 * @param onPolicyHandler, function to receive a PolicyModelsCollection
		 */
		getPolicyByUser: function(userInfo, onPolicyHandler){
    		var onSuccess = function(response) {
    			console.log("vehicle = "+JSON.stringify(response.data));

				var arr = [];
				for(var i in response.data) {
					var policy = new PolicyModel(response.data[i]);
					arr.push(policy);
				}

				if(onPolicyHandler){
					onPolicyHandler(new PolicyModelsCollection(arr));
				}
			};
			var userId = userInfo[0];

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/policies?userId=" + userId;
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
    	/**
		 * load the user's vehicle data
		 * @param userInfo, user id
		 * @param onVehicleHandler, function to receive a VehicleModelsCollection
		 */
		getVehicleByUser: function(userInfo, onVehicleHandler){
    		var onSuccess = function(response) {
    			console.log("vehicle = "+JSON.stringify(response.data));
    			
				var arr = [];
				for(var i in response.data) {
					var vehicle = new VehicleModel(response.data[i]);
					arr.push(vehicle); 
				}
				
				if(onVehicleHandler){
					onVehicleHandler(new VehicleModelsCollection(arr));
				}
			};
			var userId = userInfo[0];

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/vehicles?userId=" + userId;
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
		/**
		 * load the driver's vehicle data
		 * @param driverInfo, driver id
		 * @param onVehicleHandler, function to receive a VehicleModelsCollection
		 */
		getVehicleByDriverId: function(driverInfo, onVehicleHandler){
    		var onSuccess = function(response) {
    			console.log("vehicle = "+JSON.stringify(response.data));
    			
				var arr = [];
				for(var i in response.data) {
					var vehicle = new VehicleModel(response.data[i]);
					arr.push(vehicle); 
				}
				
				if(onVehicleHandler){
					onVehicleHandler(new VehicleModelsCollection(arr));
				}
			};
			
			var driverId = driverInfo[0];

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/vehicles?driverId=" + driverId;
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
		/**
		 * load the vehicle data by id
		 * @param vehicleInfo, vehicle id
		 * @param onVehicleHandler, function to receive a VehicleModelsCollection
		 */
		getVehicleById: function(vehicleInfo, onVehicleHandler){
    		var onSuccess = function(response) {
    			console.log("vehicle = "+JSON.stringify(response.data));
    			
				var vehicle = null;
				for(var i in response.data) {
					vehicle = response.data[i];
				}
				
				if(onVehicleHandler){
					onVehicleHandler(new VehicleModel(vehicle));
				}
			};
			
			var vehicleId = vehicleInfo[0];

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/vehicles/" + vehicleId;
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
		/**
		 * load all coverage data
		 * @param 
		 * @param onCoverageHandler, function to receive a CoverageModelsCollection
		 */
		getCoverages: function(onCoverageHandler){
    		var onSuccess = function(response) {
    			console.log("coverage = "+JSON.stringify(response.data));
    			
    			var arr = [];
				for(var i in response.data) {
					var coverage = new CoverageModel(response.data[i]);
					arr.push(coverage); 
				}
				
				if(onCoverageHandler){
					onCoverageHandler(new CoverageModelsCollection(arr));
				}
			};

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/allcoverages";
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
		/**
		 * load coverage data by id
		 * @param coverageInfo, coverage id
		 * @param onCoverageHandler, function to receive a CoverageModel
		 */
		getCoverageById: function(coverageInfo, onCoverageHandler){
    		var onSuccess = function(response) {
    			console.log("coverage = "+JSON.stringify(response.data));
    			
    			var coverage = null;
				for(var i in response.data) {
					coverage = response.data[i];
				}
				
				if(onCoverageHandler){
					onCoverageHandler(new CoverageModel(coverage));
				}
			};
			
			var coverageId = coverageInfo[0];

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/coverages/" + coverageId;
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
		/**
		 * load coverage data by vehicle id
		 * @param vehicleInfo, vehicle id
		 * @param onCoverageHandler, function to receive a CoverageModelsCollection
		 */
		getCoveragesByVehicleId: function(vehicleInfo, onCoverageHandler){
    		var onSuccess = function(response) {
    			console.log("coverage = "+JSON.stringify(response.data));
    			
    			var arr = [];
				for(var i in response.data) {
					var coverage = new CoverageModel(response.data[i]);
					arr.push(coverage); 
				}
				
				if(onCoverageHandler){
					onCoverageHandler(new CoverageModelsCollection(arr));
				}
			};
			
			var vehicleId = vehicleInfo[0];

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/coverages?vehicleId=" + vehicleId;
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
		/**
		 * load driver data by id
		 * @param driverInfo, driver id
		 * @param onDriverHandler, function to receive a DriverModel
		 */
		getDriverById: function(driverInfo, onDriverHandler){
    		var onSuccess = function(response) {
    			console.log("driver = "+JSON.stringify(response.data));
    			
    			var driver = null;
				for(var i in response.data) {
					driver = response.data[i];
				}
				
				if(onDriverHandler){
					onDriverHandler(new DriverModel(driver));
				}
			};
			
			var driverId = driverInfo[0];

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/drivers/" + driverId;
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
		/**
		 * update driver data
		 * @param driverInfo, {driver id, marriage}
		 * @param onDriverHandler, function to handle the driver update result
		 */
		updateDriverInfo: function(driverInfo, onDriverHandler){
    		var onSuccess = function(response) {
    			console.log("update driver response = "+response.statusMessage);
    			
    			if(onDriverHandler){
    				onDriverHandler();
    			}
			};
			
			var driverId = driverInfo.driverId;

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/drivers/" + driverId;
			console.log(url);
			this.invokeService(url, "PUT", driverInfo, onSuccess);
		},
		
		/**
		 * load license data by id
		 * @param licenseInfo, license id
		 * @param onLicenseHandler, function to receive a LicenseModel
		 */
		getLicenseById: function(licenseInfo, onLicenseHandler){
    		var onSuccess = function(response) {
    			console.log("license = "+JSON.stringify(response.data));
    			
    			var license = null;
				for(var i in response.data) {
					license = response.data[i];
				}
				
				if(onLicenseHandler){
					onLicenseHandler(new LicenseModel(license));
				}
			};
			
			var licenseId = licenseInfo[0];

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/licenses/" + licenseId;
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
		/**
		 * update license data
		 * @param licenseInfo, {license id, expiration year, expiration month, expiration day, license num, license state}
		 * @param onLicenseHandler, function to handle the license update result
		 */
		updateLicenseInfo: function(licenseInfo, onLicenseHandler){
    		var onSuccess = function(response) {
    			console.log("update license response = "+response.statusMessage);
    			
    			if(onLicenseHandler){
    				onLicenseHandler();
    			}
			};
			
			var licenseId = licenseInfo.licenseId;

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/licenses/" + licenseId;
			console.log(url);
			this.invokeService(url, "PUT", licenseInfo, onSuccess);
		},
    
	    /**
	     * Get all the faq information 
	     * @param onFaqHandler, Function used to handle the Faq information.
	     */
	    getFaqs: function(onFaqHandler){
	        var onSuccess = function(response) {
	            console.log("faq= "+JSON.stringify(response.data));
	            
	            var arr = [];
	            for(var i in response.data) {
	                var faq = new FaqModel(response.data[i]);
	                arr.push(faq); 
	            }
	            
	            if(onFaqHandler){
	                onFaqHandler(new FaqModelsCollection(arr));
	            }
	        };

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/faqs";
            console.log(url);
	        this.invokeService(url, "GET", {}, onSuccess);
	    },
			
		/**
		 * load claim data by user id
		 * @param claimInfo, user id
		 * @param onClaimHandler, function to receive a ClaimModel
		 */
		getClaimByUserId: function(claimInfo, onClaimHandler){
    		var onSuccess = function(response) {
    			console.log("claim = "+JSON.stringify(response.data));
    			
    			var arr = [];
				for(var i in response.data) {
					var claim = new ClaimModel(response.data[i]);
					arr.push(claim); 
				}
				
				if(onClaimHandler){
					onClaimHandler(new ClaimModelsCollection(arr));
				}
			};
			
			var userId = claimInfo[0];

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/claims?userId=" + userId;
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
		/**
		 * save claim
		 * @param claimInfo, claim entity
		 * @param onClaimHandler, function to receive save claim result
		 */
		saveClaim: function(claimInfo, onClaimHandler){
			var onSuccess = function(response) {
    			console.log("save claim response = "+response.statusMessage);
				
				if(onClaimHandler){
					onClaimHandler();
				}
			};

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/claims";
            console.log(url);
			this.invokeService(url, "POST", claimInfo, onSuccess);
		},
		
		/**
		 * load payment data by billing id
		 * @param billingInfo, billing id
		 * @param onPaymentHandler, function to receive a PaymentModelsCollection
		 */
		getPaymentHistoryByBillingId: function(billingInfo, onPaymentHandler){
    		var onSuccess = function(response) {
    			console.log("payment = "+JSON.stringify(response.data));
    			
    			var arr = [];
				for(var i in response.data) {
					var payment = new PaymentModel(response.data[i]);
					arr.push(payment); 
				}
				
				if(onPaymentHandler){
					onPaymentHandler(new PaymentModelsCollection(arr));
				}
			};
			
			var userId = billingInfo[0];
            var billingId = billingInfo[1];

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._paymentBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_PAYMENT_SERVER_PORT;
            }

            var url = this._paymentBaseUrl + "/payments?userId=" + userId + "&referId=" + billingId;
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
		/**
		 * save payment for make payment
		 * @param paymentInfo, {amount, date, payment type, payment channel, billing id}
		 * @param onPaymentHandler, function to receive save payment result
		 */
		savePayment: function(paymentInfo, onPaymentHandler){
			var onSuccess = function(response) {
    			console.log("save payment response = "+response.statusMessage);
				
				if(onPaymentHandler){
					onPaymentHandler();
				}
			};

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._paymentBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_PAYMENT_SERVER_PORT;
            }

            var url = this._paymentBaseUrl + "/payments?userId=" + paymentInfo.userId;
            console.log(url);
			this.invokeService(url, "POST", paymentInfo, onSuccess);
		},
		
		/**
		 * load billing data by vehicle
		 * @param vehicleInfo, vehicle id
		 * @param onBillingHandler, function to receive a BillingModel
		 */
		getBillingByVehicleId: function(vehicleInfo, onBillingHandler){
    		var onSuccess = function(response) {
    			console.log("billing = "+JSON.stringify(response.data));
    			
    			var billing = null;
				for(var i in response.data) {
					billing = response.data[i];
				}
				
				if(onBillingHandler){
					onBillingHandler(new BillingModel(billing));
				}
			};
			
			var vehicleId = vehicleInfo[0];

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._insuranceBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
            }

            var url = this._insuranceBaseUrl + "/billing?vehicleId="+vehicleId;
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
		/**
		 * load message data by user
		 * @param userInfo, user id
		 * @param onMessageHandler, function to receive a MessageModelsCollection
		 */
		getMessagesByUserId: function(userInfo, onMessageHandler){
    		var onSuccess = function(response) {
    			console.log("message = "+JSON.stringify(response.data));
    			
    			var arr = [];
				for(var i in response.data) {
					var message = new MessageModel(response.data[i]);
					arr.push(message); 
				}
				
				if(onMessageHandler){
					onMessageHandler(new MessageModelsCollection(arr));
				}
			};
			
			var userId = userInfo[0];

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._messageBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_MESSAGE_SERVER_PORT;
            }

            var url = this._messageBaseUrl + "/messages?userId=" + userId;
			console.log(url);
			this.invokeService(url, "GET", {}, onSuccess);
		},
		
		/**
		 * update message data
		 * @param messageInfo, message
		 */
		updateMessage: function(messageInfo){
    		var onSuccess = function(response) {
    			console.log("update message response = "+response.statusMessage);
			};
			
			var messageId = messageInfo.id;

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._messageBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_MESSAGE_SERVER_PORT;
            }

            var url = this._messageBaseUrl + "/messages/" + messageId;
			console.log(url);
			this.invokeService(url, "PUT", messageInfo, onSuccess);
		},
		
		/**
		 * delete message data
		 * @param messageInfo, message id
		 * @param onMessageHandler, function to handle the message delete result
		 */
		deleteMessage: function(messageInfo, onMessageHandler){
    		var onSuccess = function(response) {
    			console.log("delete message response = "+response.statusMessage);
    			
    			if(onMessageHandler){
    				onMessageHandler();
    			}
			};
			
			var messageId = messageInfo[0];

            //refactor base url
            var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
            if(apiServer){
                this._messageBaseUrl = "http://" + apiServer + ":" + Constants.DEFAULT_API_MESSAGE_SERVER_PORT;
            }

            var url = this._messageBaseUrl + "/messages/" + messageId;
			console.log(url);
			this.invokeService(url, "DELETE", {}, onSuccess);
		},
		
		/**
		 * invoke backend service
		 * 
		 * @param url, rest service url to be invoked
		 * @param method, method used for the request, e.g., get, post, delete, etc.
		 * @param params, parameters to be sent with the request
		 * @param onResponseHandler, function to handle response from the server
		 * @param async, if use async onvocation
		 * 
		 */
		invokeService: function(url, method, params, onResponseHandler, async, onErrorHandler){
			console.log("accept = "+Constants.DEFAULT_REST_SERVICE_ACCEPT_HEADER);
			
			if(!Utils.isConnectionAvailable()){
				var self = this;
				$.mobile.loading("hide");
				
				var message = Utils.getTranslation("%common.network.unavailable%");
				var title = Utils.getTranslation("%common.network.unavailable.title%");
				
				var onYes = function(){		
					self.invokeService(url, method, params, onResponseHandler, async, onErrorHandler );
				};
				
				var onNo = function(){	
					if(onErrorHandler){
					   onErrorHandler("noconnection", message);
					};					
				};
				
				Utils.showConfirmationAlert(message, onYes, onNo, title, "Cancel,Retry");
			} else {

                /*
				var baseUrl = null;
				
	        	var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
	        	var apiPort = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_PORT);
	        	
	        	var baseUrl = "";
	        	if (apiServer.indexOf("http://") == 0){
	        		baseUrl = apiServer + ":" + apiPort;	
	        	}
	        	else {
	        		baseUrl = "http://" + apiServer + ":" + apiPort;			
	        	}

				console.log("baseUrl  =  "+baseUrl);
                 */

				$.ajax({
					type: method,
//					url: Constants.DEFAULT_REST_SERVICE_BASE_URL+url,
//					url: baseUrl+url,
                    url: url,
					async: typeof async == "undefined" ? true : async,
							   cache: true,
					dataType: "json",
					data: params,
					beforeSend: function(xhr){						    
						xhr.setRequestHeader("Accept",Constants.DEFAULT_REST_SERVICE_ACCEPT_HEADER);
					},
					success: function(response){
						if(response.statusCode && response.statusCode != "0") {
                            console.log("Response error : " + response.statusMessage);
                            $.mobile.loading("hide");
                            Utils.showAlert(response.statusMessage, null);
                        } else if(response.errorCode && response.errorCode != "0"){
                            console.log("Response error : " + response.statusMessage);
                            $.mobile.loading("hide");
                            Utils.showAlert(response.statusMessage, null);
						} else {
							if(onResponseHandler){
								onResponseHandler(response);
							}
						}
					},
					error: function(response, statusCode){
						$.mobile.loading("hide");
						console.log("Failed to get data ");
						var message = statusCode == "timeout"?"Connection timeout":"System error connecting to backend service. Please try again.";
						if(onErrorHandler){
							onErrorHandler(statusCode , message);
						} else { 		 
							Utils.showAlert(message);
						}
					}
				});
			}
		},
    });

    return RemoteServiceProxy;

});
