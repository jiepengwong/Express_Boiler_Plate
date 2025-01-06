import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'your_host',
  dialect: 'mysql' 
});

// ... (rest of the code) ...