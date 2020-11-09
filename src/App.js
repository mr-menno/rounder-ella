import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import {
  BrowserRouter as Router, 
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';

import {
  Container,
  Segment,
  Input,
  Button,
  Message,
  Icon,
  Menu
} from 'semantic-ui-react';


import Sidebar from './components/Sidebar';
import Rounding from './components/Exercises/Rounding';
import BasicTens from './components/Exercises/BasicTens';
import MissingNumber from './components/Exercises/MissingNumber';
import Multiplications from './components/Exercises/Multiplications';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      release: {}
    }
  }

  componentDidMount() {
    fetch('/release')
      .then(res => res.json())
      .then(data => this.setState({release:data}))
  }

  render() {
    let sidebar = this.state.sidebar||false;
    let setSidebar = (visible) => this.setState({sidebar:visible});

    return (
      <Router>
      <Sidebar visible={sidebar}
          onClose={() => setSidebar(!sidebar)}
          release={this.state.release}
        ><div className="App" style={{paddingTop:'4em'}}>
          <Menu inverted fixed="top">
            <Menu.Item
              icon='bars'
              // active={activeItem === 'home'}
              onClick={() => setSidebar(!sidebar)}
            />
          </Menu>
          <Switch>
            <Route path='/rounding' component={Rounding} />
            <Route path='/multiplications' component={Multiplications} />
            <Route path='/basictens' component={BasicTens} />
            <Route path='/missingnumber' component={MissingNumber} />
            <Route><Redirect to='/rounding'/></Route>
          </Switch>
        </div>
      </Sidebar>
      </Router>
    );
  }
}

export default App;
