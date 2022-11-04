const api = require('../utils/api');


async function modalController(interaction) {
    await interaction.deferReply({ ephemeral: true});
    try {
        const data = await api.getElections();
        const number = data.length+1;
        const question = interaction.fields.getTextInputValue('preguntaInput');
        const choice1 = interaction.fields.getTextInputValue('respuestaInput');
        const choice2 = interaction.fields.getTextInputValue('respuesta2Input');
        const choice3 = interaction.fields.getTextInputValue('respuesta3Input');
        const dateTime = interaction.fields.getTextInputValue('dateTimeInput');

        await api.createElection(number, question, choice1, choice2, choice3, dateTime);
        await interaction.editReply({ content: 'Votación Creada!!', ephemeral: true });

    } catch (error) {
        console.error(error);
    }	

    return;
}

module.exports = { modalController };
