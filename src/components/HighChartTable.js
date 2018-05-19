import React, {Component} from 'react';

class HighChartTable extends Component{
	constructor(props){
    super(props);
    this.state = {
      
    }
    this.tokenChangeHandler = this.tokenChangeHandler.bind(this);
  }

  ComponentDidMount(){

  }

  tokenChangeHandler(){
  	console.log("token change");
  }

	render(){
		return(
			<div>
				<p>Token:</p>
				<input onChange={this.tokenChangeHandler}></input>
			</div>
			);
	}

}


export default HighChartTable;