define([ 
		
		"jquery", 
		"backbone",
		"handlebars",
		"com/models/Constants",
		"com/utils/Utils",
		"com/utils/TemplateUtils",
	
	], function( $, Backbone, Handlebars, Constants, Utils, TemplateUtils ) {
		
    // Extends Backbone.View
    var PageView = Backbone.View.extend( {
		
		_resizeEvent: "", //string
		_settingsUpdateEvent: "", //string
		loadingCount: 0,
		
        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
			var self = this;
			this.$el.on("pagebeforehide", function(event, data){
				
				self.dispose();
				
			});
			
			//handle when window is resized/orientation change
			var resizeTimerId;
			this._resizeEvent = "resize." + this.cid;
			this._settingsUpdateEvent = Constants.EVENT_SETTINGS_UPDATE + "." + this.cid;
			
			$(window).on(this._resizeEvent, function(){
				
				clearTimeout(resizeTimerId);
				resizeTimerId = setTimeout(function(){
					self._onResize();
				}, Constants.DEFAULT_WINDOW_RESIZE_DELAY); 
				
			}).on(this._settingsUpdateEvent, function(){
				
				self._onSettingsUpdate();
				
			});
        },
        
        pageEvents : {},

        /**
         * Hide page children elements event handler
         */
        hideShowEvent: {
          "pagebeforeshow" : "hidePage",
          "pageNeedShow": "showPage",
        },
        
        /**
         * Load data events handlers
         */
		loadDataEvents : {
			"loaddatastarting" : "startLoadData",
			"loaddatafinished" : "loadDataFinsihed",
		},

		/**
         * Extend loading data and hide page children elements events to dom tree events
         * @param domTreeEvents, dom tree events object
         */
        onHideShowEvents: function(domTreeEvents){
          return $.extend(this.pageEvents, this.hideShowEvent, domTreeEvents);
        },
		
		/**
         * Extend loading data and hide page children elements events to dom tree events
         * @param domTreeEvents, dom tree events object
         */
		onLoadAndHideEvents: function(domTreeEvents){
		  return $.extend(this.pageEvents, this.hideShowEvent, this.onLoadingDataEvent(domTreeEvents));
		},
		
		/**
         * Extend loading data events to dom tree events
         * @param domTreeEvents, dom tree events object
         */
		onLoadingDataEvent: function onLoadingDataEvent(domTreeEvents){
          // copy dome tree events & load data events to page events
          return $.extend(this.pageEvents, this.loadDataEvents, domTreeEvents);
        },
        
		/**
         * Hide the page when before page show event was triggered.
         * @param null
         */
		hidePage : function() {
			$.mobile.loading("show");
		  
			// before page show, hide the children elements of the page element
		    this.hiddenElArray = this.$el.children();
	        this.hiddenElArray.hide();
		},

		/**
         * Trigger by 'loaddatastarting' event, show the loading icon and increase
         * the loading counter.
         * @param null
         */
		startLoadData : function() {
			// show loading icon
			$.mobile.loading("show");
			
			this.loadingCount = this.loadingCount ? this.loadingCount + 1 : 1;
			
			// console.log("startLoadData: " + this.loadingCount);
		},

		/**
         * Trigger by 'loaddatafinished' event, hide the loading icon and reduce
         * the loading counter. When counter was 0 then show the hidden elements
         * @param null
         */
		loadDataFinsihed : function() {
			if (!this.loadingCount || (--this.loadingCount) == 0) {
			  // after data loaded, show entire page
			  this.$el.trigger("pageNeedShow");
				
			  // hide loading icon
			  $.mobile.loading("hide");
				
				// console.log("loadDataFinsihed: " + this.loadingCount);
			}
		},

		showPage: function(){
		  // after data loaded, show entire page
		  this.hiddenElArray && (this.hiddenElArray.show());
		  // hide loading icon
          $.mobile.loading("hide");
		},

        /**
         * Renders the UI
         * @param none
         */
        render: function() {
            return this; //Maintains chainability
        },
        
        /**
         * called when the window is resized or changed orientation
         * to be overridden by child classes
         * @param none
         */
        _onResize: function() {
        	$(window).trigger("scroll");
        },
        
        /**
         * called when the settings are updated
         * to be overridden by child classes
         * @param none
         */
        _onSettingsUpdate: function() { },
        
        /**
         * do any cleanup, remove window binding here
         * @param none
         */
        dispose: function() {
        	$(window).off(this._resizeEvent).off(this._settingsUpdateEvent);
        },

    });

    // Returns the View class
    return PageView;

});