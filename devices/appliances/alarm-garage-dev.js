/**
* This is a sample script that simulates the behaviour of a
* heating system.
*/
const CronJob = require('cron').CronJob;

let running = false;
let motion = false;


function jobOut(client) {
  const job = new CronJob('*/1 * * * * *', function() {
    if (running) {
        if (motion) {
            const appliance = {
                id: 'alarm-garage-dev',
                name: 'Alarm System Garage Appliance',
                source: 'device',
                running: running,
                motion: motion,
                value: "Someone's in da house!!!"
            }
            client.publish('appliances/alarm', JSON.stringify(appliance));
        }
    }
  });
  job.start();
}

function jobIn(message) {
    if(message.name == "Motion Garage Sensor"){
        motion = message.value
    }
    if(message.name == "Alarm System Garage Appliance"){
        running = message.running
    }
}

module.exports.jobOut = jobOut;
module.exports.jobIn = jobIn;