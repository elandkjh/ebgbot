import React, { useState } from 'react';
import './ChatComponent.css';

function ChatComponent({ channelUrl }) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    if (question.trim() === '' || !channelUrl) return;

    const res = await fetch(`https://api-255A6E1D-2863-492B-AEAC-C7351A429D95.sendbird.com/v3/group_channels/${channelUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': '14808b2c48020361fef4a425b64a5312d942f07b'
      },
      body: JSON.stringify({
        message_type: 'MESG',
        user_id: 'guest_user',
        message: question
      })
    });

    const data = await res.json();
    setResponse(data.message);
    setQuestion('');
  };

  return (
    <div className="chat-container">
      <div className="chat-input">
        <input
          type="text"
          placeholder="질문을 입력하세요..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleSend}>전송</button>
      </div>
      {response && (
        <div className="chat-response">
          <h3>응답:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default ChatComponent;
