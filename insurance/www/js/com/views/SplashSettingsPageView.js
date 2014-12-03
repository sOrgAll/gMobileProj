define([ 
		
		"jquery", 
		"backbone",
		"cftoaster",
		"com/views/PageView",
		"com/models/Constants",
		"com/utils/Utils",
		"com/utils/DataUtils",
	
	], function( $, Backbone, CFToaster, PageView, Constants, Utils, DataUtils ) {
		
	// Extends PagView class
	var SplashSettingsPageView = PageView.extend({
		
		events: function events(){
			// view events handlers
			var domTreeEvents = {
				"pageshow": "render",
				"tap #saveBtn": "save",
				"tap #resetBtn": "reset",
			};
			return this.onHideShowEvents(domTreeEvents);
		},
		
		save: function(){

			DataUtils.setLocalStorageData(Constants.LS_KEY_IS_ONLINE,this.$el.find("#online").is(":checked"));
			
			DataUtils.setLocalStorageData(Constants.LS_KEY_USING_SERVER_ID,this.$el.find("#APIManger").is(":checked") ? 1 : 2);	   		
			DataUtils.setLocalStorageData(Constants.LS_KEY_CONNECT_TIMEOUT,this.$el.find("#timeout").val());
			
			DataUtils.setLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS,this.$el.find("#API_Sever").val());
			DataUtils.setLocalStorageData(Constants.LS_KEY_API_SERVER_PORT,this.$el.find("#API_Port").val());
			DataUtils.setLocalStorageData(Constants.LS_KEY_BLUEMIX_SERVER_ADDRESS,this.$el.find("#Bluemix_Sever").val());
			DataUtils.setLocalStorageData(Constants.LS_KEY_BLUEMIX_SERVER_PORT,this.$el.find("#Bluemix_Port").val());
			
			$.mobile.changePage("login.html", {reverse: true});
		},
		
		reset: function(){

			var apiServer = Constants.DEFAULT_API_INSURANCE_SERVER_ADDRESS;
			DataUtils.setLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS, apiServer);   	

			var apiPort = Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
			DataUtils.setLocalStorageData(Constants.LS_KEY_API_SERVER_PORT, apiPort);

			var bluemixServer = Constants.DEFAULT_BLUEMIX_SERVER_ADDRESS;
			DataUtils.setLocalStorageData(Constants.LS_KEY_BLUEMIX_SERVER_ADDRESS, bluemixServer);


			var bluemixPort = Constants.DEFAULT_BLUEMIX_SERVER_PORT;
			DataUtils.setLocalStorageData(Constants.LS_KEY_BLUEMIX_SERVER_PORT, bluemixPort);

//				var usingServerId = Constants.DEFAULT_USING_SERVER_ID;
//				DataUtils.setLocalStorageData(Constants.LS_KEY_USING_SERVER_ID, usingServerId);
//				
//
			var timeout = Constants.DEFAULT_CONNECT_TIMEOUT;
			DataUtils.setLocalStorageData(Constants.LS_KEY_CONNECT_TIMEOUT, timeout);
//
//				self.$el.find("#online").attr("checked", true).checkboxradio("refresh");
//				DataUtils.setLocalStorageData(Constants.LS_KEY_IS_ONLINE,"ture");
				
			this.$el.find("#API_Sever").val(apiServer);
			this.$el.find("#API_Port").val(apiPort);
			
			this.$el.find("#Bluemix_Sever").val(bluemixServer);
			this.$el.find("#Bluemix_Port").val(bluemixPort);
			
			this.$el.find("#timeout").val(timeout);
			
		},
		
		/**
		 * The View Constructor
		 * @param el, DOM element of the page
		 */
		initialize: function() 
		{
			PageView.prototype.initialize.call(this);
			
			/*var self = this;
			this.$el.on("pagebeforeshow", function(){
				self.render();
			});*/
		},
		
		/**
		 * Renders the UI
		 * @param none
		 */
		render: function() 
		{
			var self = this;
			
			//init timeout from local storage. use default if not set
			var timeout = DataUtils.getLocalStorageData(Constants.LS_KEY_CONNECT_TIMEOUT);
			if(!timeout){
				timeout = Constants.DEFAULT_CONNECT_TIMEOUT;
				DataUtils.setLocalStorageData(Constants.LS_KEY_CONNECT_TIMEOUT, timeout);
			}
			self.$el.find("#timeout").val(timeout);

			
			//init online from local storage. use default if not set
			var online = DataUtils.getLocalStorageData(Constants.LS_KEY_IS_ONLINE);
			
			console.log("online mode: "+online);
			self.$el.find("#online").prop("checked", online == "true").checkboxradio("refresh");

			var apiServer = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS);
			if(!apiServer){
				apiServer = Constants.DEFAULT_API_INSURANCE_SERVER_ADDRESS;
				DataUtils.setLocalStorageData(Constants.LS_KEY_API_SERVER_ADDRESS, apiServer);
			}
			
			var apiPort = DataUtils.getLocalStorageData(Constants.LS_KEY_API_SERVER_PORT);
			if(!apiPort){
				apiPort = Constants.DEFAULT_API_INSURANCE_SERVER_PORT;
				DataUtils.setLocalStorageData(Constants.LS_KEY_API_SERVER_PORT, apiPort);
			}
			
			var bluemixServer = DataUtils.getLocalStorageData(Constants.LS_KEY_BLUEMIX_SERVER_ADDRESS);
			if(!bluemixServer){
				bluemixServer = Constants.DEFAULT_BLUEMIX_SERVER_ADDRESS;
				DataUtils.setLocalStorageData(Constants.LS_KEY_BLUEMIX_SERVER_ADDRESS, bluemixServer);
			}
			
			var bluemixPort = DataUtils.getLocalStorageData(Constants.LS_KEY_BLUEMIX_SERVER_PORT);
			if(!bluemixPort){
				bluemixPort = Constants.DEFAULT_BLUEMIX_SERVER_PORT;
				DataUtils.setLocalStorageData(Constants.LS_KEY_BLUEMIX_SERVER_PORT, bluemixPort);
			}
			
			var usingServerId = DataUtils.getLocalStorageData(Constants.LS_KEY_USING_SERVER_ID);
			if(!usingServerId){
				usingServerId = Constants.DEFAULT_USING_SERVER_ID;
				DataUtils.setLocalStorageData(Constants.LS_KEY_USING_SERVER_ID, usingServerId);
			}
			
			self.$el.find("#API_Sever").val(apiServer);
			self.$el.find("#API_Port").val(apiPort);
			
			self.$el.find("#Bluemix_Sever").val(bluemixServer);
			self.$el.find("#Bluemix_Port").val(bluemixPort);
			
			self.$el.find("[type=radio]").val(usingServerId == 1 ? "api" : "bluemix");
					

			if(online == "false" || !online){
				self.$el.find(".server-setting-radios").checkboxradio("disable");
				self.$el.find(".server-setting-inputs").textinput("disable");
			} else{
				self.$el.find(".server-setting-radios").checkboxradio("enable");
				self.$el.find(".server-setting-inputs").textinput("enable");
				if(usingServerId == 2){
					self.$el.find("#BlueMix").attr("checked", true).checkboxradio("refresh");
				} else{
					self.$el.find("#APIManger").attr("checked", true).checkboxradio("refresh");
				}
			}
			
			/*this.$el.on("change", "#online", function(){
				var online = self.$el.find("#online").is(":checked");
				var usingServerId = DataUtils.getLocalStorageData(Constants.LS_KEY_USING_SERVER_ID);
				
				DataUtils.setLocalStorageData(Constants.LS_KEY_IS_ONLINE,online);
				
				if(!online){
					self.$el.find(".server-setting-radios").checkboxradio("disable");
					self.$el.find(".server-setting-inputs").textinput("disable");
				} else{
					self.$el.find(".server-setting-radios").checkboxradio("enable");
					self.$el.find(".server-setting-inputs").textinput("enable");
				}
				
				self.$el.find("[type=radio]").eq(usingServerId - 1).attr("checked",true).checkboxradio("refresh");
			});*/
			
            // show the page after dynamic load all elements
            this.$el.trigger("pageNeedShow");

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
	return SplashSettingsPageView;

});