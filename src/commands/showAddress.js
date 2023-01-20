const { SlashCommandBuilder } = require('discord.js');
const census = require('../data/census.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('address')
		.setDescription('Muestra la address del usuario'),
	async execute(interaction) {
        // Show Address
		const userTag = interaction.user.tag;		
		if(census[userTag]){
			const userAddress = census[userTag].address;

			await interaction.reply({content: `My Address: ${userAddress}`, ephemeral: true })
        	console.log("User Address Response: " + userAddress );
		} else {
			await interaction.reply({content: `Usuario ${userTag} no censado!`, ephemeral: true })
			console.log('Usuario no censado!');
		}
		//console.log(userAddress);

        	
	},
};