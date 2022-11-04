const { Events } = require('discord.js');


module.exports = {
	name: Events.GuildDelete,
	once: true,
	async execute(guild) {
                console.log(`Kicked from guild ${guild.name}`);
                // Delete channels
                const channelList = guild.channels.fetch()
                        .then( (channels) => {
                                channels.map( (channel) => {
                                        if (channel.name == "concord") {
                                                channel.delete();
                                                console.log("Category Concord Deleted");
                                        } 
                                        
                                })
                        })
                        .catch(console.error);
        }
};

/**else if (channel.name == "iniciar-votacion"){
                                        channel.delete();
                                        console.log("Channel iniciar-votacion Deleted");
                                } else if (channel.name == "votar"){
                                        channel.delete();
                                        console.log("Channel votar Deleted");
                                } else if (channel.name == "votaciones-aprobadas"){
                                        channel.delete();
                                        console.log("Channel votaciones-aprobadas Deleted");
                                }  */ 