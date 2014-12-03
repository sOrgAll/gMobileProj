define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/views/PageView",
		"com/utils/DataUtils",
		"com/utils/TemplateUtils",
		"com/utils/Utils",
	
	], function( $, Backbone, Constants, ServiceProxyFactory, PageView, DataUtils, TemplateUtils, Utils ) {
		
    // Extends PagView class
    var SelectMartialPageView = PageView.extend({
    	
    	_onSelectToPage: "", //url to redirect the user after a vehicle is selected, default is to go back
    	_selectedMartial: "",
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {

        	var self = this;
        	this._onSelectToPage = options && options.data && options.data.onSelectToPage ? options.data.onSelectToPage : "";
        	this._selectedMartial = options && options.data && options.data.currentMartial ? options.data.currentMartial : "";
        	
        	PageView.prototype.initialize.call(this);
			
			//initialize components so it would be ready for the splash page
			this.$el.on("pageshow", function(){
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
        	PageView.prototype.render.call(this);
        	var priorMartial = self._selectedMartial;
        	self.$el.find("#updateBtn").addClass("ui-state-disabled");
        	
        	//Initialize the radio box selection as the prior martial
        	if (self._selectedMartial == Utils.getTranslation("%driver.martial.change.option1%")) {
        		self.$el.find("#singleRadio").attr("checked",true).checkboxradio("refresh");
        	} else if (self._selectedMartial == Utils.getTranslation("%driver.martial.change.option2%")) {
        		self.$el.find("#marriedRadio").attr("checked",true).checkboxradio("refresh");
        	}
         	

        	self.$el.find("#singleRadio").bind( "change", function( e ) {
        		self._selectedMartial = Utils.getTranslation("%driver.martial.change.option1%");
        		//Only enable update button while martial is changed
        		if (priorMartial != self._selectedMartial) {
        			self.$el.find("#updateBtn").removeClass("ui-state-disabled");
        		} else {
        			self.$el.find("#updateBtn").addClass("ui-state-disabled");
        		}
        	});
        	
        	self.$el.find("#marriedRadio").bind( "change", function( e ) {
        		self._selectedMartial = Utils.getTranslation("%driver.martial.change.option2%");
        		//Only enable update button while martial is changed
        		if (priorMartial != self._selectedMartial) {
        			self.$el.find("#updateBtn").removeClass("ui-state-disabled");
        		} else {
        			self.$el.find("#updateBtn").addClass("ui-state-disabled");
        		}
        	});
        	
        	self.$el.on("tap", "#backBtn", function(){
        		if(self._onSelectToPage) {
        			$.mobile.changePage(self._onSelectToPage, {changeHash: false});
        		} else {
        			$.mobile.back();
        		}
        	});
        	
        	self.$el.on("tap", "#updateBtn", function(){
        		//var data = {updatedMartial: self._selectedMartial};
        		var driverId = DataUtils.getLocalStorageData(Constants.LS_KEY_SELECTED_DRIVER_ID);
        		data = {driverId: Number(driverId), marriage: self._selectedMartial};
        		
        		var onUpdateDriver = function(){
	        		if(self._onSelectToPage) {
	        			var onOk = function onOk() {
	        				$.mobile.changePage(self._onSelectToPage, {data:data, changeHash: false});
	        			};
	        			Utils.showAlert('This update has been sent for review.', onOk, 'Confirmation', 'OK');
	        		} else {
	        			$.mobile.back();
	        		}
        		};
        		//ServiceProxyFactory.getServiceProxy().updateDriverInfo(data, onUpdateDriver);
        		onUpdateDriver();
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
    return SelectMartialPageView;

});