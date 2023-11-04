const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connect')
const User = require('../user/user.model')
const Auto = require('../auto/auto.model')
const Worker = require('../worker/worker.model')

//Para crear la clase servicio (service) ---TABLA  
class Service extends Model {} 

Service.init(
  {
    tipoServicio: {
      type: DataTypes.STRING, //Tipo servicio (Lavado, encerado, detallado, etc)
    },
    precio: {
        type: DataTypes.FLOAT, 
    },
  },
  {
    sequelize,
    modelName: 'Service',
  }
);

// Define las Relaciones (Llaves Foráneas)
Service.belongsTo(User)
Service.belongsTo(Auto)
Service.belongsTo(Worker)

//Para sincrónizar el modelo con la base de datos
Service.sync({alter: true})

module.exports = Service