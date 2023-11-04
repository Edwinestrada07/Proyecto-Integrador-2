const { Model, DataTypes } = require('sequelize') 
const sequelize = require('../connect');
const User = require('../user/user.model')

//Para crear la clase pay (Pago) ---TABLA   
class Pay extends Model {}

Pay.init(
  {
    metodoPago: {
      type: DataTypes.ENUM,
      values: ['card', 'cash'], 
    },
    fecha: {
      type: DataTypes.DATE,
    },
    monto: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'Pay',
  }
);

// Define las Relaciones (Llaves Foráneas)
Pay.belongsTo(User)

//Para sincrónizar el modelo con la base de datos
Pay.sync({alter: true})

module.exports = Pay