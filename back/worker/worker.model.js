const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connect')

//Para crear la clase worker (Empleados) ---TABLA  
class Worker extends Model {}

Worker.init(
  {
    nombre: {
        type: DataTypes.STRING,
    },
    tel: {
        type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Worker',
  }
);

//Para sincrónizar el modelo con la base de datos
Worker.sync({alter: true})

module.exports = Worker
