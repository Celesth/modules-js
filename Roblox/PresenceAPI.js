require('dotenv').config();
const axios = require('axios');

// Roblox Security Cookie from .env file
const ROBLOSECURITY = process.env.ROBLOSECURITY;

// Function to fetch Roblox presence
async function fetchRobloxPresence(userIds) {
  try {
    // API Request
    const response = await axios.post(
      'https://presence.roblox.com/v1/presence/users',
      { userIds },
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `.ROBLOSECURITY=${ROBLOSECURITY}`,
        },
      }
    );

    // Handle response
    const userPresences = response.data.userPresences;

    // Format and print the results
    userPresences.forEach(user => {
      console.log(`User ID: ${user.userId}`);
      console.log(`Presence Type: ${
        user.userPresenceType === 0
          ? 'Offline'
          : user.userPresenceType === 1
          ? 'Online'
          : user.userPresenceType === 2
          ? 'In Game'
          : 'In Studio'
      }`);
      console.log(`Last Location: ${user.lastLocation || 'N/A'}`);
      console.log(`Last Online: ${new Date(user.lastOnline).toLocaleString()}`);
      console.log('-----------------------------------');
    });
  } catch (error) {
    console.error('Error fetching Roblox presence:', error.response?.data || error.message);
  }
}

// Example Usage
const userIds = [123456789,1405024015]; // Replace with actual Roblox User IDs
fetchRobloxPresence(userIds);
