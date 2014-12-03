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
    var MessagePageView = PageView.extend({
    	events: function events(){
			// view events handlers
			var domTreeEvents = {
				"pageshow": "render",
			};
			return this.onLoadAndHideEvents(domTreeEvents);
		},

    	_messageId: "",
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
        	var self = this;
			PageView.prototype.initialize.call(this);
			
        	var userId = DataUtils.getLocalStorageData(Constants.LS_KEY_USERID);
			self._userId = userId && Number(userId);
			self._messageId = options && options.data && options.data.messageId && Number(options.data.messageId);

        	//initialize components so it would be ready for the splash page
			//this.$el.on("pageshow", function(){
				//self.render();
			//});
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	PageView.prototype.render.call(this);
        	
        	var self = this;
        	self.$el.trigger("loaddatastarting");
        	
        	// render message info
        	/*
        	var onMessage = function(messages){
                var message = messages.findWhere({id : self._messageId});
                if(message !== undefined){
                    self.$el.find("#title > h1").html(message.get("subject"));
                    self.$el.find("#title > p").append(message.get("date"));
                    self.$el.find("#messageContent > p").html(message.get("content"));
                }else{
                    var onOk = function(){
                        $.mobile.changePage("messages.html");
                    };
                    var alertContent = "The selected message doesn't exist!";
                    var title = "Message Not Found";
                    Utils.showAlert(alertContent, onOk, title, Constants.BUTTON_OK);
                }
                self.$el.trigger("loaddatafinished");
        	};
        	ServiceProxyFactory.getServiceProxy().getMessagesByUserId([this._userId], onMessage);
        	*/
        	self.$el.trigger("loaddatafinished");
        	
        	// init delete button handler
        	this.$el.on("tap", "#deleteBtn", function(){
        		var onOk = function(){
        			/*
            		var onDelMessage = function(){
            			$.mobile.changePage("messages.html");
            		};
            		ServiceProxyFactory.getServiceProxy().deleteMessage([self._messageId], onDelMessage);
            		*/
        			$.mobile.changePage("messages.html");
        		};
        		var onCancel = function(){};
        		var alertContent = "Are you sure you want to delete this message?";
        		var title = "Confirmation";
        		Utils.showConfirmationAlert(alertContent, onOk, onCancel, 
        				title, Constants.BUTTON_CANCEL + "," + Constants.BUTTON_OK);
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
    return MessagePageView;

});
