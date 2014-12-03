define([ 
        
        "jquery",
        "backbone",
        "com/models/FaqModel",
         
    ], function( $, Backbone, FaqModel ) {

    var FaqModelsCollection = Backbone.Collection.extend( {
        
        /**
         * The Collection constructor
         * @param models
         * @param options
         */
        initialize: function( models, options ) 
        {
            this.sortByFaqId();
        },
        
        /**
         * sort by faqId
         * @param none
         */
        sortByFaqId: function() 
        {
            this.comparator = function(faq) {
                return faq.get("faqId");
            };
        },
        
        model: FaqModel,

    });

    return FaqModelsCollection;

});



