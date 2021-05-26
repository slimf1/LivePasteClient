import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../components/Editor';
import { API_BASE_URL } from '../Constants';

const Home: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);
  // TODO : implémenter l'erreur

  const handleSave = (content: string): void => {
    if (content.length === 0) return;
    fetch(`${API_BASE_URL}pastes/`, {
      mode: 'cors', 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: content,
        language: 'c'
      })
    }).then(async response => {
      if (response.status === 201) {
        const postedPaste = await response.json();
        history.push(`/pastes/${postedPaste.pasteID}`);
      } else {
        setError(`${response.status} ${response.statusText}`);
      }
    }).catch(error => {
      setError(error.message);
    });
  }

  return (
    <Editor
      onSave={handleSave}
    />
  );
}

export default Home;
