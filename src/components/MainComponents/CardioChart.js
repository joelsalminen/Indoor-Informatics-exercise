import React, {Component} from 'react';
import Highcharts from 'highcharts';
import $ from 'jquery';

class CardioChart extends Component {
	constructor(props){
		super(props)

		this.DrawChart = this.DrawChart.bind(this);
	}



	DrawChart(){
		console.log("drawchart");
	}


	componentDidMount(){
		// fetch all equipment data from backend
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
 						this.DrawChart();



 					}),
 					error: ((err)=>{console.log(err)})
 				});







 				
 			}),
 			error: (err => {console.log(err)})
 		});
	}

	render(){
		return(
			<p> Hello from CardioChart</p>
		);

	}
}

export default CardioChart;

// Joel Salminen - joel.salminen@gmail.com