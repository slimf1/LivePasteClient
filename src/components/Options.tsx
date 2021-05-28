import { listLanguages } from 'highlight.js';
import React, { useRef } from 'react';
import { DEFAULT_LANGUAGE } from '../Constants';

interface OptionsProps {
  onLanguageChange?: (newLanguage: string) => void;
}
const Options: React.FC<OptionsProps> = ({
  onLanguageChange
}) => {
  const languages = listLanguages();
  const languageSelectRef = useRef<HTMLSelectElement>(null);

  const handleChange = () => {
    if (onLanguageChange !== undefined) {
      onLanguageChange(languageSelectRef.current?.value ?? DEFAULT_LANGUAGE);
    }
  }

  return (
    <form 
      className="paste-form"
      onChange={handleChange}
    >
      <label htmlFor="language">
        Language
      </label>
      <select 
        name="language"
        ref={languageSelectRef}
      >
        {languages.map(language => 
          <option key={language}>
            {language}
          </option>
        )}
      </select>
    </form>
  );
}

export default Options;
