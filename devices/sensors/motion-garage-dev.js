/**
* This is a sample script that simulates the behaviour of a
* temperature sensor.
*/
const CronJob = require('cron').CronJob;

let motion = false;

function jobOut(client) {
  // Get a random decimal number between -10 and 45
  const initialMotion = Math.random() < 0.5;
  motion = initialMotion;
  const job = new CronJob('*/8 * * * * *', function() {
    // Get a random decimal number between -0.5 and 0.5
    // to simulate a change in temperature
    const motionChange = Math.random() < 0.5;
    motion = motionChange;
    
    // Create object with information about the current sensor
    const sensor = {
      id: 'motion-garage-dev',
      name: 'Motion Garage Sensor',
      type: 'motion',
      source: 'device',
      value: motion
    }
    client.publish('sensors/motion', JSON.stringify(sensor));
  });
  job.start();
}

// Technically, this sensor does not accept any inputs, but 
// we accept input anyways to simulate the change in temperature
// that will happen if we turn on the heating system. 
function jobIn(message){

}

module.exports.jobOut = jobOut;
module.exports.jobIn = jobIn;