// Includes file dependencies
define([
	
	"jquery",
	"backbone",
	
], function($, Backbone) {

    // The Model constructor
    var Constants = Backbone.Model.extend({},
	    {
	    	
	    	PASSCODE : "tmp", 
	    	FOLDER_TEMPLATES : "../templates/",
			EXTENSION_TEMPLATES : ".handlebars",
			DEFAULT_PAGE_TRANSITION : "slide",
			DEFAULT_WINDOW_RESIZE_DELAY : 250, //default time to wait until handling the window resize event
			ALPHABETS : "abcdefghijklmnopqrstuvwxyz",
			DEFAULT_USER_LAT : 41.8782,
    		DEFAULT_USER_LNG : -87.6297,
    		CONTACTS_FILTER : "tmp",
    		
    		REST_SERVICE_RESPONSE_CODE_OK: "0", // code for successful response
	
			/**** page view classes need to be added here so they can be loaded before being initialized ****/
			VIEW_CLASSES : [
				"com/views/SplashPageView",
				"com/views/SplashSettingsPageView",
				"com/views/IndexPageView",
				"com/views/LoginPageView",
				"com/views/ManagePageView",
				"com/views/DriversPageView",
				"com/views/DriversAddPageView",
				"com/views/DriversContactsPageView",
				"com/views/DriverDetailPageView",
				"com/views/PolicyDetailPageView",
				"com/views/VehicleInfoPageView",
				"com/views/CoveragePageView",
				"com/views/CoverageDetailPageView",
				"com/views/HomePageView",
				"com/views/ContactPageView",
				"com/views/IDCardPageView",
				"com/views/BillingPageView",
				"com/views/BillingOptionsPageView",
				"com/views/CheckPageView",
				"com/views/ClaimPageView",
				"com/views/RoadSideAssistancePageView",
				"com/views/MessagesPageView",
				"com/views/MessagePageView",
				"com/views/AccidentReportPageView",
				"com/views/AccidentReportConfirmPageView",
				"com/views/MakePaymentPageView",
				"com/views/SelectVehiclePageView",
				"com/views/SelectDriverPageView",
				"com/views/PolicySelectorPageView",
				"com/views/PaymentHistoryPageView",
				"com/views/SelectMartialPageView",
				"com/views/SelectWitnessPageView",
				"com/views/ChangeLicenseInfoPageView",
				"com/views/FaqPageView"
			],
			
			/**** default settings ****/
			SETTINGS_DEFAULT_LANGUAGE : "en",
			SETTINGS_DEFAULT_OFFLINE_MODE : true,
			USER_DEFAULT_IMAGE : "../images/drivers/default.jpg",
			DEFAULT_USER_NAME : "Frankie Smith",
			DEFAULT_PASSWORD : "admin12",
			
			
			/**** resolution constants ****/
			RESOLUTION_PHONE : 480,
			RESOLUTION_TABLET : 767,
			RESOLUTION_DESKTOP : 1200,
			
			/**** events constants ****/
			EVENT_SETTINGS_UPDATE : "settingsupdate",
			
			/**** adapter constants ****/
			ADAPTER_NAME : "SimpleAppInsurance",
			
			/**** localStorage constants ****/
			APP_LOCAL_STORAGE_PREFIX : "SimpleInsurance.",
			APP_SESSION_STORAGE_PREFIX : "Session.SimpleInsurance.",
			LS_KEY_NEW_DRIVER_PHOTO_ADDED : "newDriverPhotoAdded",
			LS_KEY_NEW_DRIVER : "newDriver",
			LS_KEY_ADDED_DRIVERS : "addedDrivers",
			LS_KEY_SELECTED_DRIVER_ID : "selectedDriverId",
			LS_KEY_SELECTED_LICENSE_ID : "selectedLicenseId",
			LS_KEY_ACCIDENT_REPORT_OBJECT : "accidentReportObject",
			LS_KEY_SELECTED_VEHICLE_ID : "selectedVehicleId",
			LS_KEY_LANGUAGE : "language",
			LS_KEY_OFFLINE_MODE : "offlineMode",
			LS_KEY_NEW_MESSAGES_COUNT : "newMessagesCount",
			LS_KEY_MESSAGES : "messages",
			LS_KEY_USERNAME : "username",
			LS_KEY_PASSWORD : "password",
			LS_KEY_IS_ONLINE: "isOnline",
			LS_KEY_USERID: "userId",
			LS_KEY_ADDED_PAYMENTS: "addPayments",
			LS_KEY_SAVE_PAYMENT_INFO_AND_METHOD: "savePaymentInfoAndMethod",
			LS_KEY_TITLE_USERNAME : "titleUserName",
			
			/**** settings constants ****/
			LS_KEY_CONNECT_TIMEOUT: "connectTimeout",
			LS_KEY_USING_SERVER_ID: "usingServerId",
			LS_KEY_API_SERVER_ADDRESS: "apiServerAddress",
			LS_KEY_API_SERVER_PORT: "apiServerPort",
			DEFAULT_CONNECT_TIMEOUT: 5,
			DEFAULT_USING_SERVER_ID : 1,

            DEFAULT_API_INSURANCE_SERVER_ADDRESS: "localhost",
            DEFAULT_API_INSURANCE_SERVER_PORT: 4301,
            DEFAULT_API_AUTHENTICATION_SERVER_ADDRESS: "localhost",
            DEFAULT_API_AUTHENTICATION_SERVER_PORT: 4001,
            DEFAULT_API_MESSAGE_SERVER_ADDRESS: "localhost",
            DEFAULT_API_MESSAGE_SERVER_PORT: 4002,
            DEFAULT_API_PAYMENT_SERVER_ADDRESS: "localhost",
            DEFAULT_API_PAYMENT_SERVER_PORT: 4003,

            /**** confirm dialog constants ****/
			TITLE_SUBMIT : "Confirm",
			CONTENT_SUBMIT : "Are you ready to submit this report?",
//			PHONE_NUMBER : "18004261234",
//			FORMAT_PHONE_NUMBER : "1-800-426-1234",
			PHONE_NUMBER : "5551234567",
			FORMAT_PHONE_NUMBER : "555-123-4567",
			EMAIL_ADDRESS : "mobileinsurance@gmail.com",
			BUTTON_CANCEL: "Cancel",
			BUTTON_OK: "OK",
			BUTTON_TEXT : "Text",
			BUTTON_CALL : "Call",
			BUTTON_EMAIL : "Email",
			BUTTON_CONFIRM : "Confirm",
			
			CALL_AGENT: "Call Your Agent",
			TEXT_AGENT: "Text Your Agent",
			EMAIL_AGENT: "Email Your Agent",
			CALL_911: "Call 911",
			CALL_ROADSIDE_ASSISTANCE: "Call Roadside Assistance",
			TEXT_ROADSIDE_ASSISTANCE: "Text Roadside Assistance",
			
			/**** rest server constants ****/
			DEFAULT_REST_SERVICE_BASE_URL: "http://localhost:4200",
			DEFAULT_REST_SERVICE_ACCEPT_HEADER: "application/com.simple.insurance-v1.0+json",
    	}
    );

    // Returns the Model class
    return Constants;

});
