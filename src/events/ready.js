const { Events } = require('discord.js');
const { schedule } = require('../jobs/newElectionJob');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		//const job = schedule(client);
		//job.start();
	},
};