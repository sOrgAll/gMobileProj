define([ 
		
		"jquery", 
		"backbone",
		"com/views/PageView",
	
	], function( $, Backbone, PageView ) {
		
    // Extends PagView class
    var IDCardPageView = PageView.extend({
    	
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
    return IDCardPageView;

});