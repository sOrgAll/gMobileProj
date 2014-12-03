define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/views/PageView",
		"com/views/SideMenuPanel",
		"com/utils/Utils",
		"com/utils/DataUtils",
	
	], function( $, Backbone, Constants, ServiceProxyFactory, PageView, SideMenuPanel, Utils, DataUtils ) {
		
    // Extends PagView class
    var HomePageView = PageView.extend({
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function() 
        {
        	var self = this;
			PageView.prototype.initialize.call(this);
			
			var userId = DataUtils.getLocalStorageData(Constants.LS_KEY_USERID);
			self._userId = userId && Number(userId);
			
			//initialize components so it would be ready for the splash page
			this.$el.on("pagebeforeshow", function(){
				self.render();
				
				self.clear();
			});
			
        },
        
        /**
         * Reset data memory
         */
        clear: function()
        {
        	//reset data memory
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	PageView.prototype.render.call(this);
        	var self = this;
        	
        	// set the user name
        	this.$el.find("#username").html(DataUtils.getLocalStorageData(Constants.LS_KEY_TITLE_USERNAME));
        	
        	// init the messages item
        	/*
        	var onMessage = function(messages){
        		// update messages notification bubble
        		DataUtils.countUnreadMessages(messages, function(count){
        			Utils.updateNotificationBubble(self.$el.find(".notificationBubbleSpan"), count);
        		});
        		
        		var actionRequired = false;
        		messages.each(function(message){
        			if(message.get("actionRequired")){
                        actionRequired = true;
        			}
        		});
        		
        		if(actionRequired){
    				// add the urgent icon to the messages item
    				Utils.updateUrgentBubble(self.$el.find(".urgentBubbleSpan"), true);
    				
    				// move the notification icon
					self.$("#messages").addClass("withUrgent");
//    				var origin = self.$el.find(".notificationBubbleSpan").css("right");
//    				origin = parseInt(origin.substring(0, origin.indexOf("px")));
//    				self.$el.find(".notificationBubbleSpan").css("right", origin + 70);
        		}else{
					  self.$("#messages").removeClass("withUrgent");
        		}
        		

        	};
        	ServiceProxyFactory.getServiceProxy().getMessagesByUserId([this._userId], onMessage);
        	*/
        	Utils.updateNotificationBubble(self.$el.find(".notificationBubbleSpan"), 4);
        	Utils.updateUrgentBubble(self.$el.find(".urgentBubbleSpan"), true);
        	self.$("#messages").addClass("withUrgent");
        	
        	//logout handler
//        	this.$el.on("tap", "#logoutBtn", function(){
//        		self._logout();
//        		return false;
//        	});
        	
        	//Claim file handler
        	this.$el.on("tap", "#claimFileBtn", function(){
        		$.mobile.changePage("claim_file.html");
        	});
        	
        	//render the left side menu
			new SideMenuPanel({el: this.$el.find("#menuPanel"), currentPageId: "#home"});
			
            return this; //Maintains chainability
        },
        
        /**
         * log out a user
         * TODO: need to connect to service to kill the user's session
         * @param none
         */
        _logout: function() 
        {
    		var question = Utils.getTranslation("%home.logout.question%");
    		var onYes = function() {
    			//reset data memory
    			DataUtils.setLocalStorageData(Constants.LS_KEY_MESSAGES, "");
    			DataUtils.setLocalStorageData(Constants.LS_KEY_USERNAME, "");
    			
    			$.mobile.changePage("login.html", {reverse: true});
    		};
    		
    		Utils.showConfirmationAlert(question, onYes);
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
    return HomePageView;

});