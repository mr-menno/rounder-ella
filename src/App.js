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
import MissingNumber from './components/Exercises/MissingNumber';

function App() {

  let [sidebar, setSidebar ] = useState(false);
  return (
    <Router>
    <Sidebar visible={sidebar}
        onClose={() => setSidebar(!sidebar)}
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
          <Route path='/missingnumber' component={MissingNumber} />
          <Route><Redirect to='/rounding'/></Route>
        </Switch>
      </div>
    </Sidebar>
    </Router>
  );
}

export default App;
