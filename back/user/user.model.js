const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connect')

//Para crear la clase usuario (user) ---TABLA     
class User extends Model {} 

User.init(
  {
    nombre: {
      type: DataTypes.STRING,
    },
    direccion: {
        type: DataTypes.STRING,
    },
    tel: {
        type: DataTypes.STRING, 
    },
    correo: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    states: {
      type: DataTypes.ENUM,
      values: ['active', 'pending']
    }
  },
  {
    sequelize,
    modelName: 'User',
  }
);

//Para sincrónizar el modelo con la base de datos
User.sync({alter: true})

module.exports = User