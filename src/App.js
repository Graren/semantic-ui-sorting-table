import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Table from './components/SearchableTable'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-body">
          <div className="container header-container">
            <p className="header-text">Osc's test</p>
          </div>
          <div className="container table-container">
            <Table />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
