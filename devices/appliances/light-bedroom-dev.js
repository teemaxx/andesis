/**
* This is a sample script that simulates the behaviour of a
* light.
*/
const CronJob = require('cron').CronJob;

let turned_on = false;


function jobOut(client) {
  const job = new CronJob('*/20 * * * * *', function() {
    if (turned_on) {
        const appliance = {
            id: 'light-bedroom-dev',
            name: 'Light Bedroom Appliance',
            source: 'device',
            turned_on: turned_on,
            value: "The bedroom light is on!"
        }
        client.publish('appliances/light/bedroom', JSON.stringify(appliance));
        
    }
  });
  job.start();
}

function jobIn(message) {
    turned_on = message.turned_on
}

module.exports.jobOut = jobOut;
module.exports.jobIn = jobIn;