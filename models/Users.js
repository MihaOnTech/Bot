'use strict';
module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
            
        },
        discordId: Sequelize.TEXT,
        encyptedWallet: Sequelize.TEXT,
    });
    return Users;    
}