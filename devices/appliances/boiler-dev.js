/**
* This is a sample script that simulates the behaviour of a
* boiler appliance.
*/
const CronJob = require('cron').CronJob;

let temp = 0;
let running = false;

function jobOut(client) {
 
    const job = new CronJob('*/1 * * * * *', function() {
    if(temp == 40){
        running = false
        // Create object with information about the current appliance
        const appliance = {
            id: 'boiler-dev',
            name: 'Boiler Appliance',
            source: 'device',
            temp: temp,
            value: "Boiler reached its limit!\nWater temperature: " + temp
            }
            client.publish('appliances/boiler', JSON.stringify(appliance));
    }
    if(running){
        // Simulate a change in temperature
        
        temp += 0.5;
        temp = Math.round(temp * 100) / 100;
        // Create object with information about the current appliance
        const appliance = {
        id: 'boiler-dev',
        name: 'Boiler Appliance',
        source: 'device',
        temp: temp,
        value: "Boiler is heating your water!\nWater temperature: " + temp
        }
        client.publish('appliances/boiler', JSON.stringify(appliance));
    }
    if(!running && temp > 0){
        // If boiler is off temperature gradually drops
        temp -= 0.1;
        temp = Math.round(temp * 100) / 100;
    }
});
    
    job.start();
}

// Technically, this sensor does not accept any inputs, but 
// we accept input anyways to simulate the change in temperature
// that will happen if we turn on the heating system. 
function jobIn(message){
    running = message.running
}

module.exports.jobOut = jobOut;
module.exports.jobIn = jobIn;