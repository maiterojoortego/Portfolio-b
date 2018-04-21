 
angularnodeApp.controller('V2Ctrl', ['$scope' ,  'jsonModels', 
		function($scope, jsonModels  ) {
		 		
 	
		$scope.data = jsonModels.get(2);

		$scope.getFinalResult = function(data2, key){  // refactor to service
			var total = 0;
			var count = 0;
			var len = data2.length;
			for(var i = 0; i < len; i++){
				 
				 
				total +=  data2[i].mark  ; // total = total + data2.mark
				count++;
			}
			return { "result" : (total / count).toFixed(2), "count" : count} ;
		}
		
	}]); // V2Ctrl
	
 
 	
	 