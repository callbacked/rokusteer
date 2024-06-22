import React, { useState, useEffect } from 'react';
import { sendCommand } from '../services/rokuService';
import {
  Home as HomeIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Replay as ReplayIcon,
  Mic as MicIcon,
  Headset as HeadsetIcon,
  PlayArrow as PlayArrowIcon,
  FastForward as FastForwardIcon,
  FastRewind as FastRewindIcon,
  VolumeDown as VolumeDownIcon,
  VolumeOff as VolumeOffIcon,
  VolumeUp as VolumeUpIcon,
  PowerSettingsNew as PowerIcon,
  Star as StarIcon,
  HelpOutline as HelpOutlineIcon,
} from '@mui/icons-material';

const RemoteControl = ({ rokuIp, setRokuIp, hideIpBar }) => {
  const [keyboardControl, setKeyboardControl] = useState(false);
  const [pressedKey, setPressedKey] = useState('');
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const savedRokuIp = localStorage.getItem('rokuIp');
    if (savedRokuIp) {
      setRokuIp(savedRokuIp);
    }

    const handleKeyDown = (e) => {
      if (!keyboardControl) return;
      setPressedKey(e.key);
      switch (e.key) {
        case 'w':
          handleCommand('up');
          break;
        case 'a':
          handleCommand('left');
          break;
        case 's':
          handleCommand('down');
          break;
        case 'd':
          handleCommand('right');
          break;
        case 'Enter':
          handleCommand('select');
          break;
        default:
          break;
      }
    };

    const handleKeyUp = () => {
      setPressedKey('');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setRokuIp, rokuIp, keyboardControl]);

  const handleIpChange = (e) => {
    const newIp = e.target.value;
    setRokuIp(newIp);
    localStorage.setItem('rokuIp', newIp);
  };

  const handleCommand = (command) => {
    if (rokuIp) {
      sendCommand(rokuIp, command);
      console.log(`Sent command: ${command}`);
    } else {
      alert('Please enter the Roku IP address.');
    }
  };

  const handlePowerToggle = () => {
    const command = isPoweredOn ? 'powerOff' : 'powerOn';
    handleCommand(command);
    setIsPoweredOn(!isPoweredOn);
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="flex flex-col items-center bg-transparent h-68vh text-white p-4 rounded-xl ">
      <div className={`header mb-4 text-black ${hideIpBar ? 'invisible' : 'visible'} md:visible`}>
        <input 
          type="text" 
          placeholder="Enter Roku IP" 
          value={rokuIp} 
          onChange={handleIpChange} 
          className="p-2 border rounded text-white bg-gray-700 border-gray-900"
        />
        <HelpOutlineIcon 
          className="ml-2 cursor-pointer text-gray-500" 
          onClick={toggleInstructions} 
        />
      </div>
      {showInstructions && (
        <div className="instructions absolute bg-gray-800 text-white p-4 rounded shadow-lg fade-in z-50">
          <h2 className="text-lg mb-2">How to Find Your Roku's IP Address</h2>
          <p>1. On your Roku remote, press the Home button.</p>
          <p>2. Navigate to Settings.</p>
          <p>3. Select Network.</p>
          <p>4. Select About.</p>
          <p>The IP address will be displayed on the screen.</p>

          <h2 className="text-xl mb-2">Alternatively...</h2>
          <p>Download a network scanning application on your phone</p>
          <p>like <a href="https://www.fing.com/fing-app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Fing</a> to have it display the IP addresses of all your devices.</p>
          <p>Your Roku device should be named "Roku" by default so it will be easy to spot.</p>
          <p className="text-xs font-bold">(not an endorsement to Fing at all, I just find the app useful)</p>

          <button
            className="mt-2 p-2 bg-purple-800 text-white rounded hover:bg-purple-700 transition-colors"
            onClick={toggleInstructions}
          >
            Close
          </button>
        </div>
      )}
      <div className="mb-4 text-white hidden md:block">
        <label>
          <input
            type="checkbox"
            checked={keyboardControl}
            onChange={() => setKeyboardControl(!keyboardControl)}
          />
          Enable Keyboard Control
        </label>
      </div>
      <div className="flex justify-center mb-4">
        <button
          className={`control-button ${pressedKey === 'a' ? 'bg-key-pressed' : ''} w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors`}
          onClick={() => handleCommand('back')}
        >
          <ArrowBackIcon/>
        </button>
        <button
          className={`control-button ${pressedKey === 'Enter' ? 'bg-key-pressed' : ''} w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors`}
          onClick={() => handleCommand('info')}
        >
          <StarIcon />
        </button>
        <button
          className={`control-button ${pressedKey === 'Home' ? 'bg-key-pressed' : ''} w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors`}
          onClick={() => handleCommand('home')}
        >
          <HomeIcon />
        </button>
        <button
          className={`control-button w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors`}
          onClick={handlePowerToggle}
        >
          <PowerIcon />
        </button>
      </div>
      <div className="relative flex flex-col items-center mb-4">
        <button
          className={`control-button rounded-t-lg ${pressedKey === 'w' ? 'bg-key-pressed' : ''} w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors`}
          onClick={() => handleCommand('up')}
        >
          <ArrowUpwardIcon />
        </button>
        <div className="flex justify-center items-center">
          <button
            className={`control-button rounded-l-lg ${pressedKey === 'a' ? 'bg-key-pressed' : ''} w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors`}
            onClick={() => handleCommand('left')}
          >
            <ArrowBackIcon />
          </button>
          <button
            className={`ok-button w-20 h-20 flex justify-center items-center bg-purple-800 border-none m-1 rounded-full shadow-lg hover:bg-purple-700 transition-colors`}
            onClick={() => handleCommand('select')}
          >
            OK
          </button>
          <button
            className={`control-button rounded-r-lg ${pressedKey === 'd' ? 'bg-key-pressed' : ''} w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors`}
            onClick={() => handleCommand('right')}
          >
            <ArrowForwardIcon />
          </button>
        </div>
        <button
          className={`control-button rounded-b-lg ${pressedKey === 's' ? 'bg-key-pressed' : ''} w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors`}
          onClick={() => handleCommand('down')}
        >
          <ArrowDownwardIcon />
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <button className="control-button w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors" onClick={() => handleCommand('instantReplay')}>
          <ReplayIcon />
        </button>
        <button className="control-button w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors" onClick={() => handleCommand('search')}>
          <MicIcon />
        </button>
        <button className="control-button w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors" onClick={() => handleCommand('headphone')}>
          <HeadsetIcon />
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <button className="control-button w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors" onClick={() => handleCommand('Rew')}>
          <FastRewindIcon />
        </button>
        <button className="control-button w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors" onClick={() => handleCommand('play')}>
          <PlayArrowIcon />
        </button>
        <button className="control-button w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors" onClick={() => handleCommand('fwd')}>
          <FastForwardIcon />
        </button>
      </div>
      <div className="flex justify-center">
        <button className="control-button w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors" onClick={() => handleCommand('volumeDown')}>
          <VolumeDownIcon />
        </button>
        <button className="control-button w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors" onClick={() => handleCommand('volumeMute')}>
          <VolumeOffIcon />
        </button>
        <button className="control-button w-16 h-16 flex justify-center items-center bg-purple-800 border-none m-1 rounded shadow-lg hover:bg-purple-700 transition-colors" onClick={() => handleCommand('volumeUp')}>
          <VolumeUpIcon />
        </button>
      </div>
    </div>
  );
};

export default RemoteControl;
