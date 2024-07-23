export const createGroupChannel = async () => {
    const response = await fetch('https://api-255A6E1D-2863-492B-AEAC-C7351A429D95.sendbird.com/v3/group_channels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': '14808b2c48020361fef4a425b64a5312d942f07b'
      },
      body: JSON.stringify({
        name: 'EBG 지식도우미',
        user_ids: ['guest_user']
      })
    });
  
    const data = await response.json();
    return data.channel_url;
  };
  
  export const updateUser = async (userId, nickname, profileUrl) => {
    const response = await fetch(`https://api-255A6E1D-2863-492B-AEAC-C7351A429D95.sendbird.com/v3/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': '14808b2c48020361fef4a425b64a5312d942f07b'
      },
      body: JSON.stringify({
        nickname,
        profile_url: profileUrl
      })
    });
  
    const data = await response.json();
    return data;
  };
  