import React, { Component } from 'react';
import './App.css';
import HighChartTable from './components/HighChartTable'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  ComponentDidMount(){

  }

  render() {
    return (
      <div className="App">
        <HighChartTable/>
      </div>
    );
  }
}

export default App;
