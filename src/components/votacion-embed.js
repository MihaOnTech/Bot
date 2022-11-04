const { EmbedBuilder } = require('discord.js');

const votacionEmbed = new EmbedBuilder()
    //.setColor(0x9B562C)
    .setTitle('Cómo crear una nueva votación')
    .setDescription('Sigue los siguientes pasos para iniciar un nuevo proceso participativo')
    .addFields(
        { name: '1. Pulsa el boton', value: 'Esto abrira una ventana en la que deberas introducir los datos pertinentes' },
        //{ name: '\u200B', value: '\u200B' },
        { name: '2. Rellena los campos ', value: 'Escribe la pregunta que deseas realizar y introduce las posibles respuestas, solo 2 de los 3 campos son necesarios, en caso de no tener una tercera opcion deja el ultimo campo vacio.' },
        { name: '3. Haz click en el boton enviar', value: 'Una vez enviada la informacion es solo cuestion de minutos que el nuevo proceso participativo que acabas de crear aparezca en el canal #votar'}
    )

module.exports = {
    votacionEmbed: votacionEmbed
}