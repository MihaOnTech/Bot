const { Events } = require('discord.js');
const { createElection } = require('../components/votacion-modal');
const { emitVote } = require('../components/votar-modal');
const votacion = require('../controlers/votacion');
const votar = require('../controlers/votar');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			console.log("Interaccion: " + interaction.customId + " creada por " + interaction.user.username);
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		}
		if (interaction.isButton()){
			console.log("Interaccion: " + interaction.customId + " creada por " + interaction.user.username);
			if (interaction.customId === "botonCrearVotacion"){
				try {
					await interaction.showModal(createElection);
				} catch (error) {
					console.error(error);
					
				}	
			}
			if (interaction.customId.includes("voteButton")){
				try {
					await interaction.showModal(emitVote);
				} catch (error) {
					console.error(error);
				}
			}
		}
		if (interaction.isModalSubmit()){
			console.log("Interaccion: " + interaction.customId + " creada por " + interaction.user.username);
			if (interaction.customId === "createElection"){
				votacion.controller(interaction);	
			}
			if (interaction.customId === "emitVote"){
				votar.modalController(interaction);	
			}
		}
	},
};