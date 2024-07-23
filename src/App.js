import React, { useEffect, useState } from 'react';
import { SendBirdProvider, Channel, ChannelList } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import './App.css';
import ChatComponent from './ChatComponent';
import { createGroupChannel } from './utils';

function App() {
  const [channelUrl, setChannelUrl] = useState('');

  useEffect(() => {
    const initializeChannel = async () => {
      const url = await createGroupChannel();
      setChannelUrl(url);
    };

    initializeChannel();
  }, []);

  return (
    <SendBirdProvider appId={process.env.REACT_APP_SENDBIRD_APP_ID} userId="guest_user" nickname="Guest">
      <div className="app">
        <div className="left-panel">
          <ChannelList />
        </div>
        <div className="right-panel">
          {channelUrl && <Channel channelUrl={channelUrl} />}
          <ChatComponent channelUrl={channelUrl} />
        </div>
      </div>
    </SendBirdProvider>
  );
}

export default App;
