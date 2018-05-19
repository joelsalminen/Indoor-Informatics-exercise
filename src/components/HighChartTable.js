import React, {Component} from 'react';
import $ from 'jquery'

class HighChartTable extends Component{
	constructor(props){
    super(props);
    this.state = {
      token: ""
    }
    this.tokenInputChangeHandler = this.tokenInputChangeHandler.bind(this);
    this.fetchButtonClickHandler = this.fetchButtonClickHandler.bind(this);
  }

  ComponentDidMount(){

  }

  tokenInputChangeHandler(evt){
  	this.setState({token: evt.target.value})
  }

  fetchButtonClickHandler(evt){
  	$.ajax({

  		headers: {
  			'Authorization': 'Bearer ' + this.state.token
  		},
  		url: 'https://bubvn4vsm7.execute-api.eu-west-1.amazonaws.com/dev/equipment',
  		method: 'get', 
  		success: (res) => {console.log(res)},
  		error: (err) => {console.log(err)}
  	});
  	console.log("hi");
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