
angularnodeApp.service('jsonModels', [function () {	
 
  // this is one modelling attempt at the data, it probably lends itself to the best form for a 1:1 on the UI presentation.
  // stocks is an object of objects, with an array inside the inner object
  // each internal object may be stored separately in mongodb, this is a persistence issue
  
  // each key which is a stock symbol is used to access another object which contains the details about particular shares.
  // the array held represents each purchase or remaining fragment of a purchase not sold.
  
  
  // this is a sample it is not complete,  model the data required using this template
  
  //  pps  =  price per share at time of purchase   = Cost  / number
  //  cpps =  current price per share
  
 
  var stocks = [ {
	  "name":"AIB_I",
	 "stocks":  { "Name" : "Allied Irish Banks Group", "HO": "Dublin", 
 
							"held": [ { "dn" : "Allied Irish Banks Group", "index" : "ise", "sy" : "AIBG.I" , "datein" : 01012018, "dateout": "",  
			                 "qty" : 1000 ,"cost": 100.00, "price" : 5, "value" : 100},
							 
							  { "dn" : "Allied Irish Banks Group", "index" : "ise", "sy" : "AIBG.I" , "datein" : 02012018, "dateout": "",  
			                 "qty" : 1000 ,"cost": 150.00, "price" : 6, "value" : 120}
							]
  }}
			 ,{
	  "name":"BOI_I",
	 "stocks":
	  {   "Name" : "Bank of Ireland", "HO": "Dublin", 
 
							"held": [ { "dn" : "Bank of Ireland", "index" : "ise", "sy" : "BIRG.I" , "datein" : 05022017, "dateout": "",  
			                 "qty" : 3000 , "cost": 1000.00, "price" : 4, "value" : 200},
							 
							  { "dn" : "Bank of Ireland", "index" : "ise", "sy" : "BIRG.I" , "datein" : 04072017, "dateout": "",  
			                 "qty" : 3000 , "cost": 1050.00, "price" : 2, "value" : 230}
							]
			 }	 
			 }			 
			 
 ]
 
 
	function getStocks(){  
		return stocks;    // for more marks this would need to get the stocks from the server and mongodb
	}
 
	return {  // expose the service methods to consuming clients
		get :  getStocks 
	}
}]);