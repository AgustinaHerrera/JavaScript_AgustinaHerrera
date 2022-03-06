document.addEventListener('DOMContentLoaded', () => {

    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Tote bag Bordó',
            precio: 690,
            imagen: './multimedia/ToteBordeaux.jpg'
        },
        {
            id: 2,
            nombre: 'Tote bag Roja',
            precio: 690,
            imagen: './multimedia/ToteRojo.jpg'
        },
        {
            id: 3,
            nombre: 'Tote bag Oliva',
            precio: 690,
            imagen: './multimedia/ToteVerde.jpg'
        },
        {
            id: 4,
            nombre: 'Tote bag Manzana',
            precio: 690,
            imagen: './multimedia/ToteManzana.png'
        }

    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;


    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
       
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
 
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
    
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;

            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
    
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('button', );
            miNodoBoton.textContent = 'Añadir al carrito';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', addProductoAlCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    function addProductoAlCarrito(evento) {

        carrito.push(evento.target.getAttribute('marcador'))

        renderizarCarrito();
 
        guardarCarritoEnLocalStorage();
    }


    function renderizarCarrito() {

        DOMcarrito.textContent = '';

        const carritoSinDuplicados = [...new Set(carrito)];
   
        carritoSinDuplicados.forEach((item) => {
        
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
      
                return itemBaseDatos.id === parseInt(item);
            });

            const numeroUnidadesItem = carrito.reduce((total, itemId) => {

                return itemId === item ? total += 1 : total;
            }, 0);
      
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
      
            const miBoton = document.createElement('button');
            miBoton.classList.add('button3', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
    
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });

        DOMtotal.textContent = calcularTotal();
    }


    function borrarItemCarrito(evento) {

        const id = evento.target.dataset.item;

        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });

        renderizarCarrito();

        guardarCarritoEnLocalStorage();

    }


    function calcularTotal() {

        return carrito.reduce((total, item) => {

            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });

            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }


    function vaciarCarrito() {

        carrito = [];

        renderizarCarrito();

        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {      
          if (miLocalStorage.getItem('carrito') !== null) {

            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }


    DOMbotonVaciar.addEventListener('click', vaciarCarrito);


    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});