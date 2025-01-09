import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),  // Match the VARCHAR length
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    set(value) { 
      const salt = bcrypt.genSaltSync(10); 
      const hash = bcrypt.hashSync(value, salt); 
      this.setDataValue('password', hash); 
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,        // Or DataTypes.TIMESTAMP
    defaultValue: DataTypes.NOW  // Use Sequelize's NOW function
  }
});

export default User;