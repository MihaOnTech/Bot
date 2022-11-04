const { SlashCommandBuilder, ChannelType } = require('discord.js');
const channelsToCreate = [
	{
		name: 'Iniciar-Votacion',
		type: ChannelType.GuildText
	},
	{
		name: 'Votar',
		type: ChannelType.GuildText
	},
	{
		name: 'Votaciones-Aprobadas',
		type: ChannelType.GuildText
	}
	
];
module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-channels')
		.setDescription('Crea los canales relativos a CONCORD'),
	async execute(interaction) {
        // Create channels
        const newCategory = await interaction.guild.channels.create({ name: 'Concord', type: ChannelType.GuildCategory, position: 0 });
		console.log('Created new category: ' + newCategory.name);
	    channelsToCreate.map( async (channel) => {
			const newChannel = await interaction.guild.channels.create({ name: channel.name, type: channel.type, parent: newCategory });
			//await interaction.guild.channels.cache.add(newChannel);
			console.log(`Created new channel: ${newChannel.name} with id: ${newChannel.id} and type: ${newChannel.type}`);
		});	

        await interaction.reply({content: "Canales creados", ephemeral: true })
        console.log("All CONCORD channels created");	
	},
};