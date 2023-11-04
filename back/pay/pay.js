const express = require('express')
const app = express.Router()
const Pay = require('./pay.model') 


//**************MÉTODO GET*************************
// Ruta para obtener todos los pagos
app.get('/pay', async function (req, res) {
    try {
      const pay = await Pay.findAll()
      res.json(pay)
    } catch (error) {
      console.error('Error al obtener pagos:', error)
      res.status(500).json({ error: 'Error al obtener pagos' })
    }
})

// Ruta para obtener un pago por su ID
app.get('/pay/:id', async function (req, res) {
    const { id } = req.params
  
    try {
      const pay = await Pay.findByPk(id)
      if (!pay) {
        return res.status(404).json({ error: 'Pago no encontrado' })
      }
  
      res.send(pay)
    } catch (error) {
      console.error('Error al obtener pago por ID:', error)
      res.status(500).json({ error: 'Error al obtener pago' })
    }
})


//**************MÉTODO POST*************************
// Ruta para crear un nuevo pago
app.post('/pay', async function (req, res) {
    const { metodoPago, fecha, monto, UserId } = req.body
  
    try {
      const newPay = await Pay.create({
        metodoPago,
        fecha,
        monto,
        UserId
      });
      res.status(201).json(newPay)
    } catch (error) {
      console.error('Error al crear un pago:', error)
      res.status(500).json({ error: 'Error al crear un pago' })
    }
})


//**************MÉTODO PUT*************************
// Ruta para actualizar un pago por su ID
app.put('/pay/:id', async function (req, res) {
    const { id } = req.params
    const { metodoPago, fecha, monto } = req.body
  
    try {
      const pay = await Pay.findByPk(id);
      if (!pay) {
        return res.status(404).json({ error: 'Pago no encontrado' });
      }
  
      pay.metodoPago = metodoPago;
      pay.fecha = fecha;
      pay.monto = monto;
      await pay.save()
  
      res.send(pay)
    } catch (error) {
      console.error('Error al actualizar el pago:', error)
      res.status(500).json({ error: 'Error al actualizar el pago' })
    }
})


//**************MÉTODO DELETE*************************
// Ruta para eliminar un pago por su ID
app.delete('/pay/:id', async function (req, res) {
    const { id } = req.params
  
    try {
      const pay = await Pay.findByPk(id)
      if (!pay) {
        return res.status(404).json({ error: 'Pago no encontrado' })
      }
  
      await pay.destroy();
      res.send({ mensaje: 'Pago eliminado con éxito' })
    } catch (error) {
      console.error('Error al eliminar el pago:', error)
      res.status(500).json({ error: 'Error al eliminar el pago' })
    }
})
  
module.exports = app