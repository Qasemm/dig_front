import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/Header'
import Home from './components/Home'
import Favorite from './components/Favorite'
import About from './components/About'
export class App extends Component {
  render() {
    return (
      <Router>
        <Header/>
        <div>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/home">
              <Home/>
            </Route>
            <Route path="/fav">
              <Favorite/>
            </Route>
            <Route path="/about">
              <About/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App
