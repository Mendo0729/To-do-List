document.addEventListener('DOMContentLoaded', () => {
  const listas = JSON.parse(localStorage.getItem('listas')) || {};
  const eventos = [];

  for (const nombre in listas) {
    listas[nombre].forEach(tarea => {
      if (tarea.fecha && tarea.titulo) {
        eventos.push({
          title: tarea.titulo,
          start: tarea.fecha,
          allDay: true,
          extendedProps: {
            lista: nombre
          }
        });
      }
    });
  }

  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    height: 'auto',
    events: eventos,

    // Puntos por día
    dayCellDidMount: function(info) {
      const fecha = info.date.toISOString().split('T')[0];
      const cantidad = eventos.filter(e => e.start === fecha).length;

      if (cantidad > 0) {
        const contenedor = document.createElement('div');
        contenedor.classList.add('puntos-container');

        for (let i = 0; i < cantidad; i++) {
          const punto = document.createElement('div');
          punto.className = 'evento-punto';
          contenedor.appendChild(punto);
        }

        const top = info.el.querySelector('.fc-daygrid-day-top');
        if (top) top.appendChild(contenedor);
      }
    },

    // 👉 Mostrar modal al hacer clic en un evento
    eventClick: function(info) {
      const fecha = info.event.startStr;
      const tareasDelDia = [];

      for (const nombreLista in listas) {
        listas[nombreLista].forEach(tarea => {
          if (tarea.fecha === fecha) {
            tareasDelDia.push(`📌 <strong>${tarea.titulo}</strong> (${nombreLista})`);
          }
        });
      }

      Swal.fire({
        title: `Tareas para ${fecha}`,
        html: tareasDelDia.join('<br>'),
        icon: 'info'
      });
    }
  });

  calendar.render();
});
