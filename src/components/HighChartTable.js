import React, {Component} from 'react';

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