import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Homepage from './pages/Homepage/Homepage.js';
import Schedule from './pages/Schedule/Schedule.js';
import About from './pages/About/About.js';
import Services from './pages/Services/Services.js';
import News from './pages/News/News.js';
import Contact from './pages/Contact/Contact.js';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/services">
            <Services />
          </Route>
          <Route path="/schedule">
            <Schedule />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
