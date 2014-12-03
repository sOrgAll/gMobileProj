define([ 
		
		"jquery", 
		"backbone",
		"com/views/PageView",
		"com/utils/Utils",
	
	], function( $, Backbone, PageView, Utils ) {
		
    // Extends PagView class
    var BillingOptionsPageView = PageView.extend({
    	
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
			
			//pay by check button
			this.$el.on("click", "#checkBtn", function(){
				var onPhoto = function(image) {
					var data = {check: image};
					$.mobile.changePage("check.html", {data: data});
				};
				Utils.takePhoto(onPhoto);
				return false;
			});
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	PageView.prototype.render.call(this);
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
    return BillingOptionsPageView;

});