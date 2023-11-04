const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connect')

//Para crear la clase automovil ---TABLA  
class Auto extends Model {}

Auto.init(
  {
    numeroPlaca: {
      type: DataTypes.STRING, 
      unique: true, // Si deseas que el número de placa sea único
    },
    marca: {
        type: DataTypes.STRING, 
    },
    modelo: {
        type: DataTypes.STRING, 
    },
    tipoVehiculo: {
        type: DataTypes.STRING, 
    },
  },
  {
    sequelize,
    modelName: 'Auto',
  }
);

//Para sincrónizar el modelo con la base de datos
Auto.sync({alter: true})

module.exports = Auto