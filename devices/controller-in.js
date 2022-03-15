const mqtt = require('mqtt');
const { findJob } = require('./helpers.js');

// Listen for messages
const client = mqtt.connect('mqtt://localhost');
client.on('connect', function() {
  
  // Subscribe on all topics
  client.subscribe('#');
  // Print incoming messages
  client.on('message', function(topic, message) {
    const payload = JSON.parse(message.toString());
    if (payload.act) {
      // Search for a file in all subdirectories that contains
      // the id in its filename.
      const jobIn = findJob(payload.id);
      // If a file was found, run it
      if (jobIn) {
        jobIn(payload);
      } else {
        console.log('No job found for id:', id);
      }
    }
    
  });
});