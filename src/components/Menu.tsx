import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  return (
    <div className="menu">
      <h1>LivePaste</h1>

      <div className="icons">
        <Link to="/">
          <i className="fa fa-home" />
        </Link>
        <Link to="/about">
          <i className="fa fa-info-circle" />
        </Link>
        <Link to="/guide">
          <i className="fa fa-question" />
        </Link>
      </div>
    </div>
  );
}

export default Menu;
