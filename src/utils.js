// utils.js

export const createGroupChannel = async () => {
  const response = await fetch('https://api-255A6E1D-2863-492B-AEAC-C7351A429D95.sendbird.com/v3/group_channels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': '14808b2c48020361fef4a425b64a5312d942f07b'
    },
    body: JSON.stringify({
      name: "Sample Group Channel",
      user_ids: ["guest_user"],
      is_distinct: true
    })
  });
  const data = await response.json();
  return data.channel_url;
};
