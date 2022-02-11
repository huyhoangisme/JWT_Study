const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('nodejsbasic', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});
// create function connectDB to check connect successfully
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}

module.exports = connectDB;