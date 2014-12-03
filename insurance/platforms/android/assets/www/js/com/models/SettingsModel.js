define([ 
	
		"jquery", 
		"backbone",
		"globalize",
		"com/models/Constants",
		"com/utils/DataUtils",
		 
	], function( $, Backbone, G, Constants, DataUtils ) {

    var SettingsModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			var properties = {};
			properties[Constants.LS_KEY_LANGUAGE] = DataUtils.getLocalStorageData(Constants.LS_KEY_LANGUAGE) || Constants.SETTINGS_DEFAULT_LANGUAGE;
			properties[Constants.LS_KEY_OFFLINE_MODE] = DataUtils.getLocalStorageData(Constants.LS_KEY_OFFLINE_MODE)=="false" ? false : true;
			this.set(properties);
			
			//trigger language change so transition direction is set correctly
			this.changeLanguage(this.get(Constants.LS_KEY_LANGUAGE));
		},
        
        /**
         * change language
         * also change the the default transition direction
         * @param language, code string
         */
        changeLanguage: function(language)
        {
        	this.set(Constants.LS_KEY_LANGUAGE, language);
        	var culture = Globalize.culture(language);
        	$.mobile.changePage.defaults.reverse = culture.isRTL;
        },
		
		/**
		 * save settings to localStorage
		 * remove from localstorage if data is undefined
		 * @param none
		 */
		save: function()
		{
			DataUtils.setLocalStorageData(Constants.LS_KEY_LANGUAGE, this.get(Constants.LS_KEY_LANGUAGE));
			DataUtils.setLocalStorageData(Constants.LS_KEY_OFFLINE_MODE, this.get(Constants.LS_KEY_OFFLINE_MODE));
			$(window).trigger(Constants.EVENT_SETTINGS_UPDATE);
			console.log("Settings saved to localStorage.");
		},
		
		/**
		 * reset settings and save
		 * @param none
		 */
		reset: function()
		{
			console.log("Settings reset to default");
			this.set(Constants.LS_KEY_LANGUAGE, WL.App.getDeviceLanguage()); //use device language on reset
			this.set(Constants.LS_KEY_OFFLINE_MODE, Constants.SETTINGS_DEFAULT_OFFLINE_MODE); //use device language on reset
			this.save();
		}
		
    });

    return SettingsModel;

} );