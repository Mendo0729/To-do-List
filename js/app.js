// Inicialización de listas desde localStorage
let listas = JSON.parse(localStorage.getItem("listas")) || {};

// Ejecutar todo cuando la ventana carga
window.onload = function () {
  // Mostrar listas al cargar
  mostrarListas();

  // Manejo del splash screen (si existe)
  setTimeout(function () {
    const splash = document.getElementById("splashScreen");
    const main = document.getElementById("mainContent");

    if (splash) splash.style.display = "none";
    if (main) main.style.display = "block";
  }, 1000);
};

// Crear una nueva lista
function crearLista() {
  const nombre = document.getElementById("nombreLista").value.trim();
  if (nombre && !listas[nombre]) {
    listas[nombre] = [];
    guardarListas();
    mostrarListas();
    document.getElementById("nombreLista").value = "";
  }
}

// Agregar tarea a una lista existente
function agregarTarea(nombreLista, inputId) {
  const input = document.getElementById(inputId);
  const tarea = input.value.trim();
  if (tarea) {
    listas[nombreLista].push(tarea);
    guardarListas();
    mostrarListas();
  }
}

// Eliminar una tarea específica
function eliminarTarea(nombreLista, index) {
  listas[nombreLista].splice(index, 1);
  guardarListas();
  mostrarListas();
}

// Eliminar toda la lista
function eliminarLista(nombreLista) {
  delete listas[nombreLista];
  guardarListas();
  mostrarListas();
}

// Guardar datos en localStorage
function guardarListas() {
  localStorage.setItem("listas", JSON.stringify(listas));
}

// Mostrar todas las listas en pantalla
function mostrarListas() {
  const contenedor = document.getElementById("todasLasListas");
  contenedor.innerHTML = "";

  const colores = [
    "pastel-rosa", 
    "pastel-amarillo", 
    "pastel-verde", 
    "pastel-morado", 
    "pastel-azul",      // Azul pastel
    "pastel-naranja",   // Naranja pastel
    "pastel-lila",      // Lila pastel
    "pastel-menta",     // Menta pastel
    "pastel-peach",     // Durazno pastel
    "pastel-gris",      // Gris pastel
    "pastel-turquesa",  // Turquesa pastel
    "pastel-rosado",    // Rosado pastel
    "pastel-lima"       // Lima pastel
  ];
  
  let i = 0;

  for (let nombre in listas) {
    const listaDiv = document.createElement("div");
    listaDiv.className = `lista ${colores[i % colores.length]}`;
    i++;

    const tareasHTML = listas[nombre].map((tarea, index) => `
      <li>
        ${tarea}
        <button class="btn-pequeno" onclick="eliminarTarea('${nombre}', ${index})">❌</button>
      </li>
    `).join("");

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
