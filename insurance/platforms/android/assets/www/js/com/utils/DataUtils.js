define([
		
		"jquery", 
		"backbone",
		"cftoaster",
		"com/models/Constants",
		"com/models/DriverModel",
		"com/models/ClaimModel",
		"com/collections/DriverModelsCollection",
		"com/models/VehicleModel",
		"com/collections/VehicleModelsCollection",
		"com/collections/ClaimModelsCollection",
		"com/models/MessageModel",
		"com/collections/MessageModelsCollection",
		"com/models/PaymentModel",
		"com/collections/PaymentModelsCollection",
		"com/models/LicenseModel",
		"com/collections/LicenseModelsCollection",
		"com/models/PolicyModel",
		"com/collections/PolicyModelsCollection",
		"com/models/CoverageModel",
		"com/collections/CoverageModelsCollection",
		"com/models/FaqModel",
		"com/collections/FaqModelsCollection",
		"com/models/BillingModel",
		"com/collections/BillingModelsCollection",
		
	], function($, Backbone, CFToaster, Constants, DriverModel, ClaimModel, DriverModelsCollection, VehicleModel, VehicleModelsCollection, 
			ClaimModelsCollection, MessageModel, MessageModelsCollection, PaymentModel, PaymentModelsCollection, LicenseModel, LicenseModelsCollection,
			PolicyModel, PolicyModelsCollection, CoverageModel, CoverageModelsCollection, FaqModel, FaqModelsCollection, BillingModel, BillingModelsCollection) 
	{
	var DataUtils = Backbone.Model.extend({},
	
	{
		
		LOCALIZATION_JSON : "../data/localizations/mapping.json",
		DRIVERS_JSON : "../data/test/drivers.json",
		POLICIES_JSON : "../data/test/policies.json",
		VEHICLES_JSON : "../data/test/vehicles.json",
		LICENSES_JSON : "../data/test/licenses.json",
		CLAIMS_JSON : "../data/test/claims.json",
		MESSAGES_JSON : "../data/test/messages.json",
		BILLING_JSON : "../data/test/billing.json",
		PAYMENTS_JSON : "../data/test/payments.json",
		COVERAGES_JSON : "../data/test/coverages.json",
		FAQS_JSON : "../data/test/faqs.json",
		
		/**
		 * get data with ajax request
		 * only go to adapters if not in offline mode
		 * @param params, object
		 * @param onResultHandler, function to receive the data
		 * @param onError, function
		 * @param async, boolean [optional]
		 */
		_getData: function(params, onResultHandler, onError, async)
		{
			var model = MobileRouter.getModel();
			var settings = (model && model.get("settings")) || null;
			var offlineMode = settings ? settings.get(Constants.LS_KEY_OFFLINE_MODE) : true;
			
			if(params.invocationData && !offlineMode)
			{
				var onSuccess = function(response) 
				{
					var data = response.invocationResult;
					if(onResultHandler) {
						onResultHandler(data);
					}
				};
				
				var onFail = function(response) 
				{
					if(onError) {
						onError(response);
					}
				};
				
				WL.Client.invokeProcedure(params.invocationData, {
					onSuccess : onSuccess,
					onFailure : onFail
				});
				console.log("Invoking Adapter procedure: " + params.invocationData.procedure);
			}
			else
			{
				$.ajax({
					type: "GET",
					url: params.file,
					async: typeof async == "undefined" ? true : async,
					cache: true,
					dataType: "json",
					success: function(data){
						if(onResultHandler){
							onResultHandler(data);
						}
					},
					error: function(){
						if(onError) {
							onError();
						}
					}
				});	
				console.log("Loading local resource: " + params.file);
			}
		},
		
		/**
		 * load the json data and store in memory
		 * @param file, string path to the file
		 * @param onResultHandler, function to receive the data
		 * @param async, boolean [optional]
		 */
		getJSONData: function(file, onResultHandler, async)
		{
			$.ajax({
				type: "GET",
				url: file,
				async: typeof async == "undefined" ? true : async,
				cache: true,
				dataType: "json",
				success: function(data){
					if(onResultHandler){
						onResultHandler(data);
					}
				},
				error: function(data){
					console.log("Failed to get json data ");
				}
			});	
		},
		
		/**
		 * show a toast message and hide the loading spinner
		 * default error handler for an adapter error
		 * @param response, json
		 */
		_onAdapterError: function(response)
		{
			//default error response
			$.mobile.loading("hide");
			var msg = "An error had occurred: " + (response && response.errorMsg ? response.errorMsg : "") + ". Please try again.";
			$("body").cftoaster({content: msg});
		},
		
		/**
		 * handle the coverage data
		 * @param coverageId, string
		 * @param onCoveragesHandler, function to receive a CoverageModel
		 */
		getCoverageById: function(coverageId, onCoveragesHandler){
			var onData = function(coverages) 
			{
				var coverage = coverages.findWhere({coverageId: coverageId});
				if(onCoveragesHandler) {
					onCoveragesHandler(coverage);
				}
			};
			DataUtils.getCoverages(onData);
		},
		
		/**
		 * handle the coverages data
		 * @param coverageId, string
		 * @param onCoverageHandler, function to receive a CoverageModelsCollection
		 */
		getCoverages: function(onCoveragesHandler){
			var onCoverages = function(data) {
				var arr = [];
				for(var i in data) {
					var coverage = new CoverageModel(data[i]);
					arr.push(coverage); 
				}
				
				var coverages = new CoverageModelsCollection(arr);				
				if(onCoveragesHandler) {
					onCoveragesHandler(coverages);
				}
			};
			var params = {file: DataUtils.COVERAGES_JSON};
			DataUtils._getData(params, onCoverages);
		},
		
		/**
		 * get a billing model by a vehicle id
		 * @param vehicleId, string
		 * @param onBilling, function to receive a BillingModel
		 */
		getBillingByVehicleId: function(vehicleId, onBilling)
		{
			var onSuccess = function(data) 
			{
				var arr = [];
				for(var i in data) {
					var billing = new BillingModel(data[i]);
					arr.push(billing); 
				}
				
				var billings = new BillingModelsCollection(arr);
				
				var billing = billings.findWhere({vehicleId: vehicleId});
				
				if(onBilling) {
					onBilling(billing);
				}
			};
			var params = {file: DataUtils.BILLING_JSON};//, invocationData: invocationData};
			DataUtils._getData(params, onSuccess);
		},
		
		/**
		 * load the payments data
		 * @param onPaymentsHandler, function to receive a PaymentModelsCollection
		 */
		getPayments: function(onPaymentsHandler){
			var onPayments = function(data) {
				var arr = [];
				for(var i in data) {
					var payment = new PaymentModel(data[i]);
					arr.push(payment); 
				}
				
				var payments = new PaymentModelsCollection(arr);
				
				//include new payments that were added locally
				var newPaymentsJSON = DataUtils.getLocalStorageData(Constants.LS_KEY_ADDED_PAYMENTS);
				if(newPaymentsJSON) {
					payments.add($.parseJSON(newPaymentsJSON));
				}
				
				if(onPaymentsHandler) {
					onPaymentsHandler(payments);
				}
			};
			var params = {file: DataUtils.PAYMENTS_JSON};
			DataUtils._getData(params, onPayments);
		},
		
		/**
		 * load the payment data by billing id
		 * @param onPaymentsHandler, function to receive a PaymentModel
		 */
		getPaymentByBillingId: function(billingId, onPaymentsHandler){
			var onData = function(payments) 
			{
				var billingPayments = payments.where({billingId: billingId});
				if(onPaymentsHandler) {
					onPaymentsHandler(new PaymentModelsCollection(billingPayments));
				}
			};
			DataUtils.getPayments(onData);
		},

		/**
		 * load the payments data
		 * @param onPaymentsHandler, function to receive a PaymentModelsCollection
		 */
		getLastPayment: function(onLastPaymentHandler){
			var onPayments = function(payments) {
				if(onLastPaymentHandler) {
					onPaymentsHandler(payments.sortById().last());
				}
			};
			DataUtils.getPayments(onPayments);
		},
		
		/**
		 * load the payments data
		 * @param onPaymentsHandler, function to receive a PaymentModelsCollection
		 */
		savePayment: function(payment, onPaymentHandler){
			var newPaymentsJSON = DataUtils.getLocalStorageData(Constants.LS_KEY_ADDED_PAYMENTS);
			var newPayments = newPaymentsJSON ? new PaymentModelsCollection($.parseJSON(newPaymentsJSON)) : new PaymentModelsCollection();
			var dup = newPayments.findWhere(newPaymentsJSON);
			if(!dup) {
				newPayments.add(payment);
				DataUtils.setLocalStorageData( Constants.LS_KEY_ADDED_PAYMENTS, JSON.stringify(newPayments.toJSON()) );
			} 
			else {
				console.log("Duplicate driver, no new driver added.");
			}
			
			if(onPaymentHandler) {
				onPaymentHandler();
			}
		},
		
		/**
		 * load the user's messages data
		 * @param onMessagesHandler, function to receive a messages array
		 */
		getMessages: function(onMessagesHandler){
			
			var messages = JSON.parse(DataUtils.getSessionStorageData(Constants.LS_KEY_MESSAGES));
			var arr = [];
			for(var i in messages) {
				var message = new MessageModel(messages[i]);
				arr.push(message); 
			}
			var messages = new MessageModelsCollection(arr);
			
			if(onMessagesHandler){
				onMessagesHandler(messages);
			}
			
		},
		
		/**
		 * set the user's messages data to session storage
		 * @param messages, messages array
		 */
		setMessages: function(messages){
			DataUtils.setSessionStorageData(Constants.LS_KEY_MESSAGES, JSON.stringify(messages));
		},
		
		/**
		 * set the user's messages data to session storage
		 * @param message
		 */
		setMessage: function(message){
			DataUtils.getMessages(function(messages) {
				var updateMsgs = new MessageModelsCollection();
				messages.each(function(msg){
					if(msg.get("messageId") == message.messageId){
						updateMsgs.add(new MessageModel(message));
					} else {
						updateMsgs.add(msg);
					}
				});
				
				DataUtils.setSessionStorageData(Constants.LS_KEY_MESSAGES, JSON.stringify(updateMsgs));
			});
		},
		
		/**
		 * delete the user's messages data to session storage
		 * @param messageId
		 */
		delMessage: function(messageId, onMessageHandler){
			DataUtils.getMessages(function(messages){
				var updateMsgs = new MessageModelsCollection();
				messages.each(function(msg){
					if(msg.get("messageId") == messageId){
						//remove from messages, don't need update
					} else {
						updateMsgs.add(msg);
					}
				});
				
				DataUtils.setSessionStorageData(Constants.LS_KEY_MESSAGES, JSON.stringify(updateMsgs));
				
				if(onMessageHandler){
					onMessageHandler();
				}
    		});
		},
		
		/**
		 * count the user's unread messages
		 * @param onHandler, function to handler the number
		 */
		countUnreadMessages: function(messages, onHandler){
			var newMessageSum = 0;
    		messages.each(function(message){
    			newMessageSum += message.get("isRead") ? 0 : 1;
    		});
    		if(onHandler){
    			onHandler(newMessageSum);
    		}
    		return newMessageSum;
		},
		
		/**
		 * Load messages from json to storage 
		 */
		loadMessages: function(){
			DataUtils._getData({file: DataUtils.MESSAGES_JSON}, function(messages){
				DataUtils.setSessionStorageData(Constants.LS_KEY_MESSAGES, JSON.stringify(messages));
			});
		},
		
		/**
		 * load the user's message data
		 * @param onMessageHandler, function to receive a MessageModel
		 */
		getMessageById: function(messageId, onMessageHandler){
			DataUtils.getMessages(function(messages) {
				var message = messages.findWhere({messageId : messageId});
				if(onMessageHandler) {
					onMessageHandler(message);
				}
				return false;
			});
		},
		
		/**
		 * load the user's drivers data
		 * @param onDriversHandler, function to receive a DriverModelsCollection
		 */
		getUserDrivers: function(onDriversHandler)
		{
			var onSuccess = function(response) 
			{
				console.log("DataUtils.getPolicyDrivers success:");
				console.log(response);
				
				var data = response.drivers;
				var arr = [];
				for(var i in data) {
					var driver = new DriverModel(data[i]);
					arr.push(driver); 
				}
				var drivers = new DriverModelsCollection(arr);	
				
				/**
				 * TODO: include new drivers that were added locally
				 * this would not be needed for production because all drivers should be loaded in from a service request
				 */
				var newDriversJSON = DataUtils.getLocalStorageData(Constants.LS_KEY_ADDED_DRIVERS);
				if(newDriversJSON) {
					drivers.add($.parseJSON(newDriversJSON));
				}
						
				if(onDriversHandler){
					onDriversHandler(drivers);
				}
			};
			
			var onFail = function(response) 
			{
				console.log("DataUtils.getPolicyDrivers failed:");
				console.log(response);
				
				DataUtils._onAdapterError(response);
			};
			
			var invocationData = {
				adapter : Constants.ADAPTER_NAME,
				procedure : 'getPolicyDrivers'/*, 
				parameters : [Constants.STORE_ID, 0, 20]*/ 
			};
			
			var params = {file: DataUtils.DRIVERS_JSON};//, invocationData: invocationData};
			DataUtils._getData(params, onSuccess, onFail);
		},
		

		/**
		 * get a driver model by a id
		 * @param driverId, string
		 * @param onDriver, function to receive a DriverModel
		 */
		getDriverById: function(driverId, onDriver)
		{
			var onData = function(drivers) 
			{
				var driver = drivers.findWhere({driverId: driverId});
				if(onDriver) {
					onDriver(driver);
				}
			};
			DataUtils.getUserDrivers(onData);
		},
		
		/**
		 * update driver model
		 * @param driverInfo
		 * @param onDriver, function to receive a update response
		 */
		updateDriverInfo: function(driverInfo, onDriver)
		{
			if(onDriver){
				onDriver();
			}
		},
		
		/**
		 * add a new driver
		 * TODO: in production this would be a request to a service
		 * @param driver, DriverModel
		 * @param onAdded, function
		 */
		addNewUserDriver: function(driver, onAdded)
		{
			var newDriversJSON = DataUtils.getLocalStorageData(Constants.LS_KEY_ADDED_DRIVERS);
			var newDrivers = newDriversJSON ? new DriverModelsCollection($.parseJSON(newDriversJSON)) : new DriverModelsCollection();
			var dup = newDrivers.findWhere(newDriversJSON);
			if(!dup) {
				newDrivers.add(driver);
				DataUtils.setLocalStorageData( Constants.LS_KEY_ADDED_DRIVERS, JSON.stringify(newDrivers.toJSON()) );
			} 
			else {
				console.log("Duplicate driver, no new driver added.");
			}
			
			if(onAdded) {
				onAdded();
			}
		},
		
		/**
		 * load the user's policies data
		 * @param onPoliciesHandler, function to receive a PolicyModelsCollection
		 */
		getUserPolicies: function(onPoliciesHandler)
		{
			var onSuccess = function(response) 
			{
				console.log("DataUtils.getPolicyVehicles success:");
				console.log(response);
				
				var data = response.policies;
				var arr = [];
				for(var i in data) {
					var policy = new PolicyModel(data[i]);
					arr.push(policy); 
				}
				var policies = new PolicyModelsCollection(arr);
						
				if(onPoliciesHandler){
					onPoliciesHandler(policies);
				}
			};
			
			var onFail = function(response) 
			{
				console.log("DataUtils.getUserPolicies failed:");
				console.log(response);
				
				DataUtils._onAdapterError(response);
			};
			
			var invocationData = {
				adapter : Constants.ADAPTER_NAME,
				procedure : 'getPolicyPolicies' 
			};
			
			var params = {file: DataUtils.POLICIES_JSON}//, invocationData: invocationData};
			DataUtils._getData(params, onSuccess, onFail);
		},
		
		/**
		 * load the user's vehicles data
		 * @param onVehiclesHandler, function to receive a VehicleModelsCollection
		 */
		getUserVehicles: function(onVehiclesHandler)
		{
			var onSuccess = function(response) 
			{
				console.log("DataUtils.getPolicyVehicles success:");
				console.log(response);
				
				var data = response.vehicles;
				var arr = [];
				for(var i in data) {
					var vehicle = new VehicleModel(data[i]);
					arr.push(vehicle); 
				}
				var vehicles = new VehicleModelsCollection(arr);
						
				if(onVehiclesHandler){
					onVehiclesHandler(vehicles);
				}
			};
			
			var onFail = function(response) 
			{
				console.log("DataUtils.getPolicyVehicles failed:");
				console.log(response);
				
				DataUtils._onAdapterError(response);
			};
			
			var invocationData = {
				adapter : Constants.ADAPTER_NAME,
				procedure : 'getPolicyVehicles' 
			};
			
			var params = {file: DataUtils.VEHICLES_JSON}//, invocationData: invocationData};
			DataUtils._getData(params, onSuccess, onFail);
		},
		
		/**
		 * get a vehicle model by a id
		 * @param vehicleId, string
		 * @param onVehicle, function to receive a VehicleModel
		 */
		getVehicleById: function(vehicleId, onVehicle)
		{
			var onData = function(vehicles) 
			{
				var vehicle = vehicles.findWhere({vehicleId: vehicleId});
				if(onVehicle) {
					onVehicle(vehicle);
				}
			};
			DataUtils.getUserVehicles(onData);
		},
		
		/**
		 * load the licenses
		 * @param onLicneseHandler, function to receive a LicenseModelsCollection
		 */
		getLicenses: function(onLicneseHandler)
		{
			var onData = function(data) {
				var arr = [];
				for(var i in data) {
					var license = new LicenseModel(data[i]);
					arr.push(license); 
				}
				
				var licenses = new LicenseModelsCollection(arr);				
				if(onLicneseHandler) {
					onLicneseHandler(licenses);
				}
			};
			
			var params = {file: DataUtils.LICENSES_JSON};
			DataUtils._getData(params, onData);
		},
		
		/**
		 * get a license model by a license id
		 * @param licenseId, string
		 * @param onLicense, function to receive a LicenseModel
		 */
		getLicenseById: function(licenseId, onLicense)
		{
			var onData = function(licenses) 
			{
				var license = licenses.findWhere({licenseId: licenseId});
				if(onLicense) {
					onLicense(license);
				}
			};
			DataUtils.getLicenses(onData);
		},
		
		/**
		 * update license info
		 * @param licenseInfo
		 * @param onLicense, function to return update result
		 */
		updateLicenseInfo: function(licenseInfo, onLicense)
		{
			if(onLicense){
				onLicense();
			}
		},
		
		/**
		 * load the claims
		 * @param onClaimsHandler, function to receive a ClaimModelsCollection
		 */
		getClaims: function(onClaimsHandler)
		{
			var onData = function(data) {
				var arr = [];
				for(var i in data) {
					var claim = new ClaimModel(data[i]);
					arr.push(claim); 
				}
				
				var claims = new ClaimModelsCollection(arr);				
				if(onClaimsHandler) {
					onClaimsHandler(claims);
				}
			};
			
			var params = {file: DataUtils.CLAIMS_JSON};
			DataUtils._getData(params, onData);
		},
		
		/**
		 * load the faqs
		 * @param onFaqHandler, function to receive a FaqModelsCollection
		 */
		getFaqs: function(onFaqHandler)
		{
			var onData = function(response) {
				var arr = [];
				var data = response.faqs;
				for(var i in data) {
					var faq = new FaqModel(data[i]);
					arr.push(faq); 
				}
				
				var faqs = new FaqModelsCollection(arr);				
				if(onFaqHandler) {
					onFaqHandler(faqs);
				}
			};
			
			var params = {file: DataUtils.FAQS_JSON};
			DataUtils._getData(params, onData);
		},
		
		/**
		 * initialize localization
		 * load all culture files
		 * @param onInitialized, function
		 */
		initLocalization: function(onInitialized)
		{
			var onData = function(mapping)
			{
				var cultureFiles = [];
				for(var language in mapping) 
				{
					var cultureFile = mapping[language].culture;
					if(cultureFile) {
						cultureFiles.push("../../" + cultureFile); //fixing paths for intialization
					}
				}
				
				//load all culture files
				require(cultureFiles, function(){
					if(onInitialized) {
						onInitialized();
					}
				});
			};
			
			var params = {file: DataUtils.LOCALIZATION_JSON};
			DataUtils._getData(params, onData);
		},
		
		/**
		 * load a language file and unload all others
		 * @param language, language code string
		 * @param onLoaded, function
		 */
		loadLanguage: function(language, onLoaded)
		{
			//reset translations for all languages except for the default language
			for(var languageCode in Globalize.cultures) {
				if(languageCode != Constants.SETTINGS_DEFAULT_LANGUAGE) {
					var culture = Globalize.cultures[languageCode];
					culture.messages = {};
				}
			}
			
			//load selected language file into memory if exists
			var onData = function(mapping)
			{
				if(mapping.hasOwnProperty(language)) 
				{
					var languageFile = mapping[language].language;
					if(languageFile) 
					{
						$.getJSON("../" + languageFile, function(data, textStatus, jqXHR){
							Globalize.addCultureInfo(language, { messages: data });
							if(onLoaded) {
								onLoaded();
							}
						}).fail(function(){
							console.log("Language file failed to load for " + language);
						});
					}
					else {
						console.log("No language file found for " + language);
					}
				}
				else {
					console.log("Language not found in mapping: " + language);
				}
			};
			
			var params = {file: DataUtils.LOCALIZATION_JSON};
			DataUtils._getData(params, onData);
		},
		
		/**
		 * get all the loaded cultures in an array sorted alphabetically
		 * @param none
		 * @return cultures, array of Globalize.culture objects
		 */
		getAllCulturesAlphabetically: function()
		{
			var cultures = [];
			for(var languageCode in Globalize.cultures) 
			{
				var culture = Globalize.cultures[languageCode];
				if(languageCode != "default") {
					cultures.push(culture);
				}
			}
			
			function sortAlphabetically(a,b) {
				if (a.language < b.language)
					return -1;
				if (a.language > b.language)
			  		return 1;
				return 0;
			}
			cultures.sort(sortAlphabetically);
			return cultures;
		},
		
		/**
		 * get data from local storage
		 * @param key, string
		 * @return data, string
		 */
		getLocalStorageData: function(key)
		{
			var data = window.localStorage.getItem(Constants.APP_LOCAL_STORAGE_PREFIX + key);
			return data;
		},
		
		/**
		 * set data to local storage
		 * @param key, string
		 * @param value, string
		 */
		setLocalStorageData: function(key, value) {
			window.localStorage.setItem(Constants.APP_LOCAL_STORAGE_PREFIX + key, value);
		},
		
		/**
		 * clear data in local storage
		 */
		clearLocalStorage: function() {
			window.localStorage.clear();
		},
		
		
		/**
		 * get data from local storage
		 * @param key, string
		 * @return data, string
		 */
		getSessionStorageData: function(key)
		{
			var data = window.sessionStorage.getItem(Constants.APP_SESSION_STORAGE_PREFIX + key);
			return data;
		},
		
		/**
		 * set data to local storage
		 * @param key, string
		 * @param value, string
		 */
		setSessionStorageData: function(key, value) {
			window.sessionStorage.setItem(Constants.APP_SESSION_STORAGE_PREFIX + key, value);
		},
	});

	return DataUtils;

}); 
