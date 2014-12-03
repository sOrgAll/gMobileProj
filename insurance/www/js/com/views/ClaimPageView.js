define([ 
		
		"jquery", 
		"backbone",
		"com/views/PageView",
		"com/utils/Utils",
		"com/utils/DataUtils",
		"com/utils/TemplateUtils",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/models/ClaimModel",
		"com/collections/ClaimModelsCollection",
		"com/views/SideMenuPanel"
	
	], function( $, Backbone, PageView, Utils, DataUtils, TemplateUtils, Constants, ServiceProxyFactory,
			ClaimModel, ClaimModelsCollection, SideMenuPanel) {
		
    // Extends PagView class
    var ClaimPageView = PageView.extend({

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
        	var self = this;
			PageView.prototype.initialize.call(this);
			
			//initialize components so it would be ready for the splash page
		   /* this.$el.on("pageshow", function(){*/
				//self.render();
			/*});*/
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	PageView.prototype.render.call(this);        	
        	//render the left side menu
			new SideMenuPanel({el: this.$el.find("#menuPanel"), currentPageId: "#claims"});
        	var self = this;  	
        	self.$el.trigger("loaddatastarting");
        	/*
        	var onClaim = function(claims) 
        	{
        		$.mobile.loading("hide");
        		var onTemplate = function(html) {        			
        			self.$el.find("#claimList").html(html).listview("refresh");
        		};
        		
        		var items = [];
        		claims.each(function(claim) {
        			var context = {claimId: claim.get("claimId"), status: ClaimModel.STATUS[claim.get("status")], date: claim.get("date"),
        				isOpen: claim.get("status") == 0 ? true: false, policeCase: claim.get("policeCase")};
        			items.push(context);
        		});
        		var params = {claims: items};
        		TemplateUtils.getTemplate("claims_list_row", params, onTemplate);
                self.$el.trigger("loaddatafinished");
        	};
            //$.mobile.loading("show");
        	var userId = DataUtils.getLocalStorageData(Constants.LS_KEY_USERID);
        	ServiceProxyFactory.getServiceProxy().getClaimByUserId([Number(userId)], onClaim);
        	*/
        	self.$el.trigger("loaddatafinished");
        	
        	//claim tap handler
        	this.$el.on("tap", "#claimList .openClaim", function(){
        		//window.open('http://www.insuranceco.com/claims', '_system');
        		Utils.showAlert('This feature is not active in the demo', null, 'confirmation', 'ok');
        	});
        	
        	this.$el.on("tap", "#newClaim", function(){
        		$.mobile.changePage("claim_file.html");
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
    return ClaimPageView;

});
