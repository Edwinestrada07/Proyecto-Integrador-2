///////////////////////////
//Con esta función se llama al formulario que se creo en el index.html (Automóvil)
async function registerAuto() {
    const numeroPlaca = document.getElementById('numeroPlaca').value
    const marca = document.getElementById('marca').value
    const modelo = document.getElementById('modelo').value
    const tipoVehiculo = document.getElementById('tipoVehiculo').value 

    let token = localStorage.getItem('token') 

    let response = await fetch('http://localhost:3001/auto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            numeroPlaca,
            marca,
            modelo,
            tipoVehiculo
        })
    }) 
    .then(response => response.json())
    .then(data => {
        // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de confirmación.
         alert('Vehiculo registrado con éxito')
    })
    .catch(error => {
        console.error('Error al registrar el vehiculo:', error)
        alert('Error al registrar el vehiculo')
    })
}


///////////////////////////
//Con esta función se llama al formulario que se creo en el index.html (Empleados)
async function registerWorker() {
    const nombre = document.getElementById('nombre').value
    const tel = document.getElementById('tel').value

    let token = localStorage.getItem('token') 

    let response = await fetch('http://localhost:3001/worker', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            nombre,
            tel
        })
    }) 
    .then(response => response.json())
    .then(data => {
        // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de confirmación.
        alert('Empleado registrado con éxito')
    })
    .catch(error => {
        console.error('Error al registrar el empleado:', error)
        alert('Error al registrar el empleado')
    })
}


///////////////////////////
//Con esta función se llama al formulario que se creo en el index.html (Servicio)
async function registerService() {
    const tipoServicio = document.getElementById('tipoServicio').value
    const precio = document.getElementById('precio').value
    const userId = document.getElementById('userId').value
    const autoId = document.getElementById('autoId').value
    const workerId = document.getElementById('workerId').value

    let token = localStorage.getItem('token') 

    let response = await fetch('http://localhost:3001/service', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            tipoServicio,
            precio,
            userId,
            autoId,
            workerId
        })
    }) 
    .then(response => response.json())
    .then(data => {
        // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de confirmación.
        alert('Servicio registrado con éxito')
    })
    .catch(error => {
        console.error('Error al registrar el servicio:', error)
        alert('Error al registrar el servicio')
    })
}


///////////////////////////
//Con esta función se llama al formulario que se creo en el index.html (UserXService) Carrito de compras
async function registerCarrito() {
    const cantidad = document.getElementById('cantidad').value
    const serviceId = document.getElementById('serviceId').value
    
    let token = localStorage.getItem('token') 

    let response = await fetch('http://localhost:3001/userxservice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            cantidad,
            serviceId
        })
    }) 
    .then(response => response.json())
    .then(data => {
        // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de confirmación.
        alert('Carrito registrado con éxito')
    })
    .catch(error => {
        console.error('Error al registrar el carrito:', error)
        alert('Error al registrar el carrito')
    })
}


///////////////////////////
//Con esta función se llama al formulario que se creo en el index.html (pay) Pago
async function registerPay() {
        const metodoPago = document.getElementById('metodoPago').value
        const fecha = document.getElementById('fecha').value
        const monto = document.getElementById('monto').value
        
        let token = localStorage.getItem('token') 
    
        let response = await fetch('http://localhost:3001/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                metodoPago,
                fecha,
                monto,
                userId
            })
        }) 
        .then(response => response.json())
        .then(data => {
            // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de confirmación.
            alert('Pago registrado con éxito')
        })
        .catch(error => {
            console.error('Error al registrar el pago:', error)
            alert('Error al registrar el pago')
        })
}
    

//Metodo Get
////<<<<<<<<<<<<<<<//////////<<<<<<<<<<<<<<<<<//////////
//Para traer toda la información get de services
async function getServices() {
    let selectService = document.getElementById('serviceId')

    let response = await fetch('http://localhost:3001/api/service', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    let services = await response.json()

    for (let service of services) {
        let option = document.createElement('option')

        option.value = service.id
        option.innerHTML = service.name

        selectService.appendChild(option)
    }
}

document.addEventListener('DOMContentLoaded', getServices)




