define([ 
		
		"jquery", 
		"backbone",
		"com/views/PageView",
		"com/utils/Utils",
	
	], function( $, Backbone, PageView, Utils ) {
		
    // Extends PagView class
    var CheckPageView = PageView.extend({
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
        	var self = this;
			PageView.prototype.initialize.call(this, options);
			
			//initialize components so it would be ready for the splash page
			this.$el.on("pageshow", function(){
				var check = options.data.check;
				self.render(check);
			});
        },
        
        /**
         * Renders UI for page
         * @param check, url path to image
         */
        render: function(check) 
        {
        	PageView.prototype.render.call(this);
        	
        	if(check) 
        	{
        		this.$el.find("#checkImageWrapper").css("background-image", "url(" + check + ")");
        		var random = Math.round(Math.random() * 1000000);
        		this.$el.find("#routingNum").val(random);
        		var random = Math.round(Math.random() * 1000000);
        		this.$el.find("#checkingNum").val(random);
        	}
        	
        	//accept click handler
        	this.$el.on("click", "#acceptBtn", function(){
        		history.back();
        		return false;
        	});
        	
        	//try again click handler
        	this.$el.on("click", "#againBtn", function(){
        		history.back();
        		
        		setTimeout(function(){
        			var onPhoto = function(image) {
						var data = {check: image};
						$.mobile.changePage("check.html", {data: data});
					};
					Utils.takePhoto(onPhoto);
        		}, 250);
        		return false;
        	});
        	
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
    return CheckPageView;

});