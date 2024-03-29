require('dotenv').config()
const fs = require('node:fs');
const path = require('node:path');
const { ethers } = require("ethers");
const { VocdoniSDKClient, EnvOptions } = require("@vocdoni/sdk");
// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const Sequelize = require('sequelize');
const { Logger } = require('./utils/logger');
const logger = Logger.getInstance();

// Create a new Discord Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


console.log(process.env.DISCORD_TOKEN);
// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);