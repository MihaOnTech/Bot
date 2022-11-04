const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete-channels')
		.setDescription('Elimina los canales relativos a CONCORD'),
	async execute(interaction) {
        // Delete channels
        const channelList = await interaction.guild.channels.fetch()
        channelList.map( (channel) => {
            if (channel.name == 'Concord' || channel.name == 'iniciar-votacion' ||
                channel.name == 'votar'   || channel.name == 'votaciones-aprobadas'){
                    console.log("Canal " + channel.name + " eliminado");
                    channel.delete(); 
            }
        });

        await interaction.reply({content: "Canales eliminados", ephemeral: true })
        console.log("All CONCORD channels deleted");	
	},
};