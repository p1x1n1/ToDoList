const Sequelize = require ('sequelize');

const sequelize = new Sequelize(
    'trainee-back',
    'postgres',
    '040104',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432
    }
);

module.exports = sequelize;
