define([ 
	
		"jquery", 
		"backbone",
		"moment",
		"com/models/ServiceProxy",
		"com/utils/DataUtils",
		"com/utils/Utils",
		
	], function( $, Backbone, Moment, ServiceProxy, DataUtils, Utils ){

    var LocalServiceProxy = ServiceProxy.extend({
    	
    	/**
		 * user login
         * @param userInfo, user info, omitted because LocalServiceProxy doesn't use it to access backend service
         * @param onLoginHandler, function to handle the login result
         */
		login: function(userInfo, onLoginHandler){
			if(onLoginHandler){
				onLoginHandler();
			}
		},
		
		/**
		 * load the user's policy data
		 * @param userInfo, user id
		 * @param onPolicyHandler, function to receive a PolicyModelsCollection
		 */
		getPolicyByUser: function(userInfo, onPolicyHandler){
			DataUtils.getUserPolicies(onPolicyHandler);
		},
		
    	/**
		 * load the user's vehicle data
		 * @param userInfo, user id
		 * @param onVehicleHandler, function to receive a VehicleModelsCollection
		 */
		getVehicleByUser: function(userInfo, onVehicleHandler){
			DataUtils.getUserVehicles(onVehicleHandler);
		},

        /**
         * Get all the faq information 
         * @param onFaqHandler, Function used to handle the Faq information.
         */
        getFaqs: function(onFaqHandler){
            DataUtils.getFaqs(onFaqHandler);
        },
		
		/**
		 * load the vehicle data by id
		 * @param vehicleInfo, vehicle id
		 * @param onVehicleHandler, function to receive a VehicleModelsCollection
		 */
		getVehicleById: function(vehicleInfo, onVehicleHandler){
			DataUtils.getVehicleById(vehicleInfo[0], onVehicleHandler);
		},
		
		/**
		 * load all coverage data
		 * @param 
		 * @param onCoverageHandler, function to receive a CoverageModelsCollection
		 */
		getCoverages: function(onCoverageHandler){
			DataUtils.getCoverages(onCoverageHandler);
		},
		
		/**
		 * load coverage data by id
		 * @param coverageInfo, coverage id
		 * @param onCoverageHandler, function to receive a CoverageModelsCollection
		 */
		getCoverageById: function(coverageInfo, onCoverageHandler){
			DataUtils.getCoverageById(coverageInfo[0], onCoverageHandler);
		},
		
		/**
		 * load coverage data by vehicle id
		 * @param vehicleInfo, vehicle id
		 * @param onCoverageHandler, function to receive a CoverageModel
		 */
		getCoveragesByVehicleId: function(vehicleInfo, onCoverageHandler){
			//TODO
		},
		
		/**
		 * load driver data by id
		 * @param driverInfo, driver id
		 * @param onDriverHandler, function to receive a DriverModel
		 */
		getDriverById: function(driverInfo, onDriverHandler){
			DataUtils.getDriverById(driverInfo[0], onDriverHandler);
		},
		
		/**
		 * update driver data
		 * @param driverInfo, {driver id, marriage}
		 * @param onDriverHandler, function to handle the driver update result
		 */
		updateDriverInfo: function(driverInfo, onDriverHandler){
			DataUtils.updateDriverInfo(driverInfo, onDriverHandler);
		},
		
		/**
		 * load license data by id
		 * @param licenseInfo, license id
		 * @param onLicenseHandler, function to receive a LicenseModel
		 */
		getLicenseById: function(driverInfo, onLicenseHandler){
			DataUtils.getLicenseById(driverInfo[0], onLicenseHandler);
		},
		
		/**
		 * update license data
		 * @param licenseInfo, {license id, expiration year, expiration month, expiration day, license num, license state}
		 * @param onLicenseHandler, function to handle the license result
		 */
		updateLicenseInfo: function(licenseInfo, onLicenseHandler){
			DataUtils.updateLicenseInfo(licenseInfo, onLicenseHandler);
		},
		
		/**
		 * load claim data by user id
		 * @param claimInfo, user id
		 * @param onClaimHandler, function to receive a ClaimModel
		 */
		getClaimByUserId: function(claimInfo, onClaimHandler){
			DataUtils.getClaims(onClaimHandler);
		},
		
		/**
		 * save claim
		 * @param claimInfo, claim entity
		 * @param onClaimHandler, function to receive save claim result
		 */
		saveClaim: function(claimInfo, onClaimHandler){
			//TODO
		},
		
		/**
		 * load payment data by billing id
		 * @param billingInfo, billing id
		 * @param onPaymentHandler, function to receive a PaymentModelsCollection
		 */
		getPaymentHistoryByBillingId: function(billingInfo, onPaymentHandler){
			DataUtils.getPaymentByBillingId(billingInfo[0], onPaymentHandler);
		},
		
		/**
		 * save payment for make payment
		 * @param paymentInfo, {amount, date, payment type, payment channel, billing id}
		 * @param onPaymentHandler, function to receive save payment result
		 */
		savePayment: function(paymentInfo, onPaymentHandler){
			DataUtils.savePayment(paymentInfo, onPaymentHandler);
		},
		
		/**
		 * load billing data by vehicle
		 * @param vehicleInfo, vehicle id
		 * @param onBillingHandler, function to receive a BillingModel
		 */
		getBillingByVehicleId: function(vehicleInfo, onBillingHandler){
			DataUtils.getBillingByVehicleId(vehicleInfo[0], onBillingHandler);
		},
		
		/**
		 * load message data by user
		 * @param userInfo, user id
		 * @param onMessageHandler, function to receive a MessageModelsCollection
		 */
		getMessagesByUserId: function(userInfo, onMessageHandler){
			DataUtils.getMessages(onMessageHandler);
		},
		
		/**
		 * load message data by id
		 * @param messageInfo, user id, message id
		 * @param onMessageHandler, function to receive a MessageModel
		 */
		getMessagesById: function(messageInfo, onMessageHandler){
			DataUtils.getMessageById(messageInfo[1], onMessageHandler);
		},
		
		/**
		 * update message data
		 * @param messageInfo, message
		 */
		updateMessage: function(messageInfo){
			DataUtils.setMessage(messageInfo);
		},
		
		/**
		 * delete message data
		 * @param messageInfo, message id
		 * @param onMessageHandler, function to handle the message delete result
		 */
		deleteMessage: function(messageInfo, onMessageHandler){
			DataUtils.delMessage(messageInfo[0], onMessageHandler);
		},
    });
    
    return LocalServiceProxy;

});
