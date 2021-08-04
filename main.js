var grid = new Muuri('.grid', {
    layout: {
        rounding: false,
    }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('images-loaded');

    const enlaces = document.querySelectorAll('#categories a');
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('active'));
            evento.target.classList.add('active');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categorie') : grid.filter(`[data-categorie="${categoria}"]`);

        })
    })

    document.querySelector('#search-bar').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter( (item) => item.getElement().dataset.label.includes(busqueda));
    })

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        

        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.description;
            
            overlay.classList.add('active');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .description').innerHTML = descripcion;
        })
    })

    document.querySelector('#btn-close-popup').addEventListener('click', () => {
        overlay.classList.remove('active');
    })

    overlay.addEventListener('click', (evento) => {
        evento.target.id === 'overlay' ? overlay.classList.remove('active'): '';
    })
})