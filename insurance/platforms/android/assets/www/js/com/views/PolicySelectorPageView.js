define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/views/PageView",
		"com/utils/DataUtils",
		"com/utils/TemplateUtils",
	
	], function( $, Backbone, Constants, ServiceProxyFactory, PageView, DataUtils, TemplateUtils ) {
		
    // Extends PagView class
    var PolicySelectorPageView = PageView.extend({
    	
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
			PageView.prototype.initialize.call(this);
			var self = this;
			
			//initialize components so it would be ready for the splash page
            /*this.$el.on("pageshow", function(){*/
            /*self.clear();*/
            /*self.render();*/
            /*});*/
			
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	var self = this;
        	self.$el.trigger("loaddatastarting");
        	PageView.prototype.render.call(this);
        	
        	/*
        	//init policy list
			var onData = function(policies) 
        	{
        		var onTemplate = function(html) {
        			self.$el.find("#policyList").append(html).listview("refresh");
        		};
        		
        		var items = [];
        		policies.each(function(policy) {
        			var _toPage = null;
        			if(policy.get("policyName") == "Auto"){
        				_toPage = "home.html";
        			} else {
        				_toPage = "#";
        			}
        			var context = {policyName: policy.get("policyName"), policyId: policy.get("policyId"), toPage: _toPage};
        			items.push(context);
        		});
        		var params = {policies: items};
        		TemplateUtils.getTemplate("policies_list_row", params, onTemplate);
                self.$el.trigger("loaddatafinished");
        	};
        	ServiceProxyFactory.getServiceProxy().getPolicyByUser([DataUtils.getLocalStorageData(Constants.LS_KEY_USERID)],onData);
        	*/
            self.$el.trigger("loaddatafinished");
        	
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
    return PolicySelectorPageView;

});
