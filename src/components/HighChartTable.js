import React, {Component} from 'react';
import $ from 'jquery';
import Highcharts from 'highcharts';
import CardioChart from './MainComponents/CardioChart';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5rTTVOVFJHUkVFNE5UVXdOekpGTmpKRlJFTXpORUZCUWtJek9FRTBPVGRHTXpJMU5rUXpNQSJ9.eyJodHRwczovL2luZG9vcmluZm9ybWF0aWNzLmNvbS9jbGFpbXMvZ3JvdXBzIjpbIjUiLCI1XzUiXSwiaHR0cHM6Ly9pbmRvb3JpbmZvcm1hdGljcy5jb20vY2xhaW1zL3JvbGVzIjpbIk9yZ2FuaXphdGlvbkFkbWluIl0sImh0dHBzOi8vaW5kb29yaW5mb3JtYXRpY3MuY29tL2NsYWltcy9wZXJtaXNzaW9ucyI6WyJyZWFkOmVxdWlwbWVudCIsInJlYWQ6cHJlbWlzZSIsInJlYWQ6ZGV2aWNlIiwicmVhZDp1c2VyIiwicmVhZDp1dGlsaXphdGlvbiIsInJlYWQ6d2FpdGluZyIsImVkaXQ6cHJlbWlzZSIsImVkaXQ6ZGV2aWNlIiwiZWRpdDplcXVpcG1lbnQiLCJjcmVhdGU6ZXF1aXBtZW50IiwiZWRpdDp1c2VyIiwiY3JlYXRlOnVzZXIiLCJkZWxldGU6dXNlciIsImRlbGV0ZTplcXVpcG1lbnQiLCJyZWFkOmN1c3RvbWVyIiwiZWRpdDpjdXN0b21lciIsInJlYWQ6bW9kZWwiLCJjcmVhdGU6bW9kZWwiLCJyZWFkOmJyYW5kIiwiY3JlYXRlOmJyYW5kIl0sIm5pY2tuYW1lIjoiZGVtby11c2VyIiwibmFtZSI6ImRlbW9AaW5kb29yaW5mb3JtYXRpY3MuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzI2ZTBmNzkxY2VhZjU3ZTFmMTViZTlmMzI2ODRlNDJkP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGZGUucG5nIiwidXBkYXRlZF9hdCI6IjIwMTgtMDUtMjJUMTA6NTg6MTcuMTg4WiIsImlzcyI6Imh0dHBzOi8vaW5kb29yaW5mb3JtYXRpY3MuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhY2E0MDVmMDUwZDJjNGVlMmUwMGZiNCIsImF1ZCI6ImJJWUhuSUp6cWxhRk9BazJncW9jZHl6eFFLOXZ6bU1GIiwiaWF0IjoxNTI2OTg2Njk5LCJleHAiOjE1MjcwMjI2OTksImF0X2hhc2giOiJUa3llV1NOcGJ0NU95OXZMMkRCMnJRIiwibm9uY2UiOiJmTH5qQUp2NHBDcUVvRm1saDRZWjgycW9Fbkp-QlpfRiJ9.WY-CDdxY7d3RAmwLr0wFtJMdceyp5HX919IxETI9W-SvyIlzr8syxREWaIoG6QIQ-bE7nLlpuQpgFlYp4NKLHOe77ApD9AgC7H0fYylqqpgMtIun6TOQGiwvAPRZCx2DSiO9Cj1u1289lbr01jT666UQJIs75g1_H7veMTDRR67sNbOZFvSU-tlGuuLmFoYsuKw9kBezwC780ApkEN8Zl57zsCiCHh1H7NNbDKH9pWWGL4tXF9jb_8rMiZJlzT63ddZHi4Lu_Q-BPTdyVd70vYXnthG7eTtn5WVWK3kgLNkCVAwow9YgHX0PDhid2vTd4HXAaBOOMn6DrD8JbeZgvg';

class HighChartTable extends Component{
	constructor(props){
    super(props);
    this.state = {
      token: "",
      bicycleUtilization: [],
      equipment: []
    }

    this.tokenInputChangeHandler = this.tokenInputChangeHandler.bind(this);
    this.fetchButtonClickHandler = this.fetchButtonClickHandler.bind(this);
  }



