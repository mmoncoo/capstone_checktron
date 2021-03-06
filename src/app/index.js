import React, {Component} from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './App'

// Containers
import Dashboard from './containers/Dashboard'
import BookingIndex from './containers/BookingIndex'
import NewBooking from './containers/NewBooking'
import BookingForm from './containers/BookingForm'
import Booking from './containers/Booking'
import Login from './containers/Login'
import ApiConnections from './containers/ApiConnections'

// Needed for onTouchTap
injectTapEventPlugin();

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path='booking' component={NewBooking} />
      <Route path='booking_page' component={Booking} />
      <Route path='index' component={BookingIndex} />
      <Route path='booking_form' component={BookingForm} />
      <Route path='dashboard' component={Dashboard} />
      <Route path='api_connections' component={ApiConnections} />
    </Route>
  </Router>,
  document.getElementById('app')
)
