const { Events, ChannelType } = require('discord.js');

const channelsToCreate = [
	{
		name: 'Iniciar-Votacion',
		type: ChannelType.GuildText,
	},
	{
		name: 'Votar',
		type: ChannelType.GuildText,
	},
	{
		name: 'Votaciones-Aprobadas',
		type: ChannelType.GuildText,
	}	
	
];

module.exports = {
	name: Events.GuildCreate,
	once: true,
	async execute(guild) {
		console.log(`Joined a new guild ${guild.name}`);
		console.log(guild);
		const newCategory = await guild.channels.create({ name: 'Concord', type: ChannelType.GuildCategory, position: 0 });
		console.log('Created new category: ' + newCategory.name);
	    channelsToCreate.map( async (channel) => {
			const newChannel = await guild.channels.create({ name: channel.name, type: channel.type, parent: newCategory });
			console.log('Created new channel: ' + newChannel.name);
		});	
	},
};