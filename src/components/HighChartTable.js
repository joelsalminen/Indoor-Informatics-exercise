import React, {Component} from 'react';
import BicycleChart from './MainComponents/BicycleChart';
import CardioChart from './MainComponents/CardioChart';


const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5rTTVOVFJHUkVFNE5UVXdOekpGTmpKRlJFTXpORUZCUWtJek9FRTBPVGRHTXpJMU5rUXpNQSJ9.eyJodHRwczovL2luZG9vcmluZm9ybWF0aWNzLmNvbS9jbGFpbXMvZ3JvdXBzIjpbIjUiLCI1XzUiXSwiaHR0cHM6Ly9pbmRvb3JpbmZvcm1hdGljcy5jb20vY2xhaW1zL3JvbGVzIjpbIk9yZ2FuaXphdGlvbkFkbWluIl0sImh0dHBzOi8vaW5kb29yaW5mb3JtYXRpY3MuY29tL2NsYWltcy9wZXJtaXNzaW9ucyI6WyJyZWFkOmVxdWlwbWVudCIsInJlYWQ6cHJlbWlzZSIsInJlYWQ6ZGV2aWNlIiwicmVhZDp1c2VyIiwicmVhZDp1dGlsaXphdGlvbiIsInJlYWQ6d2FpdGluZyIsImVkaXQ6cHJlbWlzZSIsImVkaXQ6ZGV2aWNlIiwiZWRpdDplcXVpcG1lbnQiLCJjcmVhdGU6ZXF1aXBtZW50IiwiZWRpdDp1c2VyIiwiY3JlYXRlOnVzZXIiLCJkZWxldGU6dXNlciIsImRlbGV0ZTplcXVpcG1lbnQiLCJyZWFkOmN1c3RvbWVyIiwiZWRpdDpjdXN0b21lciIsInJlYWQ6bW9kZWwiLCJjcmVhdGU6bW9kZWwiLCJyZWFkOmJyYW5kIiwiY3JlYXRlOmJyYW5kIl0sIm5pY2tuYW1lIjoiZGVtby11c2VyIiwibmFtZSI6ImRlbW9AaW5kb29yaW5mb3JtYXRpY3MuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzI2ZTBmNzkxY2VhZjU3ZTFmMTViZTlmMzI2ODRlNDJkP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGZGUucG5nIiwidXBkYXRlZF9hdCI6IjIwMTgtMDUtMjJUMTA6NTg6MTcuMTg4WiIsImlzcyI6Imh0dHBzOi8vaW5kb29yaW5mb3JtYXRpY3MuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhY2E0MDVmMDUwZDJjNGVlMmUwMGZiNCIsImF1ZCI6ImJJWUhuSUp6cWxhRk9BazJncW9jZHl6eFFLOXZ6bU1GIiwiaWF0IjoxNTI2OTg2Njk5LCJleHAiOjE1MjcwMjI2OTksImF0X2hhc2giOiJUa3llV1NOcGJ0NU95OXZMMkRCMnJRIiwibm9uY2UiOiJmTH5qQUp2NHBDcUVvRm1saDRZWjgycW9Fbkp-QlpfRiJ9.WY-CDdxY7d3RAmwLr0wFtJMdceyp5HX919IxETI9W-SvyIlzr8syxREWaIoG6QIQ-bE7nLlpuQpgFlYp4NKLHOe77ApD9AgC7H0fYylqqpgMtIun6TOQGiwvAPRZCx2DSiO9Cj1u1289lbr01jT666UQJIs75g1_H7veMTDRR67sNbOZFvSU-tlGuuLmFoYsuKw9kBezwC780ApkEN8Zl57zsCiCHh1H7NNbDKH9pWWGL4tXF9jb_8rMiZJlzT63ddZHi4Lu_Q-BPTdyVd70vYXnthG7eTtn5WVWK3kgLNkCVAwow9YgHX0PDhid2vTd4HXAaBOOMn6DrD8JbeZgvg';

class HighChartTable extends Component{
	constructor(props){
    super(props);
    this.state = {
      token: "",
      bicycleUtilization: [],
      equipment: []
    }

    this.tokenInputChangeHandler = this.tokenInputChangeHandler.bind(this);
    this.fetchButtonClickHandler = this.fetchButtonClickHandler.bind(this);
  }



 	componentDidMount(){

 	}


  // Input field for state: token
  tokenInputChangeHandler(evt){
  	this.setState({token: evt.target.value})
  }

  // button functionality, fetches data from api
  fetchButtonClickHandler(evt){
  	


  }

	render(){
		return(
			<div>

				<br/><label>token:</label><br/>
				<input onChange={this.tokenInputChangeHandler}></input>
				<button onClick={this.fetchButtonClickHandler}>Hae</button>
				
				<BicycleChart token={token}/>
				<CardioChart token={token} />
			</div>
			);
	}

}


export default HighChartTable;

// Joel Salminen - joel.salminen@gmail.com