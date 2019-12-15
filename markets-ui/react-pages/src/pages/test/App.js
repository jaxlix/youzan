import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import API from '@/services/api'
import { post, get } from '@/http/http';
import './App.css';
import 'zent/css/index.css';

import Index from '@/pages/test/index/index';
import Add from '@/pages/test/add/add';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          header
        </header>
        <Router>
          <div>
            <Route path='/' component={Add} />
            <Route path='/add' component={Add} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
