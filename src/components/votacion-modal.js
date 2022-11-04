const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder } = require('discord.js');

const createElection = new ModalBuilder()
    .setCustomId('createElection')
    .setTitle('Votacion')

const preguntaInput = new TextInputBuilder()
    .setCustomId('preguntaInput')
    .setLabel("Sobre que se vota?")
    .setValue('¿Debería Roy programar todo?')
    .setStyle(TextInputStyle.Short);

const respuestaInput = new TextInputBuilder()
    .setCustomId('respuestaInput')
    .setLabel("Opción 1")
    .setValue("Sí")
    .setStyle(TextInputStyle.Short)

const respuesta2Input = new TextInputBuilder()
    .setCustomId('respuesta2Input')
    .setLabel("Opción 2")
    .setValue('No')
    .setStyle(TextInputStyle.Short)

const respuesta3Input = new TextInputBuilder()
    .setCustomId('respuesta3Input')
    .setLabel("Opción 3")
    .setPlaceholder("Definitivamente sí")
    .setStyle(TextInputStyle.Short)
    .setRequired(false)
const dateTimeInput = new TextInputBuilder()
    .setCustomId('dateTimeInput')
    .setLabel("Fecha inicial y final")
    .setValue("01/01/2022 00:00 - 02/02/2022 00:00")
    //.setPlaceholder("dd/mm/aaaa hh:mm - dd/mm/aaaa hh:mm")
    .setStyle(TextInputStyle.Short)

const quesitonRow = new ActionRowBuilder().addComponents(preguntaInput);
const answer1Row = new ActionRowBuilder().addComponents(respuestaInput);
const answer2Row = new ActionRowBuilder().addComponents(respuesta2Input);
const answer3Row = new ActionRowBuilder().addComponents(respuesta3Input);
const dateTimeRow = new ActionRowBuilder().addComponents(dateTimeInput);

createElection.addComponents(quesitonRow, answer1Row, answer2Row, answer3Row, dateTimeRow);

module.exports = {
    createElection: createElection
};