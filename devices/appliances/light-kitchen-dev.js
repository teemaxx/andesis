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
            id: 'light-kitchen-dev',
            name: 'Light Kitchen Appliance',
            source: 'device',
            turned_on: turned_on,
            value: "The kitchen light is on!"
        }
        client.publish('appliances/light/kitchen', JSON.stringify(appliance));
        
    }
  });
  job.start();
}

function jobIn(message) {
    turned_on = message.turned_on
}

module.exports.jobOut = jobOut;
module.exports.jobIn = jobIn;