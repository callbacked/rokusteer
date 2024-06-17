import React, { useState } from 'react';
import RemoteControl from '../components/RemoteControl';
import ChannelList from '../components/ChannelList';
import KeyboardSearch from '../components/KeyboardSearch';
import './Initial.css';

const Initial = () => {
  const [rokuIp, setRokuIp] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="initial-page flex items-center justify-center min-h-screen bg-gray-900 p-5">
      <div className="content-wrapper flex flex-col items-center w-full">
        <div className="remote-and-carousel flex flex-col items-center w-full max-w-6xl">
          <div className="relative w-full">
            <RemoteControl rokuIp={rokuIp} setRokuIp={setRokuIp} hideIpBar={isSearching} />
            <div className="absolute top-4 right-4">
              <KeyboardSearch rokuIp={rokuIp} isSearching={isSearching} setIsSearching={setIsSearching} />
            </div>
          </div>
          {rokuIp && <ChannelList rokuIp={rokuIp} />}
        </div>
      </div>
    </div>
  );
};

export default Initial;
