define([ 
		
		"jquery", 
		"backbone",
		"com/views/PageView",
	
	], function( $, Backbone, PageView ) {
		
    // Extends PagView class
    var IndexPageView = PageView.extend({
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function() 
        {
			PageView.prototype.initialize.call(this);
			
			//initialize components so it would be ready for the splash page
			this.$el.on("pageshow", function(){
				var onInit = function() {
					$.mobile.loading("hide");
					MobileRouter.showSplash();
				};
				$.mobile.loading("show");
				MobileRouter.initComponents(onInit);
			});
			
			//kill the app on back button
			$(document).on("backbutton", function(){
				MobileRouter.killApp();
			});
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
    return IndexPageView;

});