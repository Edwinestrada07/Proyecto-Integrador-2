const express = require('express')
require('./connect')
const { PDFDocument, rgb } = require('pdf-lib')
const fs = require('fs')

const userRouter = require('./user/user')
const serviceRouter = require('./service/service')
const userxserviceRouter = require('./userxservice/userxservice')
const autoRouter = require('./auto/auto')
const workerRouter = require('./worker/worker')
const payRouter = require('./pay/pay')

const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken') 
const cors = require('cors') 

const app = express() 

//para realizar peticiones desde cualquier url (* significa todos) se puede restringir
app.use(cors({
  origin: '*'
}))

app.use(bodyParser.json()) //Parámetros a recibir son tipo Json
app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRouter)
app.use(serviceRouter)
app.use(userxserviceRouter)
app.use(autoRouter) 
app.use(workerRouter)
app.use(payRouter)

//Puerto del servidor
app.listen(3001, () => {
  console.log(`Example app listening on port ${3001}`)
})