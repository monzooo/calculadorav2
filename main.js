let historialOperaciones = [];

function mostrarHistorial() {
    let historialList = document.getElementById("historial");
    historialList.innerHTML = "";

    historialOperaciones.forEach(operacion => {
        let li = document.createElement("li");
        li.textContent = operacion;
        historialList.appendChild(li);
    });
}

function realizarOperacion(operador, simbolo) {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);

    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById("resultado").textContent = "Entrada no válida.";
        return;
    }

    let resultado = operador(num1, num2);
    historialOperaciones.push(`${num1} ${simbolo} ${num2} = ${resultado}`);
    mostrarHistorial();
    guardarOperacionEnLocalStorage(historialOperaciones);
    document.getElementById("resultado").textContent = `Resultado: ${resultado}`;
}

function sumar(num1, num2) {
    return num1 + num2;
}

function restar(num1, num2) {
    return num1 - num2;
}

function multiplicar(num1, num2) {
    return num1 * num2;
}

function dividir(num1, num2) {
    if (num2 === 0) {
        document.getElementById("resultado").textContent = "No se puede dividir por cero.";
        return NaN;
    }
    return num1 / num2;
}

function guardarOperacionEnLocalStorage(historial) {
    if (localStorage) {
        localStorage.setItem("historial", JSON.stringify(historial));
    }
}

function cargarHistorialDesdeLocalStorage() {
    if (localStorage) {
        const historial = localStorage.getItem("historial");
        if (historial) {
            historialOperaciones = JSON.parse(historial);
            mostrarHistorial();
        }
    }
}

cargarHistorialDesdeLocalStorage();

document.getElementById("sumar").addEventListener("click", () => realizarOperacion(sumar, '+'));
document.getElementById("restar").addEventListener("click", () => realizarOperacion(restar, '-'));
document.getElementById("multiplicar").addEventListener("click", () => realizarOperacion(multiplicar, 'x'));
document.getElementById("dividir").addEventListener("click", () => realizarOperacion(dividir, '/'));

document.getElementById("limpiarHistorial").addEventListener("click", () => {
    historialOperaciones = [];
    guardarOperacionEnLocalStorage([]);
    mostrarHistorial();
});