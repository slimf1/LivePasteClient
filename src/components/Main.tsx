import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../routes/Home';
import Paste from '../routes/Paste';
import About from './About';
import Guide from './Guide';
import StaticEditor from './StaticEditor';

const Main: React.FC = () => {
  return (
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
  );
}

export default Main;
