module.exports = (sequelize, Sequelize) => {
    const Elections = sequelize.define('elections', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
            
        },
        title: Sequelize.TEXT,
        question: Sequelize.STRING,
        choice_1: Sequelize.STRING,
        choice_2: Sequelize.STRING,
        choice_3: Sequelize.STRING,
        state: Sequelize.STRING,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE
    });
    return Elections;    
}