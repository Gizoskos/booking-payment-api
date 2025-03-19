const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: console.log,
});

async function migrate() {
    try {
        console.log('Running migrations...');
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });  // Bu satır eksik tabloları oluşturur
        console.log('Migrations completed!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
