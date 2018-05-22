import React, {Component} from 'react';
import Highcharts from 'highcharts';
import $ from 'jquery';

class CardioChart extends Component {
	constructor(props){
		super(props)

		this.findCategoryIds = this.findCategoryIds.bind(this);
		this.createUrl = this.createUrl.bind(this)
		this.parseUtilization = this.parseUtilization.bind(this);
		this.drawChart = this.drawChart.bind(this);
	}


	// find categories basd on category_id_parent
	findCategoryIds(parent_id){
		let categories = [];

		// find all category_ids that have category_id_parent === 3
		this.state.equipment.forEach((equip)=>{
			if(equip.equipment_category_id_parent === parent_id){

				// only add it to the categories list if it's not already on the list
				if (categories.includes(equip.equipment_category_id) === false){			
					categories.push(equip.equipment_category_id);
				}
				
			}
		});

		return categories;
	}


	// creates an url that is used to fetch cardio data
	createUrl(categories){
		// base of url for Cardio util fetch
		let url = 'https://bubvn4vsm7.execute-api.eu-west-1.amazonaws.com/dev/utilization?startDatetime=2018-04-30T00:00:00.000000Z&endDatetime=2018-05-07T00:00:00.000000Z&groupBy=timePart,equipment_id&timePart=week&metric=utilization&category_id=';

		// adding equipment categories in the end of url:
		categories.forEach((cat)=>{
			url = url + cat + ',';
		});
		// remove final comma from url to avoid errors
		url = url.substring(0, url.length -1);
		return url;
	}

	// parses utilization data into an array and finds categories of xAxis based on equipment ids
	parseUtilization(cardio){
		// data used to draw the cardio chart
		let data = [];

		// x axis categories
		let xCategories = [];
		cardio.forEach((util)=> {
			data.push(util.utilization);
			
			// get equipment names, to be displayed in xAxis of cardio chart
			// find equimpent from full equipment list, where id matches with util.equipment_id
			let item = this.state.equipment.find((x)=>{
				return x.id === util.equipment_id;
			});
			xCategories.push(item.name);
		});

		return [data, xCategories];

	}



	drawChart(data, categories){
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
		// fetch equipment data from backend
		const token = this.props.token;
 		$.ajax({
 			url: 'https://bubvn4vsm7.execute-api.eu-west-1.amazonaws.com/dev/equipment',
 			method: 'get',
 			headers: {
 				'Authorization': 'Bearer ' + token
 			},
 			success: ((data)=>{
 				// set equipment data to a state
 				this.setState({equipment: data});

 				// Find category_ids that have a specific category_parent_id
 				let categories = this.findCategoryIds(3);
 				

 				// get url that is used to fetch data 
 				let url = this.createUrl(categories);

 				// fetch cardio data
 				$.ajax({
 					url: url,
 					method: 'get',
 					headers: {
 						'Authorization': 'Bearer ' + token
 					},
 					success: ((cardioData)=>{

 						// parse utilization from cardio data
 						let temp = this.parseUtilization(cardioData);
						let data = temp[0]; 						
 						let equipNames = temp[1];

 						// draw CardioChart
 						this.drawChart(data, equipNames);
 					}),
 					
 					error: ((err)=>{console.log(err)})
 				});

 			}),
 			error: (err => {console.log(err)})
 		});
	}

	render(){
		return(
			<div id="cardiochart"></div>
		);

	}
}

export default CardioChart;

// Joel Salminen - joel.salminen@gmail.com