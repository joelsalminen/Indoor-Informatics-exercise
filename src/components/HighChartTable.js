import React, {Component} from 'react';
import $ from 'jquery';
import BicycleChart from './ChartComponents/BicycleChart';
import Highcharts from 'highcharts';


class HighChartTable extends Component{
	constructor(props){
    super(props);
    this.state = {
      token: "",
      bicycleUtilization: []
    }

    this.tokenInputChangeHandler = this.tokenInputChangeHandler.bind(this);
    this.fetchButtonClickHandler = this.fetchButtonClickHandler.bind(this);
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
  		success: (res) => {
  			this.setState({bicycleUtilization: res});
  			//console.log(this.state.bicycleUtilization);
  			let bicycleData = [];
  			let dates = [];
  			this.state.bicycleUtilization.forEach((item) => {
  				bicycleData.push(100* item.utilization);
  				dates.push(item.timePart + '.4');
  			});
  			
  			new Highcharts.Chart({
          colors: ["#7cb5ec", "#f7a35c"],
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
				<label>token:</label><br/>
				<input onChange={this.tokenInputChangeHandler}></input>
				<button onClick={this.fetchButtonClickHandler}>Hae</button>
				<BicycleChart chart={this.state.chart}/>
			</div>
			);
	}

}


export default HighChartTable;

// Joel Salminen - joel.salminen@gmail.com