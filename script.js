console.log("Hola mundo");

const emailElement = document.getElementById("email");
const edadElement = document.getElementById("edad");
const contraseniaElement = document.getElementById("contrasenia");
const confirmarContraseniaElement = document.getElementById("confirmar-contrasenia");

const capturarDatos = (event) => {
    event.preventDefault()

    const email = emailElement.value;
    const edad = edadElement.value;
    const contrasenia = contraseniaElement.value;
    const confirmacionContrasenia = confirmarContraseniaElement.value;

    if (edad < 18) {
        alert("Debes ser mayor a 18 años");
        //CORTAR EL FLUJO AQUÍ: return
        return;
    }

    if (contrasenia !== confirmacionContrasenia) {
        alert("Las contraseñas no coinciden")
        return;
    }

    localStorage.setItem("emailUserRegistrado", email);
    window.location.href = "bienvenida.html";

    console.log(email, contrasenia, confirmacionContrasenia)
}

const validarLogin = () => {
    const emailLocal = localStorage.getItem("emailUserRegistrado")

    if (emailLocal) {
        window.location.href = "bienvenida.html";
    }
}


if (window.location.pathname !== "/bienvenida.html") {
    validarLogin()
}

const logout = () => {
    localStorage.clear();
    window.location.href = "index.html"
}
