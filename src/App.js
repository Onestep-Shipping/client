import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import client from './apollo/index.js';
import { ApolloProvider } from '@apollo/react-hooks';

import PrivateRoute from './firebase/PrivateRoute.js';
import AuthProvider from './context/AuthContext.js';
import ScheduleFormProvider from "./context/ScheduleFormContext.js";

import Homepage from './pages/Homepage/Homepage.js';
import Schedule from './pages/Schedule/Schedule.js';
import About from './pages/About/About.js';
import Services from './pages/Services/Services.js';
import News from './pages/News/News.js';
import Contact from './pages/Contact/Contact.js';

import Booking from './pages/_user/Booking/Booking.js';
import Success from './pages/_user/Success/Success.js';
import Profile from './pages/_user/Profile/Profile.js';
import Rolling from './pages/_user/Rolling/Rolling.js';

import Companies from './pages/_admin/Companies/Companies.js';
import BookingRequest from './pages/_admin/BookingRequest/BookingRequest.js';
import BOLInstruction from './pages/_admin/BOLInstruction/BOLInstruction.js';
import Invoice from './pages/_admin/Invoice/Invoice.js';
import QuoteUpdate from './pages/_admin/QuoteUpdate/QuoteUpdate.js';

import './App.css';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ScheduleFormProvider>
          <Router>
            <div className="App">
              <Switch>
                <Route exact path="/success/:type">
                  <Success />
                </Route>
                <Route exact path="/booking/:id">
                  <Booking formType='booking'/>
                </Route>
                <Route exact path="/bill-of-lading-instruction/:id"> 
                  <Booking formType='bol'/>
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/rolling/:id">
                  <Rolling />
                </Route>

                <Route path="/admin/companies" component={Companies} />
                <Route path="/admin/booking-request" component={BookingRequest} />
                <Route path="/admin/bol-instruction" component={BOLInstruction} />
                <Route path="/admin/invoice" component={Invoice} />
                <Route path="/admin/quote-update" component={QuoteUpdate} />

                <Route path="/about" component={About} />
                <Route path="/services" component={Services} />
                <Route path="/schedule" component={Schedule} />
                <Route path="/news" component={News} />
                <Route path="/contact" component={Contact} />
                <Route path="/" component={Homepage} />
              </Switch>
            </div>
          </Router>
        </ScheduleFormProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
