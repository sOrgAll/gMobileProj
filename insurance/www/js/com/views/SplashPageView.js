/**
 * this class create the splash screen 
 */
define([ 
		
		"jquery", 
		"backbone",
		"cftoaster",
		"com/views/PageView",
		"com/models/Constants",
		"com/utils/Utils",
	
	], function( $, Backbone, CFToaster, PageView, Constants, Utils ) {
		
    // Extends PagView class
    var SplashPageView = PageView.extend({
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function() 
        {
			PageView.prototype.initialize.call(this);
			
			//populate the version number before the page is shown
			this.$el.on("pagebeforeshow", function(){
//                WL.App.hideSplashScreen();
				var versionElement = $(this).find("#version");
//				var version = WL.Client.getAppProperty(WL.AppProperty.APP_VERSION);
                var version = 1.0;
				$(versionElement).text("v. " + version);
			});
			
			var self = this;
			this.$el.on("tap", "#continueBtn", function(){
				//self._showPasscodeDialog();
				$.mobile.changePage("login.html", {transition: "none"});
				return false;
			});
			
			//kill the app on back button
			$(document).on("backbutton", function(){
				MobileRouter.killApp();
			});
        },
        
        /**
         * show the passcode dialog so the user can only continue with the app if they know the code
         * @param none
         */
        _showPasscodeDialog: function()
        {
        	var question = Utils.getTranslation("%splash.password.question%");
        	var passcode = prompt(question, "");
        	if(typeof passcode == "undefined" || passcode == Constants.PASSCODE) {
        		$.mobile.changePage("login.html", {transition: "none"});
        	}
        	else if(passcode) {
        		var msg = "Wrong!";
        		$("body").cftoaster({content: msg});
        	}
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
    return SplashPageView;

});