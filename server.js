const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Function to get IP and location details
const getLocationDetails = async (ip) => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching location details:', error);
    return { city: 'Unknown', query: '127.0.0.1' };
  }
};

app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name || 'Guest';
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const locationDetails = await getLocationDetails(clientIp);
  const city = locationDetails.city || 'Unknown';
  const temp = 11; // Placeholder temperature value

  res.json({
    client_ip: clientIp,
    location: city,
    greeting: `Hello, ${visitorName}!, the temperature is ${temp} degrees Celsius in ${city}`
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
