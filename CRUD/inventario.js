import Articulo from "./articulos.js";
export default class Inventario{
    constructor(Inventario, Contar){
        this._tablaInventario = Inventario;
        this._tablaContar = Contar;
        this._articulos = [];
        this._numArticulo = 0;
       //localStorage.removeItem("articulo");
        this._tablaInicio();
    }

    _tablaInicio() {
        let lsInventario = JSON.parse(localStorage.getItem('articulo'));
        if (lsInventario === null) {
            return;
        }
        lsInventario.forEach((f) => {

            this._agTabla(new Articulo(f));
        });
    }
    //_cancelEdit
    _siempreNo(fila, articulo) {
        fila.cells[0].innerHTML = articulo.codigo;
        fila.cells[1].innerHTML =articulo.nArticulo;
        fila.cells[2].innerHTML = articulo.precio;
        fila.cells[3].innerHTML = articulo.cantidad;
        fila.cells[4].innerHTML = articulo.descripcion;
        fila.cells[5].innerHTML = "";
        this._agEdQuitar(fila, articulo);
      }
      //_saveEdit
      _salvar(fila, newRegistros){
       /* let nuevoDia = newRegistros.fLimite;
        let pos = this._buscar(articulo.codigo);
        let diaS = nuevoDia.split("-");
        nuevoDia = new Date(diaS[0], diaS[1], diaS[2]);
        newRegistros.fLimite = diaS; */
        this._articulos[pos] = newRegistros;
        localStorage.setItem('articulo', JSON.stringify(this._articulos));
        this._siempreNo(fila, new Articulo(newRegistros));
      }
      _eliminar(fila, articulo){
        let array = JSON.parse(localStorage.getItem('articulo'));
          for(let i=0; i < array.length; i++){
              if(articulo.codigo === array[i].codigo){
                array.splice(i, 1);
                  break
                }
              }
              fila.innerHTML= '';
              location.reload();
              localStorage.setItem("articulo", JSON.stringify(array));
      }

    _agEdQuitar(fila, articulo) {
        let btnEdit = document.createElement("input");
        btnEdit.type = "button";
        btnEdit.value = 'Editar';
        btnEdit.className = 'btn btn-success';
        btnEdit.addEventListener('click', () => {
          this._editar(fila, articulo);
        });
  
        let btnQuitar = document.createElement('input');
          btnQuitar.type = "button";
          btnQuitar.value = "Eliminar";
          btnQuitar.className = "btn btn-danger"
        
        fila.cells[5].innerHTML = "";
        fila.cells[5].appendChild(btnQuitar);
        btnQuitar.addEventListener('click', () => {
          this._eliminar(fila, articulo)
          });
    }
      
    _agTabla(articulo) {
        let fila = this._tablaInventario.insertRow(-1);

        let celCodigo = fila.insertCell(0);
        let celNombre = fila.insertCell(1);
        let celPrecio = fila.insertCell(2);
        let celCantidad = fila.insertCell(3);
        let celDescripcion = fila.insertCell(4);
        fila.insertCell(5);

        celCodigo.innerHTML = articulo.codigo;
        celNombre.innerHTML = articulo.nArticulo;
        celPrecio.innerHTML = articulo.precio;
        celCantidad.innerHTML = articulo.cantidad;
        celDescripcion.innerHTML = articulo.descripcion;
        this._agEdQuitar(fila, articulo);
        this._numArticulo++;
        this._tablaContar.rows[0].cells[1].innerHTML = this._numArticulo;

       let objarticulo = {
          codigo: articulo.codigo,
          nArticulo: articulo.nArticulo,
          precio: articulo.precio,
          cantidad: articulo.cantidad,
          descripcion: articulo.descripcion
        };

        this._articulos.push(objarticulo);
}

    _admin(Tipo) {
    let orden = [];
    orden = this._articulos.slice(-this._numArticulo);
    if (Tipo === 1) {
      orden.sort(function(a, b) {
        return a.codigo.localeCompare(b.codigo);
      });
    }else if (Tipo === 2) {
      orden.sort(function(a, b) {
        return a.precio - b.precio;
      });
    }
    localStorage.setItem("articulo", JSON.stringify(orden));
    this._limpiarTo();
    this._tablaInicio();
    
  }

  _limpiarTo() {
    var i;
    console.log(this._numArticulo)
    for(i = this._numArticulo; i >= 1; i--) {
      this._tablaInventario.deleteRow(i);
    }
    this._numArticulo = 0;
  }

_buscar(codigo) {
    let lugar = -1;

    this._articulos.forEach((t, index) => {
      if(t.codigo === codigo) {
        lugar = index;
        return;
      }

    });

    return lugar;
  }

  agArticulo(articulo) {
    let buscar = this._buscar(articulo.codigo);

    if(buscar >= 0) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: "La articulo ya existe"
      });
      return;
    }

    this._agTabla(articulo);
    localStorage.setItem("articulo", JSON.stringify(this._articulos));
  }
}