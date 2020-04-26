import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';

import Homepage from './pages/Homepage/Homepage.js';
import Schedule from './pages/Schedule/Schedule.js';
import Profile from './pages/Profile/Profile.js';
import About from './pages/About/About.js';
import Services from './pages/Services/Services.js';
import News from './pages/News/News.js';
import Contact from './pages/Contact/Contact.js';
import Booking from './pages/Booking/Booking.js';
import Success from './pages/Success/Success.js';
import {AuthProvider} from './firebase/Auth.js';
import PrivateRoute from './firebase/PrivateRoute.js';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/success/:type" component={Success} />
              <Route path="/booking/:id">
                <Booking formType='booking'/>
              </Route>
              <Route path="/bill-of-lading/:id"> 
                <Booking formType='bol'/>
              </Route>
              <Route path="/profile" component={Profile} />
              <Route path="/about" component={About} />
              <Route path="/services" component={Services} />
              <Route path="/schedule" component={Schedule} />
              <Route path="/news" component={News} />
              <Route path="/contact" component={Contact} />
              <Route path="/" component={Homepage} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
