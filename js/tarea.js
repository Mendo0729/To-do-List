let listas = JSON.parse(localStorage.getItem('listas')) || {};

const listaForm = document.getElementById('listaForm');
const listasContainer = document.getElementById('listasContainer');

function guardarListas() {
    localStorage.setItem('listas', JSON.stringify(listas));
}

function renderizarListas() {
    listasContainer.innerHTML = '';
    for (const nombre in listas) {
        const div = document.createElement('div');
        div.style.border = '1px solid #ccc';
        div.style.padding = '1rem';
        div.style.marginBottom = '1rem';

        let tareasHTML = '<ul>';
        listas[nombre].forEach((tarea, i) => {
            tareasHTML += `
                <li>
                    ${tarea.titulo} - <strong>${tarea.fecha}</strong>
                    <button class="btn-small" onclick="eliminarTarea('${nombre}', ${i})">Eliminar</button>
                </li>
            `;
        });
        tareasHTML += '</ul>';

        div.innerHTML = `
            <h2>${nombre}
                <button class="btn-small" onclick="eliminarLista('${nombre}')">Eliminar lista</button>
            </h2>
            ${tareasHTML}
            <div class="lista-inputs">
                <input type="text" id="input-titulo-${nombre}" placeholder="Título de tarea" />
                <input type="date" id="input-fecha-${nombre}" />
                <button onclick="agregarTarea('${nombre}')">Agregar tarea</button>
            </div>
        `;
        listasContainer.appendChild(div);
    }
}

listaForm.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('nombreLista').value.trim();
    if (nombre && !listas[nombre]) {
        listas[nombre] = [];
        guardarListas();
        renderizarListas();
        listaForm.reset();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Nombre inválido',
            text: 'El nombre está vacío o ya existe una lista con ese nombre.',
        });
    }
});

function agregarTarea(nombreLista) {
    const tituloInput = document.getElementById(`input-titulo-${nombreLista}`);
    const fechaInput = document.getElementById(`input-fecha-${nombreLista}`);
    const titulo = tituloInput.value.trim();
    const fecha = fechaInput.value;

    if (!titulo) {
        Swal.fire({
            icon: 'warning',
            title: 'Título vacío',
            text: 'Por favor, ingrese un título para la tarea.',
        });
        return;
    }

    if (!fecha) {
        Swal.fire({
            icon: 'warning',
            title: 'Fecha no seleccionada',
            text: 'Por favor, seleccione una fecha válida.',
        });
        return;
    }

    listas[nombreLista].push({ titulo, fecha });
    guardarListas();
    renderizarListas();
}

function eliminarTarea(nombreLista, index) {
    Swal.fire({
        title: '¿Eliminar esta tarea?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#bcbcbc',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            listas[nombreLista].splice(index, 1);
            guardarListas();
            renderizarListas();
            Swal.fire({
                icon: 'success',
                title: 'Tarea eliminada',
                timer: 1000,
                showConfirmButton: false
            });
        }
    });
}

function eliminarLista(nombreLista) {
    Swal.fire({
        title: `¿Eliminar la lista "${nombreLista}"?`,
        text: "Todas las tareas también serán eliminadas.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#bcbcbc',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            delete listas[nombreLista];
            guardarListas();
            renderizarListas();
            Swal.fire({
                icon: 'success',
                title: 'Lista eliminada',
                timer: 1000,
                showConfirmButton: false
            });
        }
    });
}

// Inicializar
renderizarListas();
