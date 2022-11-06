const api = require('../utils/api');
const time = require('../utils/time');
const votarEmbed = require('../components/votar-embed');
const botonEmitVote = require('../components/votar-button');
const { Logger } = require('../utils/logger');const { createLogger } = require('winston');
const logger = Logger.getInstance();

async function controller(interaction) {
    await interaction.deferReply({ ephemeral: true});
    try {
        let data = await api.getElections();
        const number = data.length+1;
        const question = interaction.fields.getTextInputValue('preguntaInput');
        const choice1 = interaction.fields.getTextInputValue('respuestaInput');
        const choice2 = interaction.fields.getTextInputValue('respuesta2Input');
        const choice3 = interaction.fields.getTextInputValue('respuesta3Input');
        const dateTime = interaction.fields.getTextInputValue('dateTimeInput');

        const newElection = await api.createElection(number, question, choice1, choice2, choice3, dateTime);
        
        const numTries = 3;
        let isCreated = false;
        let lastID = data[data.length - 1].ID;
        const newID = newElection.ID;
        console.log(`last record ID: ${lastID}`);
        console.log(`new election ID: ${newID}`);
        for (i=0;i<numTries; i++) {
            console.log(`try:${i}`);
            await time.sleep(1*1000);
            //setTimeout(1*60*1000);
            data = await api.getElections();
            if(newID == data[(data.length - 1)].ID) {
                isCreated = true;
                console.log(`Election is created: ${isCreated}`);
                break;
            };
            console.log(`last election ID: ${data[(data.length - 1)].ID}`);
        };

        if (!isCreated) {
            logger.error("TIMEOUT Election not created after 15 minutes")
            await interaction.editReply({ content: 'ERROR Creando Votacion', ephemeral: true });
        } else {
            await interaction.editReply({ content: 'Votación Creada!!', ephemeral: true });

            // Enviar embed
            const embed = votarEmbed.create(number, question, choice1, choice2, choice3);
            const buttonId = `voteButton_${number}`;
            const button = botonEmitVote.create(buttonId);
            const content = {embeds: [embed], components: [button]};
            await interaction.client.channels.fetch('1038063972525543464').then((channel) => {
                channel.send(content);
            })
        }

    } catch (error) {
        logger.error(`VOTACION CONTROLLER ${error}`);
    }	

    return;
}

module.exports = { controller };
