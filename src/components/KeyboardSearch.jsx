import React, { useState, useRef, useEffect } from 'react';
import { sendCommand } from '../services/rokuService';
import { Keyboard as KeyboardIcon, Close as CloseIcon } from '@mui/icons-material';
import './KeyboardSearch.css';

const KeyboardSearch = ({ rokuIp, isSearching, setIsSearching }) => {
  // const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef(null);

  const handleSearchChange = async (e) => {
    const newText = e.target.value;
    const lastChar = newText.slice(-1);

      if (newText.length < searchText.length) {
        // Detect backspace
        await sendCommand(rokuIp, 'Backspace');
      } else if (lastChar === ' ') {
          await sendCommand(rokuIp, 'Lit_%20');
        } else {
          await sendCommand(rokuIp, `Lit_${lastChar}`);
        }

        setSearchText(newText);
      };
    
      const handleKeyDown = async (e) => {
        if (e.key === 'Backspace' && searchText.length === 0) {
          await sendCommand(rokuIp, 'Backspace');
        }
      };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearching(false);
    setSearchText('');
  };

  const handleBlur = () => {
    setIsSearching(false);
    setSearchText('');
  };

  useEffect(() => {
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  return (
    <div className="keyboard-search">
      <button className="keyboard-button" onClick={() => setIsSearching(!isSearching)}>
        {isSearching ? <CloseIcon style={{ fontSize: 24, color: 'white' }} /> : <KeyboardIcon style={{ fontSize: 24, color: 'white' }} />}
      </button>
      {isSearching && (
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder="Type your search here"
            className="search-input"
            ref={inputRef}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};

export default KeyboardSearch;
