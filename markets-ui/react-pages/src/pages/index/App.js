import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import 'zent/css/index.css';

import Login from '@/pages/index/login';
import Index from '@/pages/index/index/index';
import Add from '@/pages/index/add/add';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="App-content">
            <Route path='/templates' exact component={Login} />
            <Route path='/index' component={Index} />
            <Route path='/add' component={Add} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
