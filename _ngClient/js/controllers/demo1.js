 angularnodeApp.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    };
});
angularnodeApp.controller('Demo1Ctrl', ['$scope' ,  'jsonModels','$http', '$timeout', 
		function($scope, jsonModels,$http, $timeout  ) {
 
		//$scope.allStocks = jsonModels.get();	 // Este servicio tiene que contener todos los datos del scope. Copy the stocks from the service (and later the cloud)

		// once we have the data in allStocks we are going to process it to put in totals for the presenation.
		
		// It might make sense to store the totals with the data when saving in a real system, but update as
		// necessary when accessing the data
		
		// we are going to generate new data for each entry in held based on the current share price = cpps
		// value and selling costs etc.
		
		// proof of concept only here 
		
		// we need to write function(s) to generate totals and then call the function(s)
		$http.get("https://localhost:3443/api")
    .then(function(response) {
		console.log(response.data);
		$scope.allStocks = response.data[0].banks;
		$scope.totalBanks=$scope.allStocks.length;
		
	$scope.ppTotal(response.data[0].banks);
	
	$scope.grossprvalue(response.data[0].banks);
	
	$scope.totalsellcost(response.data[0].banks);
	
	$scope.grossprofitloss(response.data[0].banks);
	
    }); 

    
	$scope.refreshData = function() {
		
	$scope.alerts=true;
	$scope.alertsText='Refresh Data Complete!';
	$timeout(function() {$scope.alerts=false}, 3000); 
	


	
		$http.get("https://localhost:3443/api")
    .then(function(response) {
		console.log(response.data);
		$scope.allStocks = response.data[0].banks;
		$scope.totalBanks=$scope.allStocks.length;
		
	$scope.ppTotal(response.data[0].banks);
	
	$scope.grossprvalue(response.data[0].banks);
	
	$scope.totalsellcost(response.data[0].banks);
	
	$scope.grossprofitloss(response.data[0].banks);
	
    });
	}
    $scope.saveData = function() {
		var aux={"banks":$scope.allStocks};
			
	$scope.alerts=true;
	$scope.alertsText='Save Data Complete!';
	$timeout(function() {$scope.alerts=false}, 3000); 
		
		$http.post('https://localhost:3443/apiBanks/5adb430bf36d2843be76b0bc', aux, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(function(response) {
        console.log("si");
	$http.get("https://localhost:3443/api")
    .then(function(response) {
		console.log(response.data);
		$scope.allStocks = response.data[0].banks;
		$scope.totalBanks=$scope.allStocks.length;
		
	$scope.ppTotal(response.data[0].banks);
	
	$scope.grossprvalue(response.data[0].banks);
	
	$scope.totalsellcost(response.data[0].banks);
	
	$scope.grossprofitloss(response.data[0].banks);
	
    });
}, 
function(response) { // optional
        console.log("no")
});
	}
    $scope.resetData = function() {
			
	$scope.alerts=true;
	$scope.alertsText='Reset Data Complete!';
	$timeout(function() {$scope.alerts=false}, 3000); 
		 
		var aux={"banks": [
        {
            "name": "Cash Holding",
            "stocks": {
                "Name": "",
                "HO": "",
                "held": [
                    {
                        "dn": "Cash Holding",
                        "index": "",
                        "sy": "",
                        "datein": "",
                        "dateout": "",
                        "qty": "1",
                        "cost": "100.00",
                        "price": "",
                        "value": "100"
                    }
                ]
            }
        },
        {
            "name": "AIB",
            "stocks": {
                "Name": "Allied Irish Banks Group",
                "HO": "Dublin",
                "price": "5",
                "held": [
                    {
                        "dn": "Allied Irish Banks Group",
                        "index": "ise",
                        "sy": "AIBG.I",
                        "datein": "02012018",
                        "dateout": "",
                        "qty": "1000",
                        "cost": "5000.00",
                        "price": "5",
                        "value": "5000"
                    }
                ]
            }
        },
        {
            "name": "Bank of Ireland",
            "stocks": {
                "Name": "Bank of Ireland",
                "HO": "Dublin",
                "price": "4",
                "held": [
                    {
                        "dn": "Bank of Ireland",
                        "index": "ise",
                        "sy": "BIRG.I",
                        "datein": "01012012",
                        "dateout": "",
                        "qty": "1000",
                        "cost": "4000.00",
                        "price": "4",
                        "value": "4000"
                    },
                    {
                        "dn": "Bank of Ireland",
                        "index": "ise",
                        "sy": "BIRG.I",
                        "datein": "01012013",
                        "dateout": "",
                        "qty": "2000",
                        "cost": "7000.00",
                        "price": "4",
                        "value": "8000"
                    },
                    {
                        "dn": "Bank of Ireland",
                        "index": "ise",
                        "sy": "BIRG.I",
                        "datein": "01012014",
                        "dateout": "",
                        "qty": "3000",
                        "cost": "9000.00",
                        "price": "4",
                        "value": "12000"
                    },
                    {
                        "dn": "Bank of Ireland",
                        "index": "ise",
                        "sy": "BIRG.I",
                        "datein": "01012015",
                        "dateout": "",
                        "qty": "1000",
                        "cost": "3500.00",
                        "price": "4",
                        "value": "4000"
                    },
                    {
                        "dn": "Bank of Ireland",
                        "index": "ise",
                        "sy": "BIRG.I",
                        "datein": "01012016",
                        "dateout": "",
                        "qty": "2000",
                        "cost": "7000.00",
                        "price": "4",
                        "value": "8000"
                    },
                    {
                        "dn": "Bank of Ireland",
                        "index": "ise",
                        "sy": "BIRG.I",
                        "datein": "01012017",
                        "dateout": "",
                        "qty": "3000",
                        "cost": "12000.00",
                        "price": "4",
                        "value": "12000"
                    },
                    {
                        "dn": "Bank of Ireland",
                        "index": "ise",
                        "sy": "BIRG.I",
                        "datein": "01012018",
                        "dateout": "",
                        "qty": "4000",
                        "cost": "22000.00",
                        "price": "4",
                        "value": "16000"
                    }
                ]
            }
        },
        {
            "name": "CRH",
            "stocks": {
                "Name": "CRH.I",
                "HO": "Dublin",
                "price": "30",
                "held": [
                    {
                        "dn": "CHR",
                        "index": "ise",
                        "sy": "CRH.I",
                        "datein": "01012014",
                        "dateout": "",
                        "qty": "3000",
                        "cost": "60000.00",
                        "price": "30",
                        "value": "90000"
                    },
                    {
                        "dn": "CHR",
                        "index": "ise",
                        "sy": "CRH.I",
                        "datein": "01012015",
                        "dateout": "",
                        "qty": "1000",
                        "cost": "25000.00",
                        "price": "30",
                        "value": "30000"
                    },
                    {
                        "dn": "CHR",
                        "index": "ise",
                        "sy": "CRH.I",
                        "datein": "01012016",
                        "dateout": "",
                        "qty": "2000",
                        "cost": "60000.00",
                        "price": "30",
                        "value": "60000"
                    }
                ]
            }
        },
        {
            "name": "Tesco",
            "stocks": {
                "Name": "Tesco",
                "HO": "Dublin",
                "price": "4.5",
                "held": [
                    {
                        "dn": "Tesco",
                        "index": "ftse",
                        "sy": "TSCO",
                        "datein": "01012014",
                        "dateout": "",
                        "qty": "4000",
                        "cost": "12000.00",
                        "price": "4.5",
                        "value": "4000"
                    },
                    {
                        "dn": "Tesco",
                        "index": "ftse",
                        "sy": "TSCO",
                        "datein": "01012015",
                        "dateout": "",
                        "qty": "8000",
                        "cost": "20000.00",
                        "price": "4.5",
                        "value": "8000"
                    },
                    {
                        "dn": "Tesco",
                        "index": "ftse",
                        "sy": "TSCO",
                        "datein": "01012016",
                        "dateout": "",
                        "qty": "2000",
                        "cost": "9000.00",
                        "price": "4.5",
                        "value": "12000"
                    }
                ]
            }
        },
        {
            "name": "Ripple",
            "stocks": {
                "Name": "Ripple",
                "HO": "Dublin",
                "price": "2",
                "held": [
                    {
                        "dn": "Ripple",
                        "index": "coinra",
                        "sy": "ripple-xrp",
                        "datein": "01012012",
                        "dateout": "",
                        "qty": "3000",
                        "cost": "6000.00",
                        "price": "2",
                        "value": "6000"
                    },
                    {
                        "dn": "Ripple",
                        "index": "coinra",
                        "sy": "ripple-xrp",
                        "datein": "01012013",
                        "dateout": "",
                        "qty": "1000",
                        "cost": "2500.00",
                        "price": "2",
                        "value": "2000"
                    },
                    {
                        "dn": "Ripple",
                        "index": "coinra",
                        "sy": "ripple-xrp",
                        "datein": "01012014",
                        "dateout": "",
                        "qty": "2000",
                        "cost": "6000.00",
                        "price": "2",
                        "value": "4000"
                    }
                ]
            }
        }
    ]
};
		$http.post('https://localhost:3443/apiBanks/5adb430bf36d2843be76b0bc', aux, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(function(response) {
        console.log("si");
	$http.get("https://localhost:3443/api")
    .then(function(response) {
		console.log(response.data);
		$scope.allStocks = response.data[0].banks;
		$scope.totalBanks=$scope.allStocks.length;
		
	$scope.ppTotal(response.data[0].banks);
	
	$scope.grossprvalue(response.data[0].banks);
	
	$scope.totalsellcost(response.data[0].banks);
	
	$scope.grossprofitloss(response.data[0].banks);
	
    });
}, 
function(response) { // optional
        console.log("no")
});
	}
		
    //Calculate CPP function
    $scope.refresh = function() {
	$scope.ppTotal($scope.allStocks);
	
	$scope.grossprvalue($scope.allStocks);
	
	$scope.totalsellcost($scope.allStocks);
	
	$scope.grossprofitloss($scope.allStocks);
    }
 
		
    //Calculate CPP function
    $scope.calculateCPP = function(qty,cost) {
      return (Number(cost) / Number(qty));
    }
		
    //Calculate value function
    $scope.calculateValue = function(data,price) {
		if(price){
		return (Number(data.qty) * Number(price));}else{
		return (Number(data.qty) * 100);	
		}
    }
	
    //Calculate Gain/ Loss value function 
	
	$scope.indexAux=0;
    $scope.calculateGainLoss = function(data,price) { 
		var value=Number (data.qty) * Number(price);
		//console.log(value)
		var aux=0;
		if (value > 25000){
			 var GainLoss=Number(data.qty) * Number(price) - Number(data.cost) - (((value-25000)*0.005)+(0.01*25000)+(1.25));
		} else if (value < 2500) {
			 var GainLoss=Number(data.qty) * Number(price) - Number(data.cost) - (25+(1.25));
		} else {
		var GainLoss=Number(data.qty) * Number(price) - Number(data.cost) - (value * 0.01 + 1.25);
		}
		 
      /** function body - complete calculation. The 'data' is our oneRecord value
      that we are passing from our portfolio.html partial from our DB*/
      return GainLoss;
    }
	
	$scope.gainLossTotal = function(stockData) {
		//console.log(stockData.stocks)
      tempStock = stockData.stocks; // copy to tempStock so we can work on it

      var gainLossTotal = 0;
      // Looping through specific stock (e.g. AIB) and caculating the total
      for (var i = 0; i < tempStock.held.length; i++) {
        //We are re-using the calculateGainLoss function here to add to our total
        gainLossTotal += $scope.calculateGainLoss(tempStock.held[i],Number(tempStock.price)); // for the total row
      }
      // store the total back on the object to access in the html
      return gainLossTotal;
    }
	
	//Calculate Total quantity value function
    $scope.tqty = function(stockData) {
		//console.log(stockData.stocks)
      tempStock = stockData.stocks; // copy to tempStock so we can work on it

      var qtyTotal = 0;
      // Looping through specific stock (e.g. AIB) and caculating the total
      for (var i = 0; i < tempStock.held.length; i++) {
        //We are re-using the calculateGainLoss function here to add to our total
        qtyTotal += Number(tempStock.held[i].qty); // for the total row
      }
	  
      // store the total back on the object to access in the html
      return qtyTotal;
    }
 
	
	//porcentaje gl
    $scope.prcGL = function(gl,value) {
		 var prc=(gl/value)*100
      return prc;
    }
 
	
	//purchase price total
	$scope.ppriceTotal=0;
    $scope.ppTotal = function(stocks) {
      for (var j = 0; j < stocks.length; j++) {
		for (var i = 0; i < stocks[j].stocks.held.length; i++) {
		  
			$scope.ppriceTotal+= Number(stocks[j].stocks.held[i].cost); // for the total row
		} 
      } 
		 console.log($scope.ppriceTotal)
    }
	
	$scope.grosspervalue=0;
    $scope.grossprvalue = function(stocks) {
      for (var j = 0; j < stocks.length; j++) {
		for (var i = 0; i < stocks[j].stocks.held.length; i++) {
			
			$scope.grosspervalue+= Number($scope.calculateValue(stocks[j].stocks.held[i],stocks[j].stocks.price)); // for the total row
		} 
      } 
		 console.log($scope.grosspervalue)
    }
	
	$scope.totalsell=0;
    $scope.totalsellcost = function(stocks) {
      for (var j = 1; j < stocks.length; j++) {
		for (var i = 0; i < stocks[j].stocks.held.length; i++) {
			
			$scope.totalsell+= Number($scope.sellcost($scope.calculateValue(stocks[j].stocks.held[i],stocks[j].stocks.price))); // for the total row
		} 
      } 
		 console.log($scope.totalsell)
    }
	
	$scope.grosspl=0;
    $scope.grossprofitloss = function(stocks) {
      for (var j = 1; j < stocks.length; j++) {
		for (var i = 0; i < stocks[j].stocks.held.length; i++) {
			
			
			$scope.grosspl+= $scope.calculateGainLoss(stocks[j].stocks.held[i],Number(stocks[j].stocks.price)); // for the total row
		} 
      } 
		 console.log($scope.grosspl)
    }
	
	
	
	$scope.sellcost = function(value) { 
		if (value > 25000){
			 var sellcost=((value-25000)*0.005)+(0.01*25000)+(1.25);
		} else if (value < 2500) {
			 var sellcost=25+(1.25);
		} else {
			 var sellcost=value*0.01+1.25;
		}
		
      return sellcost;
    }
	
	$scope.alerts=false;
	$scope.alertsText='';
	}]); // Demo1Ctrl
	

 	
	 