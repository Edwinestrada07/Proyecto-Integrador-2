const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connect')
//const User = require('../user/user.model')
const Service = require('../service/service.model') 

//Para crear la clase usuario x servicio (userxservice) (Carrito) 
class UserXService extends Model {}

UserXService.init(
  {
    cantidad: {
      type: DataTypes.INTEGER, //Para definir la cantidad del producto
    },
  },
  {
    sequelize,
    modelName: 'UserXService',
  }
);

// Define las Relaciones (Llaves Foráneas)
//UserXService.belongsTo(User)
UserXService.belongsTo(Service)

//Para sincrónizar el modelo con la base de datos
UserXService.sync({alter: true})

module.exports = UserXService