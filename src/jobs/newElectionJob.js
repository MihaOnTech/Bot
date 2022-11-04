
const cron = require('node-cron');
const api = require('../utils/api');
const votarEmbed = require('../components/votar-embed');
const botonEmitVote = require('../components/votar-button');
const { cli } = require('winston/lib/winston/config');

let result = 4


async function searchFunction(client){
   console.log("SEARCH FUNCTION");
   const elections = await api.getElections();
   const activeElections = elections.filter(function(election){
      return election.Status == 'OPEN';         
   });
   console.log("activeElections: ", activeElections);

   console.log("Get content");
   const embed = votarEmbed.create(number, question, choice1, choice2, choice3);
   const buttonId = `voteButton_${number}`;
   const button = botonEmitVote.create(buttonId);
   const content = {embeds: [embed], components: [button]};
   
   console.log("Get messages");
   await client.channels.fetch('1037281189792317490').then((channel) => {
      console.log(channel.name);
      channel.messages.fetch({ limit: 100 }).then(messages => {
         console.log(`Received ${messages.size} messages`);
         //Iterate through the messages here with the variable "messages".
         messages.forEach(message => console.log(message.content))
       })
      
      channel.send(content);
})
};

function schedule(client){
   const scheduler = cron.schedule('*/10 * * * * *', searchFunction, { scheduled: false });
   return scheduler;
}

module.exports = { schedule };