define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/views/PageView",
		"com/utils/Utils",
	
	], function( $, Backbone, Constants, ServiceProxyFactory, PageView, Utils ) {
		
    // Extends PagView class
    var CoverageDetailPageView = PageView.extend({
    	
    	_coverageName : "",
    	
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
        initialize: function(options) 
        {
        	this._coverageName = decodeURIComponent(options && options.data && options.data.coverageNameData ? options.data.coverageNameData : "");
        	this._coverageId = Number(options && options.data && options.data.coverageId ? options.data.coverageId : "");
        	
			PageView.prototype.initialize.call(this, options);
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	var self = this;
        	var el = this.$el;
        	PageView.prototype.render.call(this);
        	//self.$el.find("#coverageName").html(self._coverageName);
        	self.$el.find("#updateBtn").addClass("ui-state-disabled");
        	
        	// trigger loading data start
        	self.$el.trigger("loaddatastarting");
        	
        	/*
        	var onCoverage = function(coverage){
        		el.find("#coverageName").append(coverage.get("name"));
        		el.find("#currentLimitContent").append(coverage.get("limit"));
        		el.find("#definitionContent").append(coverage.get("definition"));
        		el.find("#coveredContent").append(coverage.get("covered"));
        		el.find("#additionContent > h3").after(coverage.get("additionOptions"));
        		
        		// show addition when Emergency Road Service and not Full Coverage
        		if((coverage.get("name") == "Emergency Road Service" && coverage.get("limit") == "Full Coverage")
        				|| coverage.get("name") != "Emergency Road Service"){
        			el.find("#addition").hide();
        			el.find("#updateButtonDiv").attr("style","display:none");
        		}
        		
        		// trigger loading data finish
            	self.$el.trigger("loaddatafinished");
        	};
        	ServiceProxyFactory.getServiceProxy().getCoverageById([this._coverageId], onCoverage);
        	*/
        	self.$el.trigger("loaddatafinished");
        	
        	self.$el.find("#yesRadio").bind( "change", function( e ) {
        		self.$el.find("#updateBtn").removeClass("ui-state-disabled");
			});
        	
        	self.$el.find("#noRadio").bind( "change", function( e ) {
        		self.$el.find("#updateBtn").addClass("ui-state-disabled");
			});
        	       	
        	this.$el.on("tap", "#moreHelp", function(){
//        		window.open('http://www.insuranceco.com/Coverage Help', '_system');
        	});
        	
        	this.$el.on("tap", "#updateBtn", function(){
        		var onOk = function onOk() {
        			$.mobile.back();
    			};
        		Utils.showAlert('This update has been sent for review', onOk, 'Confirmation', 'OK');
        	});

         	this.$el.on("tap", "#moreHelp", function(){
                Utils.showAlert('This feature is not active in the demo', null, 'confirmation', 'ok');
        	});
       	
            return this; //maintains chainability
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
    return CoverageDetailPageView;

});
