define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/utils/TemplateUtils",
		"com/utils/Utils",
		"com/utils/DataUtils",
	
	], function( $, Backbone, Constants, TemplateUtils, Utils, DataUtils ) {
		
    // Extends PagView class
    var SideMenuPanel = Backbone.View.extend({
    	
    	_currentPageId: "", // the current page to show
    	
    	/**
         * The View Constructor
         */
        initialize: function(options) {
        	Backbone.View.prototype.initialize.call(this);
		    this._currentPageId = options && options.currentPageId ? options.currentPageId : "";
		    this.render();
        },
        
        /**
         * Renders UI for page
         * @param none 
         */
        render: function() {
        	Backbone.View.prototype.render.call(this);
        	
        	var self = this;
        	
        	//render the left side menu
    		var onTemplate = function(html) {
    			var model = MobileRouter.getModel();
    			var settings = model.get("settings");
    			var language = settings.get("language");
    			var localizedHtml = Utils.applyLocalization(html, language);
    			self.$el.html(localizedHtml);   			
    			self.$el.find("#menuList").listview();
    			
    			self.$el.on( "panelbeforeopen", function( event, ui ) {
//    				$(this).find(self._currentPageId).addClass("ui-btn-active");
    				$(this).find(self._currentPageId + " a").addClass("ui-btn-active");
    			} );
    			
    			self.$el.on( "panelclose", function( event, ui ) {
    				$(this).find(self._currentPageId + " a").removeClass("ui-btn-active");
    			} );
    			
    			// tap current page handler
            	self.$el.on("tap", "#menuList li", function(event){
            		if($(this).attr("id") == self._currentPageId.substring(1)){
            			self.$el.panel("close");
                		event.preventDefault();
            		} else{
            			self.$el.find(self._currentPageId + " a").removeClass("ui-btn-active");
            		}
            	});
            	
            	self.$el.on("taphold", "#menuList li", function(event){
            		if($(this).attr("id") == self._currentPageId.substring(1)){
            			self.$el.panel("close");
                		event.preventDefault();
            		} else{
            			self.$el.find(self._currentPageId + " a").removeClass("ui-btn-active");
            			$.mobile.changePage($(this).find("a").attr("href"));
            		}
//            		$(this).removeClass("ui-btn-active");
//            		self.$el.find(self._currentPageId).addClass("ui-btn-active");
//            		self.$el.panel("close");
//            		event.preventDefault();
            	});
    		};
        	TemplateUtils.getTemplate("side_menu", {}, onTemplate);
        	
        	self.$el.parent().unbind("swipeleft").on( "swipeleft", function(){
        		 self.$el.panel( "close" );
        	});
//        	.unbind("swiperight").on( "swiperight", function(){
//        		 self.$el.panel( "open" );
//        	});
        	
           	//logout handler
        	this.$el.on("tap", ".sbLogout", function(){
        		self._logout();
        		return false;
        	});

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
    			DataUtils.setLocalStorageData(Constants.LS_KEY_PASSWORD, "");
    			
    			$.mobile.changePage("login.html", {reverse: true});
    		};
    		
    		Utils.showConfirmationAlert(question, onYes);
        },
        
         /**
         * do cleanup
         * @param none
         */
        dispose: function() {
        	Backbone.View.prototype.dispose.call(this);
        },

    });

    // Returns the View class
    return SideMenuPanel;

});