const { Events } = require('discord.js');
const db = require('../../models');
const electionJob = require('../jobs/getElectionsJob');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute (client) {
		try {	
			console.log('Connecting To DB...');
			await db.sequelize.sync({ force: false });
			console.log('Models Synced');
		} catch (error) {
			console.error(error);
		}
		console.log(`Ready! Logged in as ${client.user.tag}`);
		//const job = electionJob.scheduleJob(client);
		//job.start();
	},
};