const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const botonesCrearVotacion = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('botonCrearVotacion')
            .setLabel('Iniciar Proceso Participativo!')
            .setStyle(ButtonStyle.Primary)
    );

module.exports = {
    botonesCrearVotacion: botonesCrearVotacion
}