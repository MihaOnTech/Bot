const { EmbedBuilder } = require('discord.js');

function create(number, question, choice1, choice2, choice3){
    console.log(`question ${question}
    choice1 ${choice1}
    choice2 ${choice2}
    choice3 ${choice3}`);  
    const embed = new EmbedBuilder()
        //.setColor(0x9B562C)
        .setTitle(`# ${number} # ¡Nueva Votación!`)
        .setDescription('Nueva votación abierta. Pulsa el botón votar para emitir tu voto!')
        .addFields(
            { name: 'Pregunta', value: question},
            //{ name: '\u200B', value: '\u200B' },
            { name: 'Opcion 1 ', value: choice1, inline: true},
            { name: 'Opcion 2 ', value: choice2, inline: true},
            { name: 'Opcion 3 ', value: choice3, inline: true},
        )

    return embed;
}

    
module.exports = { create }