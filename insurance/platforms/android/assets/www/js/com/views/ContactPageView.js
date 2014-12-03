define([ 
		
		"jquery", 
		"backbone",
		"com/views/PageView",
		"com/views/SideMenuPanel",
		"com/models/Constants",
		"com/utils/Utils",
		"com/utils/TemplateUtils",
	
	], function( $, Backbone, PageView, SideMenuPanel, Constants, Utils, TemplateUtils ) {
		
    // Extends PagView class
    var ContactPageView = PageView.extend({
    	
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
				self.render();
			});
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	PageView.prototype.render.call(this);
        	
        	//render the left side menu
			new SideMenuPanel({el: this.$el.find("#menuPanel"), currentPageId: "#contact"});
			
    		this.$el.on("tap", "#callAgent", function(){
    			Utils.dialNumber(Constants.FORMAT_PHONE_NUMBER);
    		}).on("tap", "#textAgent", function(){
    			Utils.textNumber(Constants.FORMAT_PHONE_NUMBER, Utils.getTranslation("%contact.sms.message%"));
    		}).on("tap", "#emailAgent", function(){
    			Utils.email(Constants.EMAIL_ADDRESS, Utils.getTranslation("%contact.sms.message%"));
    		});
    		
        	this.$el.on("tap", "#faq", function(){
        		$.mobile.changePage("faq.html");
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
    return ContactPageView;

});