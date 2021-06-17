import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import { useShortcut } from '../hooks/useShortcut';
import Home from '../routes/Home';
import Paste from '../routes/Paste';
import About from './About';
import Guide from './Guide';
import StaticEditor from './StaticEditor';

const Main: React.FC = () => {

  const history = useHistory();
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useShortcut(mainRef, ['control', 'p'], evt => {
    evt.preventDefault();
    console.log('control p');
    if (location.pathname !== '/') {
      history.push('/');
    }
  });

  return (
    <main ref={mainRef}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/pastes/:pasteID(\d+)/:lang?">
          <Paste />
        </Route>
        <Route exact path="/guide">
          <Guide />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route>
          <StaticEditor 
            content="Could not find the requested resource"
            isError
          />
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
