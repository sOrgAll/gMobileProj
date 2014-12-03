define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/views/PageView",
		"com/utils/DataUtils",
	
	], function( $, Backbone, Constants, PageView, DataUtils ) {
		
    // Extends PagView class
    var SelectWitnessPageView = PageView.extend({
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {

        	var self = this;
			
			//initialize components so it would be ready for the splash page
			this.$el.on("pagebeforeshow", function(){
				//reset data memory
				self.render();
			});
			
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	var self = this;
        	
        	this.$el.on("tap", "#saveBtn", function(){
        		var accidentReportObject = JSON.parse(DataUtils.getLocalStorageData(Constants.LS_KEY_ACCIDENT_REPORT_OBJECT));
    			accidentReportObject.witnessName = self.$el.find("#witnessName").val();
    			DataUtils.setLocalStorageData(Constants.LS_KEY_ACCIDENT_REPORT_OBJECT, JSON.stringify(accidentReportObject));
    			
    			$.mobile.changePage("accident_report.html");
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
    return SelectWitnessPageView;

});