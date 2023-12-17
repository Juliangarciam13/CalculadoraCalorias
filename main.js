const getValue = (id) => {
    return document.getElementById(id).value;
}

const validarEntrada = (nombre, tipoDocumento, numeroDocumento, edad, peso, altura, actividad, genero) => {
    if (!nombre) {
        alert("Por favor, ingrese su nombre.");
        return false;
    }

    if (!tipoDocumento) {
        alert("Por favor, seleccione un tipo de documento.");
        return false;
    }

    if (!numeroDocumento || isNaN(numeroDocumento)) {
        alert("Por favor, ingrese un número de documento válido.");
        return false;
    }

    if (isNaN(edad) || edad < 15 || edad > 80) {
        alert("Por favor, ingrese una edad válida entre 15 y 80 años.");
        return false;
    }

    if (isNaN(peso) || peso <= 0) {
        alert("Por favor, ingrese un peso válido.");
        return false;
    }

    if (isNaN(altura) || altura <= 0) {
        alert("Por favor, ingrese una altura válida.");
        return false;
    }

    if (isNaN(actividad) || actividad <= 0) {
        alert("Por favor, seleccione su nivel de actividad física.");
        return false;
    }

    if (!genero) {
        alert("Por favor, seleccione su género.");
        return false;
    }

    return true;
}

const calcularCalorias = (peso, altura, edad, actividad, genero) => {
    return genero === 'M' 
        ? actividad * ((10 * peso) + (6.25 * altura) - (5 * edad) + 5)
        : actividad * ((10 * peso) + (6.25 * altura) - (5 * edad) - 161);
}

const determinarGrupoPoblacional = (edad) => {
    if (edad >= 15 && edad <= 29) {
        return 'Joven';
    } else if (edad >= 30 && edad <= 59) {
        return 'Adulto';
    } else {
        return 'Adulto Mayor';
    }
}

const limpiarFormularioYResultados = () => {
    document.getElementById('formulario-calculadora').reset();
    document.getElementById('mensajeResultado').innerHTML = '';
    document.getElementById('resultado').style.display = 'none';
}

const mostrarMensaje = (nombre, tipoDocumento, numeroDocumento, calorias, grupoPoblacional) => {
    const mensajeDiv = document.getElementById('mensajeResultado');
    mensajeDiv.innerHTML = `
        El paciente ${nombre} identificado con ${tipoDocumento} NO.${numeroDocumento}, requiere un total de <span class="calorias">${calorias.toFixed(2)} kcal</span> para el sostenimiento de su TBM. El paciente pertenece al grupo poblacional: <span class="grupo-poblacional">${grupoPoblacional}</span>
        <br><br>
        <button id="btnRefrescar" class="btn btn-primary">Refrescar</button>
    `;
    document.getElementById('resultado').style.display = 'block';

    document.getElementById('btnRefrescar').addEventListener('click', limpiarFormularioYResultados);
}

const manejarCalculoCalorias = () => {
    const nombre = getValue('nombre');
    const tipoDocumento = getValue('tipoDocumento');
    const numeroDocumento = getValue('numeroDocumento');
    const edad = getValue('edad');
    const peso = getValue('peso');
    const altura = getValue('altura');
    const actividad = getValue('actividad');
    const genero = document.querySelector('input[name="genero"]:checked').value;

    if (!validarEntrada(nombre, tipoDocumento, numeroDocumento, edad, peso, altura, actividad, genero)) {
        return;
    }

    const calorias = calcularCalorias(peso, altura, edad, actividad, genero);
    const grupoPoblacional = determinarGrupoPoblacional(edad);

    mostrarMensaje(nombre, tipoDocumento, numeroDocumento, calorias, grupoPoblacional);
    


}

document.getElementById('formulario-calculadora').addEventListener('submit', function (e) {
    e.preventDefault();
    manejarCalculoCalorias();
});
