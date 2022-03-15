/**
* This is a sample script that simulates the behaviour of a
* temperature sensor.
*/
const CronJob = require('cron').CronJob;

let temp = 0;

function jobOut(client) {
  // Get a random decimal number between -10 and 45
  const initialTemp = Math.random() * 35 - 10;
  temp = initialTemp;
  const job = new CronJob('*/10 * * * * *', function() {
    // Get a random decimal number between -0.5 and 0.5
    // to simulate a change in temperature
    const tempChange = Math.random() - 0.5;
    temp += tempChange;
    // Keep only 2 decimals
    temp = Math.round(temp * 100) / 100;
    // Create object with information about the current sensor
    const sensor = {
      id: 'temperature-bedroom-1-dev',
      name: 'Temperature Bedroom 1 Sensor',
      type: 'temperature',
      source: 'device',
      units: 'C',
      value: temp
    }
    client.publish('sensors/temperature', JSON.stringify(sensor));
  });
  job.start();
}

// Technically, this sensor does not accept any inputs, but 
// we accept input anyways to simulate the change in temperature
// that will happen if we turn on the heating system. 
function jobIn(message){
  if (message.value == 'heat') {
    temp += 2;
  } else {
    temp -= 2;
  }
  
  // Keep only 2 decimals
  temp = Math.round(temp * 100) / 100;
}

module.exports.jobOut = jobOut;
module.exports.jobIn = jobIn;