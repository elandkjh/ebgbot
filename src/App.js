import React, { useEffect, useState } from 'react';
import { SendBirdProvider, Channel, ChannelList } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import './App.css';
import ChatComponent from './ChatComponent';
import ProfileModal from './ProfileModal';
import { createGroupChannel } from './utils';

function App() {
  const [user, setUser] = useState({
    userId: 'guest_user',
    nickname: 'Guest',
    profileUrl: ''
  });
  const [channelUrl, setChannelUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const initializeChannel = async () => {
      const url = await createGroupChannel();
      setChannelUrl(url);
    };

    initializeChannel();
  }, []);

  return (
    <SendBirdProvider appId={process.env.REACT_APP_SENDBIRD_APP_ID} userId={user.userId} nickname={user.nickname}>
      <div className="app">
        <div className="left-panel">
          <ChannelList />
        </div>
        <div className="right-panel">
          <div className="sendbird-ui-header__middle" onClick={() => setShowModal(true)}>
            {user.nickname}
          </div>
          {channelUrl && <Channel channelUrl={channelUrl} />}
          <ChatComponent channelUrl={channelUrl} />
        </div>
        {showModal && (
          <ProfileModal
            user={user}
            closeModal={() => setShowModal(false)}
            setUser={setUser}
          />
        )}
      </div>
    </SendBirdProvider>
  );
}

export default App;
