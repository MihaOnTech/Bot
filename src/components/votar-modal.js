const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder } = require('discord.js');

const emitVote = new ModalBuilder()
    .setCustomId('emitVote')
    .setTitle('Votacion')
const electionInput = new TextInputBuilder()
    .setCustomId('electionInput')
    .setLabel("Election Id")
    .setValue("")
    .setStyle(TextInputStyle.Short)
const respuestaInput = new TextInputBuilder()
    .setCustomId('respuestaInput')
    .setLabel("Opcion Seleccionada (1, 2 o 3)")
    .setValue("")
    .setStyle(TextInputStyle.Short)

const passwordInput = new TextInputBuilder()
    .setCustomId('passwordInput')
    .setLabel("Password")
    .setValue("")
    .setStyle(TextInputStyle.Short)

const electionRow = new ActionRowBuilder().addComponents(electionInput);
const respuestaRow = new ActionRowBuilder().addComponents(respuestaInput);
const passwordRow = new ActionRowBuilder().addComponents(passwordInput);
emitVote.addComponents(electionRow, respuestaRow, passwordRow);

module.exports = {
    emitVote: emitVote
};