import React from 'react';
import './App.css';
import Menu from './components/Menu';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import Main from './components/Main';
import './themes/vs2015.css';

function App() {
  const history = createBrowserHistory();

  return (
    <>
      <Router history={history}>
        <Menu />
        <Main />
      </Router>
    </>
  );
}

export default App;
