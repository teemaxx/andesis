'use strict'

const mqtt = require('mqtt');
const { Client } = require('@elastic/elasticsearch');
const { time } = require('cron');
const elastic_client = new Client({ node: 'http://localhost:9200' })
const mqtt_client = mqtt.connect('mqtt://localhost');

mqtt_client.on('connect', function() {
  
  // Subscribe on all topics
  mqtt_client.subscribe('#');

  mqtt_client.on('message', async function(topic, message) {
    // Parse payload as json
    let payload = JSON.parse(message.toString());
    
    // Replace '/' with '-' in topics
    // Elastic search index must not contain '/'
    topic = topic.replace('/', '-');
    topic = topic.replace('/', '-');
  
    // Add timestamp field in payload
    // to push it into elastic
    const currentDate = new Date();
    let timestamp = currentDate.getUTCDate();
    payload["timestamp"] = currentDate;

    // Create index and push doc
    await elastic_client.index(
      {
      index: topic,
      document: payload
      }
    )  

    // Debug prints-------------------------------------------------
    /*
    // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
    await elastic_client.indices.refresh({ index: topic })

    // Let's search!
    const result = await elastic_client.search({
      index: topic

    })

    console.log(result.hits.hits)
    */
    // Debug prints-------------------------------------------------
     
  });
});
  

