define([ 
		
		"jquery", 
		"backbone",
		"com/views/PageView",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/utils/Utils",
		"com/utils/DataUtils",
	
	], function( $, Backbone, PageView, Constants, ServiceProxyFactory, Utils, DataUtils ) {
		
    // Extends PagView class
    var LoginPageView = PageView.extend({
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function() 
        {
        	var self = this;
			PageView.prototype.initialize.call(this);
			
			//initialize components so it would be ready for the splash page
			this.$el.on("pageshow", function(){
				//self.clear();
				DataUtils.loadMessages();
				self.render();
			});
			
			//kill the app on back button
			$(document).on("backbutton", function(){
				MobileRouter.killApp();
			});
        },
        
        /**
         * Clear data storage
         * @param none
         */
        clear: function(){
        	//reset data memory
//			DataUtils.setLocalStorageData(Constants.LS_KEY_MESSAGES, "");
//			DataUtils.setLocalStorageData(Constants.LS_KEY_USERNAME, "");
        	//DataUtils.clearLocalStorage();
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	var self = this;
        	PageView.prototype.render.call(this);
        	
        	// set always online
        	var online = DataUtils.getLocalStorageData(Constants.LS_KEY_IS_ONLINE);
        	if(!online){
        		DataUtils.setLocalStorageData(Constants.LS_KEY_CONNECT_TIMEOUT, Constants.DEFAULT_CONNECT_TIMEOUT);
        		DataUtils.setLocalStorageData(Constants.LS_KEY_IS_ONLINE,"true");
            	DataUtils.setLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS,Constants.DEFAULT_API_INSURANCE_SERVER_ADDRESS);
        		DataUtils.setLocalStorageData(Constants.LS_KEY_API_SERVER_PORT,Constants.DEFAULT_API_INSURANCE_SERVER_PORT);
        	}
        	
        	//display previously used username, if user session is still valid, automatically redirect user to home page
        	var userName = DataUtils.getLocalStorageData(Constants.LS_KEY_USERNAME);
        	var passWord = DataUtils.getLocalStorageData(Constants.LS_KEY_PASSWORD);
        	if(!userName){
        		userName = Constants.DEFAULT_USER_NAME;
        		passWord = Constants.DEFAULT_PASSWORD;
        	}
        	
			self.$el.find("#username").val(userName);
			self.$el.find("#password").val(passWord);
        	
			if(userName && passWord){
        		self.$el.find("#keepLoggedIn").prop("checked", "true").checkboxradio("refresh");
        	}
        	
        	//login button handler
        	this.$el.on("tap", "#signinBtn", function(){
				var username = self.$el.find("#username").val();
				var password = self.$el.find("#password").val();
				
				if(!(username && password)){
					
					self.$el.find("#errorMessage").css("visibility", "visible");
					
				} else {

					var isKeepLoggedIn = self.$el.find("#keepLoggedIn").is(":checked");
	
					/*
					//connect to service to login
					var onResponse = function(response) {
						$.mobile.loading("hide");
						
						DataUtils.setLocalStorageData(Constants.LS_KEY_TITLE_USERNAME, username);
						
						if(isKeepLoggedIn){
							DataUtils.setLocalStorageData(Constants.LS_KEY_USERNAME, username);
							DataUtils.setLocalStorageData(Constants.LS_KEY_PASSWORD, password);
						}
						else{
							DataUtils.setLocalStorageData(Constants.LS_KEY_USERNAME, "");
							DataUtils.setLocalStorageData(Constants.LS_KEY_PASSWORD, "");
						}
						
						if(response && response.errorCode != Constants.REST_SERVICE_RESPONSE_CODE_OK){
							self.$el.find("#errorMessage").css("visibility", "visible");
						}else{	
							//save user id logged in
							if(response && response.data && response.data.id){
								DataUtils.setLocalStorageData(Constants.LS_KEY_USERID, response.data.id);
							}
								
			        		$.mobile.changePage("policy_selector.html", {transition: "none"});
						}
					};
					
					// use the remote or local service to login
					$.mobile.loading("show");
					ServiceProxyFactory.getServiceProxy().login({username: username, password: password},
						onResponse);
					*/
					$.mobile.changePage("policy_selector.html", {transition: "none"});
				}
        	});
        	
        	this.$el.on("tap", "#forogtPasswordBtn", function(){ // init forogt password button handler
        		//window.location.href = "http://www.insuranceco.com/Forgotpassword";
        		var onOk = function(){
        			return false;
        		};
        		Utils.showAlert('This feature is not active in the demo', onOk, 'confirmation', 'ok');
        	}).on("tap", "#registerBtn", function(){ // init register button handler
        		//window.location.href = "http://www.insuranceco.com/Register";
        		var onOk = function(){
        			return false;
        		};
        		Utils.showAlert('This feature is not active in the demo', onOk, 'confirmation', 'ok');
        	}).on("tap", "#settingsBtn", function(){ // init register button handler
        		$.mobile.changePage("splash_settings.html", {transition: "none"});
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
    return LoginPageView;

});