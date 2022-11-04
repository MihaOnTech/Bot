const { Events } = require('discord.js');
const { botonEmitVote } = require('../components/votar-button');


module.exports = {
	name: Events.Me,
	async execute(message) {
		if (message.webhookId == '1036618127124992131'){
            console.log("message by VotBotHook");
            try{
                const embeds = message.embeds;
                //message.edit({ embeds: embeds, components: [botonEmitVote]})
            } catch (error) {
                console.error(error);
            }	
        }
	}
};