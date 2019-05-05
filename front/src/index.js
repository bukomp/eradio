import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import {BrowserRouter, Route} from 'react-router-dom'
import FrontPage from './components/FrontPage';
import AdminPage from './components/AdminPage';
import RegistrationForm
  from './components/FrontPage/RegistrationForm';


ReactDOM.render(
    <BrowserRouter>
      <Route path='/' exact component={FrontPage}/>
      <Route path='/admin/' component={AdminPage}/>
      <Route path='/RegistrationForm/' component={RegistrationForm}/>
    </BrowserRouter>,
    document.getElementById('root')
);
