import React, {Component} from 'react';

class HighChartTable extends Component{
	constructor(props){
    super(props);
    this.state = {
      token: ""
    }
    this.tokenInputChangeHandler = this.tokenInputChangeHandler.bind(this);
  }

  ComponentDidMount(){

  }

  tokenInputChangeHandler(evt){
  	this.setState({token: evt.target.value})
  }

	render(){
		return(
			<div>
				<p>Token:</p>
				<input onChange={this.tokenInputChangeHandler}></input>
			</div>
			);
	}

}


export default HighChartTable;