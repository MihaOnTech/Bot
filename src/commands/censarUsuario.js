const { SlashCommandBuilder } = require('discord.js');

const api = require('../utils/api');
const db = require('../utils/db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('censar')
		.setDescription('Añade el usuario al censo, requiere password')
        .addStringOption(option =>
            option.setName('password')
                .setDescription('Introduce Contraseña')
                .setRequired(true)),
	async execute(interaction) {
        
        // Check Census
        const userTag = interaction.user.tag;
        const isCensed = await db.checkCensus(userTag);
        if(isCensed){
            console.log(`${userTag} ya está censado!`);
            interaction.reply({content: `${userTag} ya está censado!`, ephemeral: true });
            return;
        };

        // Create Random Wallet
        const password = interaction.options.getString('password') ?? 'No password provided';
        if(password == 'No password provided'){
            console.log(password);
            await interaction.reply({content: password, ephemeral: true });
            return;
        }
        const wallet = await api.createRandomWallet(password);
        const walletObj = JSON.parse(wallet);

        // Update Census User: EncryptedWallet
        await db.addCensus(userTag, walletObj);

        // Show Address
        const address = walletObj.address;
        await interaction.reply({content: `Added to Census, your address is: ${address}`, ephemeral: true });
            
	},
};