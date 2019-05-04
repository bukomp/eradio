import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import {BrowserRouter, Route} from 'react-router-dom'
import FrontPage from './components/FrontPage';
import AdminPage from './components/AdminPage';


ReactDOM.render(
    <BrowserRouter>
      <Route path='/' exact component={FrontPage}/>
      <Route path='/admin/' component={AdminPage}/>
    </BrowserRouter>,
    document.getElementById('root')
);
