import { Sequelize } from 'sequelize';

const connectToDatabase = async () => {
  try {
    const sequelize = new Sequelize(
      process.env.MYSQL_DATABASE, 
      process.env.MYSQL_USER, 
      process.env.MYSQL_PASSWORD, 
      {
        host: process.env.MYSQL_HOST, 
        dialect: 'mysql', 
      }
    );

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // ... (rest of your database setup code)

    return sequelize; 
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectToDatabase;