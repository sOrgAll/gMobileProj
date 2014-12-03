define([ 
		
		"jquery", 
		"backbone",
		"com/views/PageView",
		"com/utils/Utils",
		"com/utils/TemplateUtils",
		"com/models/Constants",
	
	], function( $, Backbone, PageView, Utils, TemplateUtils, Constants) {
		
    // Extends PagView class
    var AccidentReportConfirmPageView = PageView.extend({
    	
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
        	this.$el.on("tap", "#doneBtn", function() {
				$.mobile.changePage("home.html");
			});
            return this;
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
    return AccidentReportConfirmPageView;

});