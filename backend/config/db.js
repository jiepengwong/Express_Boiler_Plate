import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
//database wide options
var opts = {
  define: {
      //prevent sequelize from pluralizing table names
      freezeTableName: true
  }
}
export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE, 
  process.env.MYSQL_USER, 
  process.env.MYSQL_PASSWORD, 
  {
    host: process.env.MYSQL_HOST, 
    dialect: 'mysql', 
    define: {
      timestamps: false,
      freezeTableName: true
    }
  }
);
export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // ... (rest of your database setup code)
  }
   
  catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}



