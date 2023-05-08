export class AerolineaRutas extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.rutas();
    }
    render(){
        this.innerHTML=/* html*/ `
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src="images/logoPrincipal-xl.png" alt=""> </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="customers.html">Clientes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/rutas.html">Rutas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/tiquetes.html">Tiquetes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/flota.html">Flota</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/embarque.html">Embarque</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav> 
        <div class="container">
        <h1 class="text-center">seleccione ruta</h1>
        <div class="row">
            <div class="col-6">
                <select class="form-select " aria-label="Default select example">
                    <option selected>Seleccione Origen</option>
                    <option value="1" id="bucaramangaO">Bucaramanga</option>
                    <option value="2" id="bogotaO">Bogota</option>
                    <option value="3" id="sanAndresO">San Andres</option>
                </select>
            </div>
            <div class="col-6">
                <select class="form-select col-6" aria-label="Default select example">
                    <option selected>Seleccione Destino</option>
                    <option value="1" id="bucaramangaD">Bucaramanga</option>
                    <option value="2" id="bogotaD">Bogota</option>
                    <option value="3" id="sanAndresD">San Andres</option>
                </select>
            </div>
        </div>
        <div class="text-center m-3">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Comprar Tiquete
            </button>
        </div>
            
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">COMPRAR TIQUETE</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary">Comprar</button>
                    </div>
                </div>
            </div>
        </div>    
    </div>
        `;
    }

}
customElements.define("aerolinea-rutas",AerolineaRutas);