const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
const { getJobsOut } = require('./helpers.js');

// Wait for the client to connect
client.on('connect', function() {
  const jobsOut = getJobsOut();
  // Run every job
  jobsOut.map(job => job(client));
});