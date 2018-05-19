import React, {Component} from 'react';
import $ from 'jquery'

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

  ComponentDidMount(){

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
  		url: 'https://bubvn4vsm7.execute-api.eu-west-1.amazonaws.com/dev/utilization?startDatetime=2018-04-16T00:00:00.000000Z&endDatetime=2018-04-29T00:00:00.000000Z&groupBy=timePart,equipment_id&timePart=hour&metric=utilization&equipment_id=194',
  		method: 'get', 
  		success: (res) => {
  			this.setState({bicycleUtilization: res});
  			console.log(this.state.bicycleUtilization);
  		},
  		error: (err) => {console.log(err)}
  	});


  }

	render(){
		return(
			<div>
				<p>Token:</p>
				<input onChange={this.tokenInputChangeHandler}></input>
				<button onClick={this.fetchButtonClickHandler}>Hae</button>
			</div>
			);
	}

}


export default HighChartTable;