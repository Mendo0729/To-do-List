document.addEventListener('DOMContentLoaded', () => {
  const listas = JSON.parse(localStorage.getItem('listas')) || {};
  const eventos = [];

  for (const nombre in listas) {
    listas[nombre].forEach(tarea => {
      if (tarea.fecha && tarea.titulo) {
        eventos.push({
          title: `${tarea.titulo} (${nombre})`,
          start: tarea.fecha,
          allDay: true
        });
      }
    });
  }

  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    height: 'auto',
    dayMaxEventRows: true,
    events: eventos,
  });
  calendar.render();
});