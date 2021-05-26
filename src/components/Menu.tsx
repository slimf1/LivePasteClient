import { listLanguages } from 'highlight.js';
import React from 'react';

const Menu: React.FC = () => {
  const languages = listLanguages();

  return (
    <div className="menu">
      <h1>LivePaste</h1>
      <p>Use <kbd>ctrl</kbd> + <kbd>s</kbd> to save</p>
      <form className="paste-form">
        <label htmlFor="language">
          Language
        </label>
        <select name="language">
          {languages.map(language => 
            <option key={language}>
              {language}
            </option>
          )}
        </select>
      </form>
    </div>
  );
}
// Mettre le tuto que sur la page d'accueil => utiliser un ctx?
export default Menu;
