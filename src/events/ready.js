const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute (client) {
		try {	
			// DataBase
			/* //console.log('Connecting To DB...');
			//await db.sequelize.sync({ force: false });
			//console.log('Models Synced'); */


		} catch (error) {
			console.error(error);
		}
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};