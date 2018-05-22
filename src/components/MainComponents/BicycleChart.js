import React, {Component} from 'react';
import Highcharts from 'highcharts';
import $ from 'jquery'

class BicycleChart extends Component{
	constructor(props){
		super(props);

		this.parseUtilization = this.parseUtilization.bind(this);
		this.drawChart = this.drawChart.bind(this);
	}



	parseUtilization(util){
		let data = [];
		let categories = [];

		util.forEach((item) => {
			// values are multiplied by 100 to get percentage value
			data.push(100* item.utilization);
			categories.push(item.timePart);
		});
		return [data, categories];
	}

	// Draw a chart for bicycle utilization
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
  		success: (utilization) => {

  			let temp = this.parseUtilization(utilization);
  			// bicycle utilization data, used when creating a chart
  			let data = temp[0];
  			// date data for xAxis of the chart
  			let categories = temp[1];

  			
  			// create a new chart
  			this.drawChart(data, categories);
  			
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