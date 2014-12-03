define([ 
    
        "jquery", 
        "backbone",
        "moment",
        "com/utils/DataUtils",
        "com/models/Constants",
        
    ], function( $, Backbone, Moment, DataUtils, Constants, PayeeModel, PayeeModelsCollection, InvestmentModel, InvestmentModelsCollection ){

    var ServiceProxy = Backbone.Model.extend({
    	
    	/**
		 * user login
		 * @param userInfo, user info
		 * @param onLoginHandler, function to handle login result
		 */
		login: function(userInfo, onLoginHandler){
		},
		
		/**
		 * load the user's policy data
		 * @param userInfo, user id
		 * @param onPolicyHandler, function to receive a PolicyModelsCollection
		 */
		getPolicyByUser: function(userInfo, onPolicyHandler){
		},
		
    	/**
		 * load the user's vehicle data
		 * @param userInfo, user id
		 * @param onVehicleHandler, function to receive a VehicleModelsCollection
		 */
		getVehicleByUser: function(userInfo, onVehicleHandler){
		},
		
		/**
		 * load the driver's vehicle data
		 * @param driverInfo, driver id
		 * @param onVehicleHandler, function to receive a VehicleModelsCollection
		 */
		getVehicleByDriverId: function(driverInfo, onVehicleHandler){
		},
		
		/**
		 * load the vehicle data by id
		 * @param vehicleInfo, vehicle id
		 * @param onVehicleHandler, function to receive a VehicleModelsCollection
		 */
		getVehicleById: function(vehicleInfo, onVehicleHandler){
		},
		
		/**
		 * load all coverage data
		 * @param 
		 * @param onCoverageHandler, function to receive a CoverageModelsCollection
		 */
		getCoverages: function(onCoverageHandler){
		},
		
		/**
		 * load coverage data by id
		 * @param coverageInfo, coverage id
		 * @param onCoverageHandler, function to receive a CoverageModelsCollection
		 */
		getCoverageById: function(coverageInfo, onCoverageHandler){
		},
		
		/**
		 * load coverage data by vehicle id
		 * @param vehicleInfo, vehicle id
		 * @param onCoverageHandler, function to receive a CoverageModel
		 */
		getCoveragesByVehicleId: function(vehicleInfo, onCoverageHandler){
		},
		
		/**
		 * load driver data by id
		 * @param driverInfo, driver id
		 * @param onDriverHandler, function to receive a DriverModel
		 */
		getDriverById: function(driverInfo, onDriverHandler){
		},
		
		/**
		 * update driver data
		 * @param driverInfo, {driver id, marriage}
		 * @param onDriverHandler, function to handle the driver update result
		 */
		updateDriverInfo: function(driverInfo, onDriverHandler){
		},
		
		/**
		 * load license data by id
		 * @param licenseInfo, license id
		 * @param onLicenseHandler, function to receive a LicenseModel
		 */
		getLicenseById: function(driverInfo, onLicenseHandler){
		},
		
		/**
		 * update license data
		 * @param licenseInfo, {license id, expiration year, expiration month, expiration day, license num, license state}
		 * @param onLicenseHandler, function to handle the license result
		 */
		updateLicenseInfo: function(licenseInfo, onLicenseHandler){
		},
		
		/**
         * Get all the faq information 
         * @param onFaqHandler, Function used to handle the Faq information.
         */
        getFaqs: function(onFaqHandler){
        },
        
        /**
		 * load claim data by user id
		 * @param claimInfo, user id
		 * @param onClaimHandler, function to receive a ClaimModel
		 */
		getClaimByUserId: function(claimInfo, onClaimHandler){
		},
		
		/**
		 * save claim
		 * @param claimInfo, claim entity
		 * @param onClaimHandler, function to receive save claim result
		 */
		saveClaim: function(claimInfo, onClaimHandler){
		},
		
		/**
		 * load payment data by billing id
		 * @param billingInfo, billing id
		 * @param onPaymentHandler, function to receive a PaymentModelsCollection
		 */
		getPaymentHistoryByBillingId: function(billingInfo, onPaymentHandler){
		},
		
		/**
		 * save payment for make payment
		 * @param paymentInfo, {amount, date, payment type, payment channel, billing id}
		 * @param onPaymentHandler, function to receive save payment result
		 */
		savePayment: function(paymentInfo, onPaymentHandler){
		},
		
		/**
		 * load billing data by vehicle
		 * @param vehicleInfo, vehicle id
		 * @param onBillingHandler, function to receive a BillingModel
		 */
		getBillingByVehicleId: function(vehicleInfo, onBillingHandler){
		},
		
		/**
		 * load message data by user
		 * @param userInfo, user id
		 * @param onMessageHandler, function to receive a MessageModelsCollection
		 */
		getMessagesByUserId: function(userInfo, onMessageHandler){
		},
		
		/**
		 * update message data
		 * @param messageInfo, message
		 */
		updateMessage: function(messageInfo){
		},
		
		/**
		 * delete message data
		 * @param messageInfo, message id
		 * @param onMessageHandler, function to handle the message delete result
		 */
		deleteMessage: function(messageInfo, onMessageHandler){
		},
		
    }, {
        PAYEES_JSON : "../data/payees.json",
        INVESTMENTS_JSON : "../data/investments.json",
        MONEY_PAYEES_JSON : "../data/moneypayees.json",
    });

    return ServiceProxy;

});
