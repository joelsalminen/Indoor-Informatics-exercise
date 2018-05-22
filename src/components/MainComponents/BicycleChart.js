import React, {Component} from 'react';
import Highcharts from 'highcharts';
import $ from 'jquery'

class BicycleChart extends Component{
	constructor(props){
		super(props);

		this.drawChart = this.drawChart.bind(this);
	}

	drawChart(data, categories){
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
          	categories: categories
          },
          series: [
          	{
					    name: 'Polkypyörä (pysty) käyttöaste',
					    data: data
					  }, 

          ]
  			});
	}


	componentDidMount(){
		const token = this.props.token;
		$.ajax({

  		headers: {
  			'Authorization': 'Bearer ' + token
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
  			this.drawChart(bicycleData, dates);
  			
  		},


  		error: (err) => {console.log(err)}
  	});
	}

	render(){
		return(
			<div id="bicyclechart"></div>
		);
	};
}

export default BicycleChart;