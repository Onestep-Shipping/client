import './App.css';

import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import About from './pages/About/About.js';
import { ApolloProvider } from '@apollo/react-hooks';
import AuthProvider from './context/AuthContext.js';
import BOLInstruction from './pages/_admin/BOLInstruction/BOLInstruction.js';
import BookingRequest from './pages/_admin/BookingRequest/BookingRequest.js';
import Companies from './pages/_admin/Companies/Companies.js';
import Contact from './pages/Contact/Contact.js';
import Form from './pages/_user/Form/Form.js';
import Homepage from './pages/Homepage/Homepage.js';
import Invoice from './pages/_admin/Invoice/Invoice.js';
import News from './pages/News/News.js';
import PrivateRoute from './firebase/PrivateRoute.js';
import Profile from './pages/_user/Profile/Profile.js';
import QuoteUpdate from './pages/_admin/QuoteUpdate/QuoteUpdate.js';
import React from 'react';
import Rolling from './pages/_user/Rolling/Rolling.js';
import Schedule from './pages/Schedule/Schedule.js';
import ScheduleFormProvider from "./context/ScheduleFormContext.js";
import Services from './pages/Services/Services.js';
import Success from './pages/_user/Success/Success.js';
import client from './apollo/index.js';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ScheduleFormProvider>
          <Router>
            <div className="App">
              <Switch>
                <Route exact path="/success/:type/:id" component={Success} />
                <Route exact path="/form/:type/:id" component={Form} />
                <Route path="/profile" component={Profile} />
                <Route path="/rolling/:id" component={Rolling} />

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
