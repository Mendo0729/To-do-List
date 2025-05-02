let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

function mostrarTareas() {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';
  tareas.forEach((tarea, index) => {
    const li = document.createElement('li');
    li.textContent = tarea;
    li.onclick = () => eliminarTarea(index);
    lista.appendChild(li);
  });
}

function agregarTarea() {
  const input = document.getElementById('nuevaTarea');
  const tareaTexto = input.value.trim();
  if (tareaTexto !== '') {
    tareas.push(tareaTexto);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    input.value = '';
    mostrarTareas();
  }
}

function eliminarTarea(index) {
  tareas.splice(index, 1);
  localStorage.setItem('tareas', JSON.stringify(tareas));
  mostrarTareas();
}

// Cargar las tareas al abrir la página
mostrarTareas();
