define([ 
		
		"jquery", 
		"backbone",
		"com/utils/DataUtils",
		"com/models/Constants",
		"com/models/LocalServiceProxy",
		"com/models/RemoteServiceProxy"
	
	], function( $, Backbone, DataUtils, Constants, LocalServiceProxy, RemoteServiceProxy ) {
		
    // Extends Backbone.View
    var ServiceProxyFactory = Backbone.Model.extend({}, {
    	//according the online or offline mode to return remote or local service
		getServiceProxy: function(){
            if(DataUtils.getLocalStorageData(Constants.LS_KEY_IS_ONLINE) == "true"){
				return new RemoteServiceProxy();
            }
            return new LocalServiceProxy();
		},
    });

    // Returns the View class
    return ServiceProxyFactory;

});
