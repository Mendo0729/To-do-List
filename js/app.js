
let listas = JSON.parse(localStorage.getItem("listas")) || {};

window.onload = mostrarListas;

function crearLista() {
  const nombre = document.getElementById("nombreLista").value.trim();
  if (nombre && !listas[nombre]) {
    listas[nombre] = [];
    guardarListas();
    mostrarListas();
    document.getElementById("nombreLista").value = "";
  }
}

function agregarTarea(nombreLista, inputId) {
  const input = document.getElementById(inputId);
  const tarea = input.value.trim();
  if (tarea) {
    listas[nombreLista].push(tarea);
    guardarListas();
    mostrarListas();
  }
}

function eliminarTarea(nombreLista, index) {
  listas[nombreLista].splice(index, 1);
  guardarListas();
  mostrarListas();
}

function eliminarLista(nombreLista) {
  delete listas[nombreLista];
  guardarListas();
  mostrarListas();
}

function guardarListas() {
  localStorage.setItem("listas", JSON.stringify(listas));
}

function mostrarListas() {
  const contenedor = document.getElementById("todasLasListas");
  contenedor.innerHTML = "";

  const colores = ["pastel-rosa", "pastel-amarillo", "pastel-verde", "pastel-morado"];
  let i = 0;

  for (let nombre in listas) {
    const listaDiv = document.createElement("div");
    listaDiv.className = `lista ${colores[i % colores.length]}`;
    i++;

    const tareasHTML = listas[nombre].map((tarea, index) => `
      <li>
        ${tarea}
        <button class="btn-pequeno" onclick="eliminarTarea('${nombre}', ${index})">❌</button>
      </li>`).join("");

    listaDiv.innerHTML = `
      <h3>${nombre}
        <button class="btn-pequeno rojo" onclick="eliminarLista('${nombre}')">Eliminar Lista</button>
      </h3>
      <ul>${tareasHTML}</ul>
      <input type="text" id="input-${nombre}" placeholder="Nueva tarea para ${nombre}">
      <button onclick="agregarTarea('${nombre}', 'input-${nombre}')">Agregar Tarea</button>
    `;

    contenedor.appendChild(listaDiv);
  }
}

window.onload = function() {
  // Tiempo en milisegundos para mostrar la splash screen (ej. 3 segundos)
  setTimeout(function() {
    // Ocultar la splash screen
    document.getElementById("splashScreen").style.display = "none";
    
    // Mostrar el contenido principal
    document.getElementById("mainContent").style.display = "block";
  }, 3000); // Cambia el tiempo (en milisegundos) según tu preferencia
};