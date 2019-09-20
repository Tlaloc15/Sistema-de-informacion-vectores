import Articulo from "./articulos.js";
import Inventario from "./inventario.js";

class Main{
    constructor() {
        let Inventario2 = new Inventario(
            document.querySelector('#inventario'),
            document.querySelector('#numArticulos')
        );
        document.querySelector('#btnAgregar').addEventListener('click', () => {
            let form = document.querySelector('#form');

            if (form.checkValidity() === true) {
                let codigo = document.querySelector('#codigo').value;
                let nArticulo = document.querySelector('#nArticulo').value;
                let precio = document.querySelector('#precio').value;
                let cantidad = document.querySelector('#cantidad').value;
                let descripcion = document.querySelector('#descripcion').value;

                let objArticulo = {
                    codigo: codigo,
                    nArticulo: nArticulo,
                    precio: precio,
                    cantidad: cantidad,
                    descripcion: descripcion
                };

                let articulo = new Articulo(objArticulo);

                Inventario2.agArticulo(articulo);
            } 
            form.classList.add('was-validated');
        }); 

        var select = document.getElementById("Tipo");
           select.addEventListener("change", () => {
               var Tipo = select.value;
               if (Tipo === "Nombre") {
                   Tipo = 1;
               }else if (Tipo === "Precio") {
                   Tipo = 2;
               }
               console.log(Tipo)
               Inventario2._admin(Tipo);
           });

    }
}
new Main();