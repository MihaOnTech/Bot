module.exports = (sequelize, Sequelize) => {
    const Votes = sequelize.define('votes', {
        uuid:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
            
        },
        electionId: Sequelize.INTEGER,
        userId: Sequelize.INTEGER,
        content: Sequelize.TEXT
    });
    return Votes;    
}