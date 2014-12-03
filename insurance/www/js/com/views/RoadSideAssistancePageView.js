define([ 
		
		"jquery", 
		"backbone",
		"com/views/PageView",
		"com/views/SideMenuPanel",
		"com/utils/Utils",
		"com/utils/DataUtils",
		"com/utils/TemplateUtils",
		"com/models/Constants",
	
	], function( $, Backbone, PageView, SideMenuPanel, Utils, DataUtils, TemplateUtils, Constants) {
		
    // Extends PagView class
    var RoadSideAssistancePageView = PageView.extend({

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
			new SideMenuPanel({el: this.$el.find("#menuPanel"), currentPageId: "#assistance"});
    		
        	this.$el.on("tap", "#call911Btn, #roadsideAssistanceCallBtn", function(){       		
    			Utils.dialNumber(Constants.FORMAT_PHONE_NUMBER);
        	}).on("tap", "#roadsideAssistanceTextBtn", function(){       		
    			Utils.textNumber(Constants.FORMAT_PHONE_NUMBER, "Text Roadside Assistance");
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
    return RoadSideAssistancePageView;

});