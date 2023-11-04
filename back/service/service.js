const express = require('express')
const app = express.Router()
const Service = require('./service.model')


//**************MÉTODO GET*************************
// Ruta GET para obtener todos los servicios
app.get('/api/service', async function (req, res)  {
  try {
      const service = await Service.findAll(); // Service es tu modelo de servicio definido en Sequelize
      res.json(service);
  } catch (error) {
      console.error('Error al obtener servicios:', error);
      res.status(500).json({ error: 'Error al obtener servicios' });
  }
});

// Ruta para obtener un servicio por su ID
app.get('/service/:id', async function (req, res) {
    const { id } = req.params
  
    try {
      const service = await Service.findByPk(id)
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' })
      }
      res.send(service)
    } catch (error) {
      console.error('Error al obtener servicio por ID:', error)
      res.status(500).json({ error: 'Error al obtener servicio' })
    }
})


//**************MÉTODO POST*************************
// Ruta para crear un nuevo servicio
app.post('/service', async function (req, res) {
  const tipoServicio = req.body.tipoServicio
  const precio = req.body.precio
  const UserId = req.body.userId
  const AutoId = req.body.autoId
  const WorkerId = req.body.workerId

    try {
      const newService = await Service.create({ tipoServicio, precio, UserId, AutoId, WorkerId })
      res.status(201).json(newService)
    } catch (error) {
      console.error('Error al crear un servicio:', error)
      res.status(500).json({ error: 'Error al crear un servicio' })
    }
})


//**************MÉTODO PUT*************************
// Ruta para actualizar un servicio por su ID
app.put('/service/:id', async function (req, res) {
    const { id } = req.params
    const { tipoServicio, precio } = req.body
  
    try {
      const service = await Service.findByPk(id)
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' })
      }
  
      service.tipoServicio = tipoServicio
      service.precio = precio
      await service.save()
  
      res.send(service)
    } catch (error) {
      console.error('Error al actualizar el servicio:', error)
      res.status(500).json({ error: 'Error al actualizar el servicio' })
    }
})


//**************MÉTODO DELETE*************************
// Ruta para eliminar un servicio por su ID
app.delete('/service/:id', async function (req, res) {
    const { id } = req.params
  
    try {
      const service = await Service.findByPk(id)
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' })
      }
  
      await service.destroy()
      res.send({ mensaje: 'Servicio eliminado con éxito' })
    } catch (error) {
      console.error('Error al eliminar el servicio:', error)
      res.status(500).json({ error: 'Error al eliminar el servicio' })
    }
})
  
module.exports = app 


