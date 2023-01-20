const api = require('../utils/api');
const votarEmbed = require('../components/votar-embed');
const botonEmitVote = require('../components/votar-button');
const { Logger } = require('../utils/logger');const { createLogger } = require('winston');
const logger = Logger.getInstance();

async function controller(interaction) {
    await interaction.deferReply({ ephemeral: true});
    try {
    
        // CREATE CENSUS
        //const client = await api.vocdoniConnect();
        const census = await api.createCensus();
        console.log(census)
        
        // CREATE ELECTION
        const number = 22;
        const question = interaction.fields.getTextInputValue('preguntaInput');
        const choice1 = interaction.fields.getTextInputValue('respuestaInput');
        const choice2 = interaction.fields.getTextInputValue('respuesta2Input');
        const choice3 = interaction.fields.getTextInputValue('respuesta3Input');
        const dateTime = interaction.fields.getTextInputValue('dateTimeInput');
        const election = await api.createElection(number, question, choice1, choice2, choice3, dateTime, census);
        console.log(election);

        const vocdoniClient = await api.vocdoniConnect();
        console.log('Creating Election');
        const electionId = await vocdoniClient.createElection(election);

        console.log(electionId);
        var isCreated = false;
        if(electionId != null ){
            isCreated = true;
        }
        if (!isCreated) {
            logger.error("TIMEOUT Election not created after 15 minutes")
            await interaction.editReply({ content: 'ERROR Creando Votacion', ephemeral: true });
        } else {
            const url = 'https://dev.explorer.vote/processes/show/#/';
            const msg = 'Votación Creada!! ' + url + electionId;
            await interaction.editReply({ content: msg, ephemeral: true });

            // Enviar embed
            const embed = votarEmbed.create(electionId, question, choice1, choice2, choice3);
            const buttonId = `voteButton_${electionId}`;
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
