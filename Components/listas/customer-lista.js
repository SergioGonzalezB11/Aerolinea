import { deleteData,getDataAll,searchDataById,opc } from '../../Apis/customer-api.js';

export class CustomerLista extends HTMLElement{
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
                        <th>Fecha de registro</th>
                        <th>Nro Documento</th>    
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Ciudad Origen</th>
                        <th>Pais Origen</th>
                        <th>fechaNacimiento</th>
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
                                        <h5 class="card-header">Registro de clientes</h5>
                                        <div class="card-body">
                                            <div class="container">
                                                <div class="row g-3">
                                                    <div class="col-12">
                                                        <form id = "frmData">
                                                            <div class="row g-3">
                                                                <div class="col-3">
                                                                    <label for="id" class="form-label">Fecha registro</label>
                                                                    <input type="date" class="form-control" id="fechaRegistro" name="fechaRegistro">                  
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="numeroIdentificacion" class="form-label">Documento del Cliente</label>
                                                                    <input type="text" class="form-control" id="numeroIdentificacion" name="numeroIdentificacion">
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="nombres" class="form-label">Nombres</label>
                                                                    <input type="text" class="form-control" id="nombres" name="nombres">                  
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="apellidos" class="form-label">Apellidos</label>
                                                                    <input type="text" class="form-control" id="apellidos" name="apellidos">                  
                                                                </div>
                                                            </div>
                                                            <div class="row g-3">
                                                                <div class="col-4">
                                                                    <label for="correo" class="form-label">correo cliente</label>
                                                                    <input type="correo" class="form-control" id="correo" name="correo">
                                                                </div>
                                                                <div class="col-4">
                                                                    <label for="telefono" class="form-label">Nro Movil</label>
                                                                    <input type="text" class="form-control" id="telefono" name="telefono">                  
                                                                </div>
                                                                <div class="col-4">
                                                                    <label for="fechaNacimiento" class="form-label">Fecha Nacimiento</label>
                                                                    <input type="date" class="form-control" id="fechaNacimiento" name="fechaNacimiento">                  
                                                                </div>
                                                                <div class="container mt-4 text-center" >
                                                                    <input type="submit" data-accion="PUT" class="btn btn-warning" value="Editar">
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
            <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
    renderClientes = (clientes)=>{
        let clientesHTML = '';
        for(let cliente of clientes){
            clientesHTML += this.crearListaClientesHTML(cliente);
        }
        document.getElementById('lista-clientes').innerHTML = clientesHTML;
        this.callModal();
        this.putData();
        this.delete();
    }
    crearListaClientesHTML = (clientes)=>{
        let listaHTML = /* html */ `
        <tr>
            <td>${clientes.id}</td>
            <td>${clientes.fechaRegistro}</td>
            <td>${clientes.numeroIdentificacion}</td>
            <td>${clientes.nombres}</td>
            <td>${clientes.apellidos}</td>
            <td>${clientes.correo}</td>
            <td>${clientes.telefono}</td>
            <td>${clientes.CiudadOrigen}</td>
            <td>${clientes.PaisOrigen}</td>
            <td>${clientes.fechaNacimiento}</td>
            <td>
                    <a class="btn btn-success " data-bs-toggle="modal" data-bs-target="#putCliente" id="putData" data-idcli='${clientes.id}'><i class='bx bx-edit-alt icono' data-idcli='${clientes.id}'></i></a>
                    <!-- Button trigger modal -->
                    <a id="delete" type="button" data-borrar="DELETE"class="btn btn-danger" data-idclidel='${clientes.id}'><i class='bx bx-message-alt-x icono'></i></a>
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
        const {id,xfechaRegistro,numeroIdentificacion,nombres,apellidos,correo,telefono,CiudadOrigen,PaisOrigen,fechaNacimiento} = data;
        const frm = new FormData(myForm);
        frm.set("fechaRegistro",fechaRegistro);
        frm.set("numeroIdentificacion",numeroIdentificacion);
        frm.set("nombres",nombres);
        frm.set("apellidos",apellidos);
        frm.set("correo",correo);
        frm.set("telefono",telefono);
        frm.set("CiudadOrigen",CiudadOrigen);
        frm.set("PaisOrigen",PaisOrigen);
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
                console.log("aqui")
                this.idUsr=e.target.dataset.idclidel;
                /* this.requestApiDeleteClienteById(e.target.dataset.idclidel); */
                id=this.idUsr;
                deleteData(id)
                e.stopImmediatePropagation();
                e.preventDefault();
            })
        })
    };

}
customElements.define("customer-lista",CustomerLista);