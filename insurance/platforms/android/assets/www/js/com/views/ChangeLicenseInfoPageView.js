define([ 
		
		"jquery", 
		"backbone",
		"scrollto",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
		"com/views/PageView",
		"com/utils/DataUtils",
		"com/utils/TemplateUtils",
		"com/utils/Utils",
	
	], function( $, Backbone, Scrollto, Constants, ServiceProxyFactory, PageView, DataUtils, TemplateUtils, Utils ) {
		
    // Extends PagView class
    var ChangeLicenseInfoPageView = PageView.extend({
    	
    	_onSelectToPage: "", //url to redirect the user after a vehicle is selected, default is to go back
    	
    	_priorExpirationYear: "",
		_priorExpirationMonth: "",
		_priorExpirationDay: "",
		_priorLicenseNum: "",
		_priorLicenseState: "",
    	
		_startYear: 2013,
		
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
        	this._onSelectToPage = options && options.data && options.data.onSelectToPage ? options.data.onSelectToPage : "";
        	
        	PageView.prototype.initialize.call(this);
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	var self = this;
        		el = this.$el,
        		months = {"January": 31, "February": 28, "March": 31, "April": 30, "May": 31, 
        				"June": 30, "July": 31, "August": 31, "September": 30, "October": 31, "November": 30, "December": 31},
//        		          months = [{name: "January", lastDay: 31}, {name: "February", lastDay: 28}, {name: "March", lastDay: 31},
//        		                    {name: "April", lastDay: 30}, {name: "May", lastDay: 31}, {name: "June", lastDay: 30},
//        		                    {name: "July", lastDay: 31}, {name: "August", lastDay: 31}, {name: "September", lastDay: 30},
//        		                    {name: "October", lastDay: 31}, {name: "November", lastDay: 30}, {name: "December", lastDay: 31}],
        		isLeap = function(year, month){
        			return month == "February" ? (!(year % 100 == 0) && (year % 4 == 0)) || 
        					(year % 100  == 0 && year % 400 == 0) : false;
        		},
        		optionText = null,
        		initDaySelect = function(year, month, day){
        			$("#daySelection").empty();
        			var lastDayOfMonth = months[month] + 
        					(isLeap(year, month) ? 1 : 0),
	        			padZero = function(num){
	        				return num < 10 ? "0" + num : num + "";
	        			};
	        			
        			for(var i = 0; i < lastDayOfMonth; i++){
        				optionText = padZero(i + 1);
        				el.find("#daySelection").append($("<option>").text(optionText).val(i + 1));
        			}
        			self.$el.find("#daySelection").val(day).attr("selected", true).siblings("option").removeAttr("selected");
//        			el.find("#daySelection option[value=" + day + "]").attr("selected", "selected");
        			$("#daySelection").selectmenu("refresh");
        		};
        		
        	PageView.prototype.render.call(this);
        	
        	// init year selector
        	(function(){
        		for(var i = 0; i < 11; i++){
        			optionText = self._startYear + i;
        			el.find("#yearSelection").append($("<option>").text(optionText).val(optionText));
        		}
        		$("#yearSelection").selectmenu("refresh");
        	}());
        	
        	// init month selector
        	(function(){
        		$.each(months, function(month){
        			el.find("#monthSelection").append($("<option>").text(month).val(month));
        		});
        		$("#monthSelection").selectmenu("refresh");
        	}());
        	
        	// init license info
        	/*
        	(function(){
        		
        		// trigger loading data start
            	self.$el.trigger("loaddatastarting");
            	
    			var onLicense = function(license){
        			self._priorExpirationYear = license.get("expirationYear");
        			self._priorExpirationMonth = license.get("expirationMonth");
        			self._priorExpirationDay = license.get("expirationDay");
        			self._priorLicenseNum = license.get("licenseNum");
        			self._priorLicenseState = license.get("licenseState");
        			
        			el.find("#yearSelection").val(self._priorExpirationYear).attr("selected", true).siblings("option").removeAttr("selected");
//        			el.find("#yearSelection option[value=" + self._priorExpirationYear + "]").attr("selected", true);
        			el.find("#yearSelection").selectmenu("refresh");
        			
        			self.$el.find("#monthSelection").val(self._priorExpirationMonth).attr("selected", true).siblings("option").removeAttr("selected");
//        			el.find("#monthSelection option[value=" + self._priorExpirationMonth + "]").attr("selected", true);
        			el.find("#monthSelection").selectmenu("refresh");
        					
					// init day selector
					initDaySelect(self._priorExpirationYear, self._priorExpirationMonth, self._priorExpirationDay);
        			
        			self.$el.find("#stateSelection").val(self._priorLicenseState).attr('selected', true).siblings('option').removeAttr('selected');   
        			self.$el.find("#stateSelection").selectmenu("refresh");
        			
//        			self._priorLicenseNum = Utils.replaceStringWithStar(0, self._priorLicenseNum.length - 5, self._priorLicenseNum);
        			self.$el.find("#licenseNumberText").attr("value", self._priorLicenseNum);
        			
        			// trigger loading data finish
                	self.$el.trigger("loaddatafinished");
        			
            	};
            	var licenseId = DataUtils.getLocalStorageData(Constants.LS_KEY_SELECTED_LICENSE_ID);
            	ServiceProxyFactory.getServiceProxy().getLicenseById([Number(licenseId)], onLicense);
        	}());
        	*/
        	initDaySelect("2013", "January", null);
        	self.$el.trigger("loaddatafinished");
        	
        	// init states selector
        	states = ["ALABAMA", "ALASKA", "ARIZONA", "ARKANSAS", "CALIFORNIA", "COLORADO", "CONNECTICUT", 
        	          "DELAWARE", "FLORIDA", "GEORGIA", "HAWAII", "IDAHO", "ILLINOIS", "INDIANA", "IOWA",
        	          "KANSAS", "KENTUCKY", "LOUISIANA", "MAINE", "MARYLAND", "MASSACHUSETTS", "MICHIGAN",
        	          "MINNESOTA", "MISSISSIPPI", "MISSOURI", "MONTANA", "NEBRASKA", "NEVADA", 
        	          "NEW HAMPSHIRE", "NEW JERSEY", "NEW MEXICO", "NEW YORK", "NORTH CAROLINA", 
        	          "NORTH DAKOTA", "OHIO", "OKLAHOMA", "OREGON", "PENNSYLVANIA", "RHODE ISLAND", 
        	          "SOUTH CAROLINA", "SOUTH DAKOTA", "TENNESSEE", "TEXAS", "UTAH", "VERMONT", 
        	          "VIRGINIA", "WASHINGTON", "WEST VIRGINIA", "WISCONSIN", "WYOMING"];
        	
        	$.each(states, function(index, state){
        		el.find("#stateSelection").append('<option value="' +state+ '">'+state+'</option>');
        	});
        	$("#stateSelection").selectmenu("refresh");
        	
        	self.$el.find("#updateBtn").addClass("ui-state-disabled");
        	
			self.$el.on("tap", "#backBtn", function(){
        		if(self._onSelectToPage) {
        			$.mobile.changePage(self._onSelectToPage, {changeHash: false});
        		} else {
        			$.mobile.back();
        		}
        	});
			
			var getSelectDate = function(){
				return {
					year: el.find("#yearSelection option:selected").val(),
					month: el.find("#monthSelection option:selected").val(),
					day: el.find("#daySelection option:selected").val(),
				};
			};
			changeDaySelect = function(){
				date = getSelectDate();
				initDaySelect(date.year, date.month, date.day);
			};
			self.$el.on("change", "#yearSelection", function(){
				if (self.validateInput()) {
					self.$el.find("#updateBtn").removeClass("ui-state-disabled");
				} else {
					self.$el.find("#updateBtn").addClass("ui-state-disabled");;
				}
				changeDaySelect();
			});
			
			self.$el.on("change", "#monthSelection", function(){
				if (self.validateInput()) {
					self.$el.find("#updateBtn").removeClass("ui-state-disabled");
				} else {
					self.$el.find("#updateBtn").addClass("ui-state-disabled");
				}
				changeDaySelect();
			});
			
			self.$el.on("change", "#daySelection", function(){
				if (self.validateInput()) {
					self.$el.find("#updateBtn").removeClass("ui-state-disabled");
				} else {
					self.$el.find("#updateBtn").addClass("ui-state-disabled");
				}
			});
			
			self.$el.on("change", "#stateSelection", function(){
				if (self.validateInput()) {
					self.$el.find("#updateBtn").removeClass("ui-state-disabled");
				} else {
					self.$el.find("#updateBtn").addClass("ui-state-disabled");
				}
				$.scrollTo(this);
			});
			
			self.$el.on("input", "#licenseNumberText", function(){
				if (self.validateInput()) {
					self.$el.find("#updateBtn").removeClass("ui-state-disabled");
				} else {
					self.$el.find("#updateBtn").addClass("ui-state-disabled");
				}
			});
			
			self.$el.on("change", "#licenseNumberText", function(){
				if (self.validateInput()) {
					self.$el.find("#updateBtn").removeClass("ui-state-disabled");
				} else {
					self.$el.find("#updateBtn").addClass("ui-state-disabled");
				}
			});

			self.$el.on("tap", "#updateBtn", function(){
				
        		/*var data = {updatedLicenseNum: self.$el.find("#licenseNumberText").val()
				,updatedLicenseState: self.$el.find("#stateSelection").val()};*/
				var licenseId = DataUtils.getLocalStorageData(Constants.LS_KEY_SELECTED_LICENSE_ID);
        		var data = {
        				licenseId: Number(licenseId), 
        				expirationYear: Number(self.$el.find("#yearSelection").val()), 
        				expirationMonth: self.$el.find("#monthSelection").val(), 
        				expirationDay: Number(self.$el.find("#daySelection").val()), 
        				licenseNum: self.$el.find("#licenseNumberText").val(), 
        				licenseState: self.$el.find("#stateSelection").val()
        			};

				var onUpdateLicense = function(){
	        		if(self._onSelectToPage) {
	        			var onOk = function onOk() {
	        				$.mobile.changePage(self._onSelectToPage, {data:data, changeHash: false});
	        			};
	        			Utils.showAlert('This update has been sent for review.', onOk, 'Confirmation', 'OK');
	        		} else {
	        			$.mobile.back();
	        		}
				};
				//ServiceProxyFactory.getServiceProxy().updateLicenseInfo(data, onUpdateLicense);
				onUpdateLicense();
        	});
    			
            return this; 
        },
        
        /*initInput: function() {
        	var self = this;
        	var licenseId = DataUtils.getLocalStorageData(Constants.LS_KEY_SELECTED_LICENSE_ID);
			var onLicense = function(license){
    			self._priorExpirationYear = license.get("expirationYear");
    			self._priorExpirationMonth = license.get("expirationMonth");
    			self._priorExpirationDay = license.get("expirationDay");
    			self._priorLicenseNum = license.get("licenseNum");
    			self._priorLicenseState = license.get("licenseState");
    			
    			self.$el.find("#yearSelection").val(self._priorExpirationYear).attr('selected', true).siblings('option').removeAttr('selected');   
    			self.$el.find("#yearSelection").selectmenu("refresh");
    			
    			self.$el.find("#monthSelection").val(self._priorExpirationMonth).attr('selected', true).siblings('option').removeAttr('selected');   
    			self.$el.find("#monthSelection").selectmenu("refresh");
    			
    			self.$el.find("#daySelection").val(self._priorExpirationDay).attr('selected', true).siblings('option').removeAttr('selected');   
    			self.$el.find("#daySelection").selectmenu("refresh");
    			
    			self.$el.find("#stateSelection").val(self._priorLicenseState).attr('selected', true).siblings('option').removeAttr('selected');   
    			self.$el.find("#stateSelection").selectmenu("refresh");
    			
//    			self._priorLicenseNum = Utils.replaceStringWithStar(0, self._priorLicenseNum.length - 5, self._priorLicenseNum);
    			self.$el.find("#licenseNumberText").attr("value", self._priorLicenseNum);
    			
        	};
        	ServiceProxyFactory.getServiceProxy().getLicenseById([Number(licenseId)], onLicense);
        },*/
        
        validateInput: function() {
        	var self = this;
        	
        	if (self._priorExpirationYear != self.$el.find("#yearSelection").val()
        			|| self._priorExpirationMonth != self.$el.find("#monthSelection").val()
        			|| self._priorExpirationDay != self.$el.find("#daySelection").val()
        			|| self._priorLicenseNum != self.$el.find("#licenseNumberText").val()
        			|| self._priorLicenseState != self.$el.find("#stateSelection").val()) {
        		return true;
        	}
        	
        	return false;
        	        	
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
    return ChangeLicenseInfoPageView;

});