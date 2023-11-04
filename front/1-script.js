///////////////////////////
//Sign Up (inscribirse)
async function signup() {
    let nombre = document.getElementById('nombre').value
    let direccion = document.getElementById('direccion').value
    let tel = document.getElementById('tel').value
    let correo = document.getElementById('correo').value
    let password = document.getElementById('password').value 

    //Para la creación del usuario en el servidor por app.post()
    let response = await fetch('http://localhost:3001/user/signup', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre,
            direccion,
            tel,
            correo,
            password
        })
    })

    let responseJson = await response.json() //Recibimos un STRING y convertimos a Json para utilizar

    localStorage.setItem('token', responseJson.token) //El Json se guarda en el localStorage
}


///////////////////////////
//Sign In (Login (Acceder))
async function login() {
    let correo = document.getElementById('correo').value
    let password = document.getElementById('password').value

    //Para acceder con el usuario creado en el servidor por app.post()
    let response = await fetch('http://localhost:3001/user/signin', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo,
            password
        })
    })

    let responseJson = await response.json() //Recibimos un STRING y convertimos a Json para utilizar

    localStorage.setItem('token', responseJson.token) //El Json se guarda en el localStorage

    window.location.href = '/'

}


///////////////////////////
//verifySession (verificar sessión)
async function verifySession() {
    let token = localStorage.getItem('token')

    if(!token){
        window.location.href = '/login'
    }

    document.getElementById('token').innerText = token;
}


///////////////////////////
//Log out (cerrar sesión)
async function logout() {
    localStorage.removeItem('token')

    window.location.href = 'login'
}