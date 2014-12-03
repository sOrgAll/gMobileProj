define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/views/PageView",
		"com/views/SideMenuPanel",
		"com/utils/Utils",
		"com/utils/DataUtils",
		"com/utils/TemplateUtils",
	
	], function( $, Backbone, Constants, ServiceProxyFactory, PageView, SideMenuPanel, Utils, DataUtils, TemplateUtils ) {
		
    // Extends PagView class
    var MessagesPageView = PageView.extend({
    	
    	events: function events(){
			// view events handlers
			var domTreeEvents = {
				"pageshow": "render",
			};
			return this.onLoadAndHideEvents(domTreeEvents);
		},
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
		   /* this.$el.on("pageshow", function(){*/
				//self.render();
			/*});*/
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
        	
        	// init messages list
        	/*
        	var onMessage = function(messages){
        		self._messages = messages;
        		var onTemplate = function(html){
        			self.$el.find("#messagesList").append(html).listview("refresh");

        			if(messages.length==0){
        				// show empty alert message
        				self.$el.find("#noMessages").show();
        			}
        			else {
	        			// update messages notification bubble for list divider
	            		DataUtils.countUnreadMessages(messages, function(count){
	            			Utils.updateNotificationBubble(self.$el.find(".notificationBubbleSpan"), count);
	            		});
	            		
	        			self.$el.find(".message").each(function(idx){
	        				// update the unread bubble span
	        				Utils.updateUnreadBubble($(this).find(".unreadBubbleSpan"),
	        						!self._messages.findWhere({id : Number($(this).attr("data-id"))}).get("isRead"));
	        				
	        				// update the urgent bubble span
	        				Utils.updateUrgentBubble($(this).find(".urgentBubbleSpan"),
	        						self._messages.findWhere({id : Number($(this).attr("data-id"))}).get("actionRequired"));
	        			});
        			}
        		};
        		
        		var items = [];
        		messages.each(function(message) {
        			var context = {messageId: message.get("id"), subject: message.get("subject"),
        					date: message.get("date")};
        			items.push(context);
        		});
        		var params = {messages: items};
        		TemplateUtils.getTemplate("messages_list_row", params, onTemplate);
                self.$el.trigger("loaddatafinished");

        	};
        	ServiceProxyFactory.getServiceProxy().getMessagesByUserId([this._userId], onMessage);
        	*/
        	self.$el.trigger("loaddatafinished");
        	
        	//render the left side menu
			new SideMenuPanel({el: this.$el.find("#menuPanel"), currentPageId: "#messages"});
			
        	// show one message
			this.$el.on("tap", "#messagesList .message", function(){
				var $mssgDomObj = $(this);
				
				/*
				var _message = self._messages.findWhere({id : Number($(this).attr("data-id"))});
				
				Utils.updateUnreadBubble($mssgDomObj.find(".unreadBubbleSpan"), false);
				_message.set("isRead", true);
				Utils.updateUrgentBubble($mssgDomObj.find(".urgentBubbleSpan"), false);
				_message.set("actionRequired", false);

				// update messages notification bubble for list divider
        		DataUtils.countUnreadMessages(self._messages, function(count){
        			Utils.updateNotificationBubble(self.$el.find(".notificationBubbleSpan"), count);
        		});
        		
        		//DataUtils.setMessages(self._messages);
        		ServiceProxyFactory.getServiceProxy().updateMessage(JSON.parse(JSON.stringify(_message)));
        		*/

				$.mobile.changePage("message.html", {data: {messageId: $(this).attr("data-id")}});
				return false;
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
    return MessagesPageView;

});
