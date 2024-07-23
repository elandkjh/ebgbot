import React, { useState } from 'react';
import { updateUser } from './utils';
import './ProfileModal.css';

function ProfileModal({ user, closeModal, setUser }) {
  const [nickname, setNickname] = useState(user.nickname);
  const [profileUrl, setProfileUrl] = useState(user.profileUrl);

  const handleUpdate = async () => {
    const updatedUser = await updateUser(user.userId, nickname, profileUrl);
    setUser(updatedUser);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>프로필 수정</h2>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
        />
        <input
          type="text"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
          placeholder="프로필 이미지 URL"
        />
        <button onClick={handleUpdate}>저장</button>
        <button onClick={closeModal}>취소</button>
      </div>
    </div>
  );
}

export default ProfileModal;