 	componentDidMount(){
 		// fetch all equipment data from backend
 		$.ajax({
 			url: 'https://bubvn4vsm7.execute-api.eu-west-1.amazonaws.com/dev/equipment',
 			method: 'get',
 			headers: {
 				'Authorization': 'Bearer ' + token
 			},
 			success: ((data)=>{
 				// set equipment data to a state
 				this.setState({equipment: data});
 				let categories = [];

 				// find all category_ids that have category_id_parent === 3
 				this.state.equipment.forEach((equip)=>{
 					if(equip.equipment_category_id_parent === 3){

 						// only add it to the categories list if it's not already there
 						if (categories.includes(equip.equipment_category_id) === false){			
 							categories.push(equip.equipment_category_id);
 						}
 						
 					}
 				});

 				// base of url for Cardio util fetch
 				let url = 'https://bubvn4vsm7.execute-api.eu-west-1.amazonaws.com/dev/utilization?startDatetime=2018-04-30T00:00:00.000000Z&endDatetime=2018-05-07T00:00:00.000000Z&groupBy=timePart,equipment_id&timePart=week&metric=utilization&category_id=';

 				// adding categories in the end of url:
 				categories.forEach((cat)=>{
 					url = url + cat + ',';
 				});
 				// remove final comma from url to avoid errors
 				url = url.substring(0, url.length -1);

 				// fetch cardio data
 				$.ajax({
 					url: url,
 					method: 'get',
 					headers: {
 						'Authorization': 'Bearer ' + token
 					},
 					success: ((cardio)=>{

 						// parse utilization from cardio data
 						let cardioData = [];
 						let equipNames = [];

 						cardio.forEach((util)=> {
 							cardioData.push(util.utilization);
 							
 							// get equipment names, to be displayed in xAxis of cardio chart
 							let item = this.state.equipment.find((x)=>{
 								return x.id === util.equipment_id;
 							});
 							equipNames.push(item.name);
 						});

 						new Highcharts.Chart({
		          colors: ["#f7a35c"],
		          chart: {
		              type: 'line',
		              renderTo: 'cardiochart'
		          },
		          title: {
		        		text: ''
		    			},
		          yAxis: {
		          	title: {
		          		text: "Cardio-laitteiden käyttöaste-%"
		          	},
		          	labels: {
		          		format: '{value}%'
		          	}
		          },
		          xAxis: {
          			categories: equipNames
          		},

		          series: [
		          	{
							    name: 'Polkypyörä (pysty) käyttöaste',
							    data: cardioData
							  }, 

		          ]
		  			});




 					}),
 					error: ((err)=>{console.log(err)})
 				});







 				
 			}),
 			error: (err => {console.log(err)})
 		});
 	}


  // Input field for state: token
  tokenInputChangeHandler(evt){
  	this.setState({token: evt.target.value})
  }

  // button functionality, fetches data from api
  fetchButtonClickHandler(evt){
  	$.ajax({

  		headers: {
  			'Authorization': 'Bearer ' + this.state.token
  		},
  		url: 'https://bubvn4vsm7.execute-api.eu-west-1.amazonaws.com/dev/utilization?startDatetime=2018-04-16T00:00:00.000000Z&endDatetime=2018-04-30T00:00:00.000000Z&groupBy=timePart,equipment_id&timePart=day&metric=utilization&equipment_id=194',
  		method: 'get', 

  		// on success: set up a chart
  		success: (res) => {
  			this.setState({bicycleUtilization: res});
  			
  			// bicycle utilization data, used when creating a chart
  			let bicycleData = [];

  			// date data for xAxis of the chart
  			let dates = [];


  			this.state.bicycleUtilization.forEach((item) => {
  				// values are multiplied by 100 to get percentage value
  				bicycleData.push(100* item.utilization);
  				dates.push(item.timePart);
  			});
  			
  			// create a new chart
  			new Highcharts.Chart({
          colors: ["#000080"],
          chart: {
              type: 'line',
              renderTo: 'bicyclechart'
          },
          title: {
        		text: ''
    			},
          yAxis: {
          	title: {
          		text: "Käyttöaste-%"
          	},
          	labels: {
          		format: '{value}%'
          	}
          },
          xAxis: {
          	categories: dates
          },
          series: [
          	{
					    name: 'Polkypyörä (pysty) käyttöaste',
					    data: bicycleData
					  }, 

          ]
  			});
  		},


  		error: (err) => {console.log(err)}
  	});


  }

	render(){

		return(
			<div>

				<br/><label>token:</label><br/>
				<input onChange={this.tokenInputChangeHandler}></input>
				<button onClick={this.fetchButtonClickHandler}>Hae</button>
				<div id="bicyclechart"></div>
				<div id="cardiochart"></div>
				<CardioChart />
			</div>
			);
	}

}


export default HighChartTable;

// Joel Salminen - joel.salminen@gmail.com