import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import StaticEditor from '../components/StaticEditor';
import { API_BASE_URL } from '../Constants';
import { highlight, highlightBlock, listLanguages } from 'highlight.js';

const languages = listLanguages();

interface ParamTypes {
  pasteID: string;
  lang?: string;
}
const Paste: React.FC = () => {
  const editorRef = useRef<HTMLElement>(null);
  const { pasteID, lang } = useParams<ParamTypes>();
  const [pasteData, setPasteData] = useState<any>({content: ''});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const numericPasteID = parseInt(pasteID);
  const history = useHistory();
  
  useEffect(() => {
    fetch(`${API_BASE_URL}pastes/${numericPasteID}`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async response => {
      if (response.status === 200) {
        const paste = await response.json();
        setPasteData(paste);
        if (!lang && languages.includes(paste.language)) {
          history.push(`/pastes/${paste.pasteID}/${paste.language}`)
        }
      } else {
        setErrorMessage(`${response.status} ${response.statusText}`);
      }
    }).catch(error => {
      setErrorMessage(error.message);
    });
  }, [numericPasteID]);

  useEffect(() => {
    if (editorRef.current !== null) {
      if (lang && listLanguages().includes(lang)) {
        const hl = highlight(lang, editorRef.current.innerText);
        editorRef.current.innerHTML = hl.value;
      } else {
        highlightBlock(editorRef.current);
      }
    }
  }, [lang, editorRef.current?.innerText]); // ?

  if (!Number.isInteger(numericPasteID) || numericPasteID <= 0) {
    return <p>Invalid ID</p>
  }

  if (errorMessage !== null) {
    return <StaticEditor
      content={errorMessage}
      isError
    />
  }

  return (
    <StaticEditor
      innerRef={editorRef}
      content={pasteData.content}
      lineNumbers
    />
  );
}

export default Paste;
