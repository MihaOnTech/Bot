module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
            
        },
        discordId: Sequelize.TEXT,
        name: Sequelize.STRING,
        pubKey: Sequelize.STRING,
        privKey: Sequelize.STRING,
    });
    return Users;    
}