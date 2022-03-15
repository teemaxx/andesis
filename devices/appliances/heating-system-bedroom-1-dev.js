/**
* This is a sample script that simulates the behaviour of a
* heating system.
*/
const CronJob = require('cron').CronJob;

let running = false;
let mode = "heat";
let temperature = 0;

function jobOut(client) {
  const job = new CronJob('*/10 * * * * *', function() {
    if (running) {
      if (mode === "heat") {
        temperature += 1;
      } else {
        temperature -= 1;
      }
      
      const appliance = {
        id: 'heating-system-bedroom-1-dev',
        name: 'Heating System Bedroom 1 Appliance',
        type: 'heating',
        source: 'device',
        temperature: temperature,
        mode: mode,
        running: running
      }
      client.publish('appliances/heating', JSON.stringify(appliance));
    }
    
  });
  job.start();
}

function jobIn(message) {
  const { type, value } = message;
  if (type === 'mode') {
    mode = value;
    running = true;
  }
}

module.exports.jobOut = jobOut;
module.exports.jobIn = jobIn;