const api = require('../utils/api');


async function modalController(interaction) {
    await interaction.deferReply({ ephemeral: true});
    try {
        const electionId = interaction.fields.getTextInputValue('electionInput');
        const respuesta = interaction.fields.getTextInputValue('respuestaInput');
        const password = interaction.fields.getTextInputValue('passwordInput');

        const userTag = interaction.user.tag

        const voteId = await api.voterConnect(electionId, userTag, password, respuesta);
        await interaction.editReply({ content: `Voto emitido! Id:${voteId}`, ephemeral: true });

    } catch (error) {
        console.error(error);
    }	

    return;
}

module.exports = { modalController };
