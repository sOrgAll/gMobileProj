define([ 
        
        "jquery", 
        "backbone",
        "com/views/PageView",
        "com/utils/Utils",
        "com/utils/TemplateUtils",
        "com/models/Constants",
        "com/models/FaqModel",
        "com/collections/FaqModelsCollection",
        "com/models/ServiceProxyFactory"
    
    ], function( $, Backbone, PageView, Utils, TemplateUtils, Constants, FaqModel, FaqModelsCollection, ServiceProxyFactory) {
        
    // Extends PagView class
    var FaqPageView = PageView.extend({
        
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
            /*this.$el.on("pageshow", function(){*/
            /*self.render();*/
            /*});*/
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
            PageView.prototype.render.call(this);            

            var self = this;      
        	self.$el.trigger("loaddatastarting");

        	/*
            var onData = function(faqs) 
            {
                $.mobile.loading("hide");
                var onTemplate = function(html) {                    
                    self.$el.find("#faqList").html(html).trigger("create");
                };
                
                var items = [];
                faqs.each(function(faq) {
                        var context = {faqId: faq.get("faqId"), question: faq.get("question"), answer: faq.get("answer") };
                    items.push(context);
                });
                var params = {faqs: items};
                TemplateUtils.getTemplate("faqs_list_row", params, onTemplate);

                self.$el.trigger("loaddatafinished");
            };
            ServiceProxyFactory.getServiceProxy().getFaqs(onData);
            */
        	self.$el.trigger("loaddatafinished");
        	
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
    return FaqPageView;

});
