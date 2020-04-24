import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage.js';
import Schedule from './pages/Schedule/Schedule.js';
import About from './pages/About/About.js';
import Services from './pages/Services/Services.js';
import News from './pages/News/News.js';
import Contact from './pages/Contact/Contact.js';
import Auth from './pages/Auth/Auth.js';
import Booking from './pages/Booking/Booking.js';
import BookingCompleted from './pages/Booking/BookingCompleted.js';
import {AuthProvider} from './firebase/Auth.js';
import PrivateRoute from './firebase/PrivateRoute.js';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <PrivateRoute
              path="/booking/:id/completed"
              component={BookingCompleted}
            />
            <PrivateRoute path="/booking/:id" component={Booking} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/news" component={News} />
            <Route path="/contact" component={Contact} />
            <Route path="/auth" component={Auth} />
            <Route path="/" component={Homepage} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
