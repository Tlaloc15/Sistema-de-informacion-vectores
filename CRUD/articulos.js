export default class Articulo{
    constructor(articulos){
        this._codigo = articulos.codigo;
        this._nArticulo = articulos.nArticulo;
        this._precio = articulos.precio;
        this._cantidad = articulos.cantidad;
        this._descripcion = articulos.descripcion;
    }
    get codigo() {
        return this._codigo;
    }
    get nArticulo() {
        return this._nArticulo;
    }
    get precio() {
        return this._precio;
    }
    get cantidad() {
        return this._cantidad;
    }
    get descripcion() {
        return this._descripcion;
    }

    }