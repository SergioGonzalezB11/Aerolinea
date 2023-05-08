import { getDataAll,searchDataById,opc } from '../../Apis/flota-api.js';

export class AerolineaFlota extends HTMLElement{
    idUsr=0;
    constructor(){
        super();
        this.render();
        this.requestApiGetCliente();
        this.abrirModal();
        
    }
    render(){
        this.innerHTML = /* html */ `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>numero de aeronave</th>    
                        <th>Cantidad de pasajeros</th>
                        <th>Fecha de compra</th>
                        <th>Valor compra</th>
                        <th>numero de matricula</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="lista-clientes">

                </tbody>
            </table>
            <div class="modal fade " id="putCliente" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="card">
                                        <h5 class="card-header">Registro de Flota</h5>
                                        <div class="card-body">
                                            <div class="container">
                                                <div class="row g-3">
                                                    <div class="col-12">
                                                        <form id = "frmData">
                                                            <div class="row g-3">
                                                                <div class="col-3">
                                                                    <label for="nroave" class="form-label">numero de aeronave</label>
                                                                    <input type="text" class="form-control" id="nroave" name="nroave">                  
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="cantidadPasajeros" class="form-label">Cantidad de pasajeros</label>
                                                                    <input type="number" class="form-control" id="cantidadPasajeros" name="cantidadPasajeros">
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="fechaCompra" class="form-label">Fecha de compra</label>
                                                                    <input type="date" class="form-control" id="fechaCompra" name="fechaCompra">                  
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="valorCompra" class="form-label">Valor compra</label>
                                                                    <input type="text" class="form-control" id="valorCompra" name="valorCompra">        
                                                                </div>
                                                            </div>
                                                            <div class="row g-3">
                                                                <div class="col-4">
                                                                    <label for="nroMatricula" class="form-label">numero de matricula</label>
                                                                    <input type="text" class="form-control" id="nroMatricula" name="nroMatricula">
                                                                </div>
                                                            </div>
                                                        </form>                         
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">detalles</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>
                
        `
    }
    abrirModal = () =>{
        var myModal = document.querySelector('#putCliente')
        myModal.addEventListener('shown.bs.modal', function () {
            //myInput.focus()
        })
    }
    requestApiGetCliente = () =>{
        getDataAll()
            .then((result)=>{
                this.renderClientes(result);
            })
    }
    renderClientes = (flotas)=>{
        let flotasHTML = '';
        for(let flota of flotas){
            flotasHTML += this.crearListaClientesHTML(flota);
        }
        document.getElementById('lista-clientes').innerHTML = flotasHTML;
        this.callModal();
        this.putData();
        this.delete();
    }
    crearListaClientesHTML = (flotas)=>{
        let listaHTML = /* html */ `
        <tr>
            <td>${flotas.id}</td>
            <td>${flotas.numeroIdentificacion}</td>
            <td>${flotas.nombres}</td>
            <td>${flotas.apellidos}</td>
            <td>${flotas.correo}</td>
            <td>${flotas.telefono}</td>
            <td>${flotas.CiudadOrigen}</td>
            <td>${flotas.PaisOrigen}</td>
            <td>
                    <a class="btn btn-success " data-bs-toggle="modal" data-bs-target="#putCliente" id="putData" data-idcli='${flotas.id}'><i class='bx bx-edit-alt icono' data-idcli='${flotas.id}'></i></a>
                    <!-- Button trigger modal -->
                    <input type="button" value="detalles" class="btn btn-secondary"data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <a id="delete" type="button" data-borrar="DELETE"class="btn btn-danger" data-idclidel='${flotas.id}'><i class='bx bx-message-alt-x icono'></i></a>
            </td>
            </tr>
        `;
        return listaHTML;
    }
    callModal = () =>{
        document.querySelectorAll('#putData').forEach((item,id) =>{
            item.addEventListener("click",(e) =>{
                this.idUsr=e.target.dataset.idcli;
                this.requestApiGetClienteById(e.target.dataset.idcli);
                e.stopImmediatePropagation();
                e.preventDefault();
            })
        })

    }
    requestApiGetClienteById = (id) =>{
        searchDataById(id)
            .then((result)=>{
                this.loadDataFrm(result);
            })
    }
    loadDataFrm(data){
        
        const myForm = document.querySelector("#frmData");
        const {id,numeroIdentificacion,nombres,apellidos,correo,telefono,fechaNacimiento} = data;
        const frm = new FormData(myForm);
        frm.set("id",id);
        frm.set("numeroIdentificacion",numeroIdentificacion);
        frm.set("nombres",nombres);
        frm.set("apellidos",apellidos);
        frm.set("correo",correo);
        frm.set("telefono",telefono);
        frm.set("fechaNacimiento",fechaNacimiento);
        // Itera a través de los pares clave-valor de los datos
        for (var pair of frm.entries()) {
            // Establece los valores correspondientes en el formulario
            myForm.elements[pair[0]].value = pair[1];
        }

    }
    putData = (id) =>{
        let myForm = document.querySelector("#frmData");
        myForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            opc[e.submitter.dataset.accion](data,this.idUsr);  
        })
    }


    delete=(id) =>{
        document.querySelectorAll('#delete').forEach((item,id) =>{
            item.addEventListener("click",(e) =>{
                this.idUsr=e.target.dataset.idclidel;
                this.requestApiGetClienteById(e.target.dataset.idclidel);
                id=this.idUsr;
                e.stopImmediatePropagation();
                e.preventDefault();
            })
        })
    };
}
customElements.define("aerolinea-flota",AerolineaFlota);