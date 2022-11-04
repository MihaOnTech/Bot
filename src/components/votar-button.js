const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function create (customId) {
    const botonEmitVote = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(customId)
            .setLabel('Votar!')
            .setStyle(ButtonStyle.Primary)
    );

    return botonEmitVote;
}

module.exports = { create }