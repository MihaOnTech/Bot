const { Events } = require('discord.js');
const { botonesCrearVotacion } = require('../components/votacion-button');
const { votacionEmbed } = require('../components/votacion-embed');


module.exports = {
	name: Events.ChannelCreate,
	async execute(channel) {
		if (channel.name == 'iniciar-votacion'){
            channel.send({embeds: [votacionEmbed], components: [botonesCrearVotacion]});
        } else if (channel.name == 'votar'){
            // crear webhook
            /* channel.createWebhook({
                name: "VotHook"
            })
                .then(webhook => console.log(`Created webhook ${JSON.stringify(webhook)}`))
                .catch(console.error);
 */
        } else if (channel.name == 'votaciones-aprobadas'){
        
        }
	}
};