
/* JavaScript content from js/com/views/AccidentReportPageView.js in folder common */
define([ 
		
		"jquery", 
		"backbone",
		"com/views/PageView",
		"com/views/SideMenuPanel",
		"com/utils/Utils",
		"com/utils/DataUtils",
		"com/utils/TemplateUtils",
		"com/models/Constants",
		"com/models/ServiceProxyFactory",
	
	], function( $, Backbone, PageView, SideMenuPanel, Utils, DataUtils, TemplateUtils, Constants, ServiceProxyFactory) {
		
    // Extends PagView class
    var AccidentReportPageView = PageView.extend({

    	_my_media : "", 
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function() 
        {
        	var self = this;
			PageView.prototype.initialize.call(this);
			
			//initialize components so it would be ready for the splash page
			this.$el.on("pageshow", function(){
				self.render();
			});
        },
        
		stopAudio: function stopAudio() {
		    if (_my_media) {
		        _my_media.stop();
		        _my_media.release();
		    }
		},
        
		playAudio: function playAudio(src) {
        	var self = this;
        	var el = this.$el;
        	
			function onSuccess() {
			    console.log("play/stop Audio():Audio Success");
			}
			
			// onError Callback
			function onError(error) {
			    console.log("play/stop Audio():Audio Failed'");
			}
		
			// Create Media object from src
			_my_media = new Media(src, onSuccess, onError);

		    // Play audio
		    _my_media.play();
		
		},
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
        	var self = this,
        		el = this.$el,
        		reportObj = this._accidentReportObj = 
        			JSON.parse(DataUtils.getLocalStorageData(Constants.LS_KEY_ACCIDENT_REPORT_OBJECT)) || {},
        		removeImgFromArray = function(imgArray, imgSrc) {
	    			imgArray.splice(imgArray.indexOf(imgSrc), 1);
        		},
        		removeLocationImgFromReportObjHandler = function(imgSrc){
        			removeImgFromArray(reportObj.locationImgArray, imgSrc);
        		},
        		removeDamagesImgFromReportObjHandler = function(imgSrc){
        			removeImgFromArray(reportObj.damageImgArray, imgSrc);
        		},
        		// function to fill the image in li
        		fillPhotoToList = function($li, image, removeImgHandler){
		        	var onTemplate = function(html) {
		        		var $img = $(html);
		        		
		        		// fill the image, li and refresh them
		        		$img.find("img").attr("src", image);
		        		$img.find("a").button();
		        		$li.append($img).closest("ul").listview("refresh");
		        		
		        		$img.on("click", "a", function(){
		        			// remove the image in the li
		        			$img.remove();
		        			// remove the image from report object
		        			removeImgHandler($img.find("img").attr("src"));
		        		});
		    		};
		    		TemplateUtils.getTemplate("accident_camera_image", {}, onTemplate);
		        };
		        
		    // init the accident date and time
	        var mot = new moment();
	        var date = mot.format("YYYY-MM-DD");
	        var time = mot.format("h:mm a");
		    self.$el.find("#accidentDate").text(date);
		    self.$el.find("#accidentTime").text(time);
		    
	        // init the accident report object
        	if (!reportObj.locationImgArray) {
        		reportObj.locationImgArray = [];
        		reportObj.damageImgArray = [];
        	}
        	
        	// init page info
        	(function(){
        		if (reportObj.vehicleInfo) {
    				el.find("#vehicleSelect .rightText").html(reportObj.vehicleInfo.vehicleName);
    			}
    			if (reportObj.driverInfo) {
    				el.find("#driverSelect .rightText").html(reportObj.driverInfo.driverName);
    			}
    			
    			// init radios
    			var radioId = reportObj.isInjuried ? "#isInjuried_yes" : "#isInjuried_no";
    			el.find(radioId).attr("checked","checked").checkboxradio("refresh");
    			
    			radioId = reportObj.hasWitnesses ? "#hasWitnesses_yes" : "#hasWitnesses_no";
    			el.find(radioId).attr("checked","checked").checkboxradio("refresh");
    			if(radioId == "#hasWitnesses_yes"){
    				el.find("#witnessName, #testimonyRecord, #addWitness").css("display", "block");
    			}
    			
    			if (reportObj.audioFile != null) {
    				//el.find("#testimonyRecord .rightText").html("Audio Saved");
    			}
    			
    			// fill the photos to the report
    			for (var i=0 ; i< reportObj.locationImgArray.length; i++) {
    				fillPhotoToList(el.find("#reportDocument"), reportObj.locationImgArray[i],
    					removeLocationImgFromReportObjHandler);
    			}
    			for (var i=0 ; i< reportObj.damageImgArray.length; i++) {
    				fillPhotoToList(el.find("#reportDamages"), reportObj.damageImgArray[i],
    					removeDamagesImgFromReportObjHandler);
    			}
    			
    			if (reportObj.policeCase != null) {
    				el.find("#policeText").attr("value",  reportObj.policeCase);
    			}
    			
    			if(reportObj.witnessName != null) {
    				el.find("#witnessName a").html(reportObj.witnessName);
    			}
        	}());
			
        	// init the event handlers
        	(function(){
        		var cameraHandler = function(imgArray, $li, removeImgHandler){	
        			Utils.takePhoto( function(image){
        				// save the image in report obj and fill image in the li
        				imgArray.push(image);
        				fillPhotoToList($li, image, removeImgHandler);
        			});
    			};
        		el.on("tap", "#locationCamera", function() {
        			cameraHandler(reportObj.locationImgArray, el.find("#reportDocument"),
        					removeLocationImgFromReportObjHandler);
            	}).on("tap", "#damagesCamera", function() {
            		cameraHandler(reportObj.damageImgArray, el.find("#reportDamages"),
            				removeDamagesImgFromReportObjHandler);
            	}).on("tap", "#selectedDriver", function() {
            		var vehicleId = reportObj.vehicleInfo && reportObj.vehicleInfo.vehicleId;
            		//if(vehicleId){
            			$.mobile.changePage("select_driver.html?onSelectToPage=accident_report.html", {data: {vehicleId: vehicleId}, transition: "slideup"});
            		//} else {
            		//	Utils.showAlert("Please first select the vehicle involved.", function(){}, 'Error', 'OK');
            		//}
            	});
            	
            	el.on("tap", "#testimonyRecord a", function() {
            		var onAudio = function(mediaFiles){
            	        for (var i = 0, len = mediaFiles.length; i < len; i++) {
            	        	reportObj.audioFile = mediaFiles[i];
            	        	el.find("#savedRecordTip").html("Audio Saved");
            	        	el.find("#testimonyRecordList").css("display", "block");            	      
            	        	el.on("tap", "#playAudio", function(){
            	        		if(reportObj.audioFile.fullPath.indexOf('file:') === 0){
            	        			self.playAudio(reportObj.audioFile.fullPath.substring(5).replace('%20',' '));
            	        		}else{
            	        			self.playAudio(reportObj.audioFile.fullPath);
            	        		}
            	        		
            	        		
            	        	}).on("tap", "#stopAudio", function(){
            	        		self.stopAudio();
            	        	});
            	        }
            		};
            		Utils.captureAudio(1, onAudio);
            	});
            	
            	
            	//setup the button handler
    			el.on("tap", "#submitBtn", function() {
    				var title = Constants.TITLE_SUBMIT;
    				var question = Constants.CONTENT_SUBMIT; 
    				var onOK = function() {
    					/*
    					var onClaim = function(){
        					reportObj = self._accidentReportObj = null;        			
                			$.mobile.changePage("accident_report_confirm.html");
    					};
    					var currentDate = new moment();
    					var data = {
    						"userId": DataUtils.getLocalStorageData(Constants.LS_KEY_USERID),
    						"status": "0",
    						"date": currentDate.format("YYYY-MM-DD"),
    						"locationPics": "",
    						"isInjuries": reportObj.isInjuried ? "Y" : "N",
    						"vehicleId": reportObj.vehicleInfo && reportObj.vehicleInfo.vehicleId,
    						"driverId": reportObj.driverInfo && reportObj.driverInfo.driverId,
    						"damagePics": "",
    						"isWitness": reportObj.hasWitnesses ? "Y" : "N",
    						"witness": "",
    						"policeCase": reportObj.policeCase
    					};
            			ServiceProxyFactory.getServiceProxy().saveClaim(data, onClaim);
            			*/
    					$.mobile.changePage("accident_report_confirm.html");
            		};
            		var onCancel = function() {
            		};
            		Utils.showConfirmationAlert(question, onOK, onCancel, title, null);
    			}).on("tap", "#cancelBtn", function() {
    				reportObj = self._accidentReportObj = null;
    				$.mobile.changePage("home.html", {changeHash: false });
    				return false;
    			});
    			
    			el.on("change", "#isInjuried_yes", function() {
    				reportObj.isInjuried = true;
    			}).on("change", "#isInjuried_no", function() {
    				reportObj.isInjuried = false;
    			});
    			
    			el.on("change", "#hasWitnesses_yes", function( e ) {
    				reportObj.hasWitnesses = true;
    				// show the witness related items
    				el.find("#witnessName, #testimonyRecord, #addWitness").css("display", "block");
    			}).on("change", "#hasWitnesses_no", function( e ) {
    				reportObj.hasWitnesses = false;
    				// hide the witness related items
    				el.find("#witnessName, #testimonyRecord, #addWitness").css("display", "none");
    			});
    			
    			el.find("#policeText").bind( "change", function(event) {
    				reportObj.policeCase = event.target.value;
    			});
    			
    			el.on("tap", "#addWitness", function(){
    				Utils.showAlert("This feature is not available in this version.", function(){}, 
    						"Add Another Witness", Constants.BUTTON_OK);
    			});
        	}());
			
            return this;
        },
        
         /**
         * do any cleanup, remove window binding here
         * @param none
         */
        dispose: function() {
        	PageView.prototype.dispose.call(this);
        	
        	DataUtils.setLocalStorageData(Constants.LS_KEY_ACCIDENT_REPORT_OBJECT, JSON.stringify(this._accidentReportObj));
        },

    });

    // Returns the View class
    return AccidentReportPageView;

});

