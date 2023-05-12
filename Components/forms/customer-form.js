import { postData,putData,opc } from '../../Apis/customer-api.js';
export class CustomerForm extends HTMLElement{

    constructor(){
        super();
        this.render();

    }
    render() {
        this.innerHTML = /* html */`
        <div class="card">
            <h5 class="card-header">Registro de clientes</h5>
            <div class="card-body">
                <div class="container">
                    <div class="row g-3">
                        <div class="col-12">
                            <form id = "frmData">
                                <div class="row g-3">
                                    <div class="col-3">
                                        <label for="fechaRegistro" class="form-label">Fecha registro</label>
                                        <input type="date" class="form-control" id="fechaRegistro" name="fechaRegistro">                  
                                    </div>
                                    <div class="col-3">
                                        <label for="numeroIdentificacion" class="form-label">Documento del Cliente</label>
                                        <input type="text" class="form-control" id="numeroIdentificacion" name="numeroIdentificacion">
                                    </div>
                                    <div class="col-3">
                                        <label for="nombres" clas   s="form-label">Nombres</label>
                                        <input type="text" class="form-control" id="nombres" name="nombres">                  
                                    </div>
                                    <div class="col-3">
                                        <label for="apellidos" class="form-label">Apellidos</label>
                                        <input type="text" class="form-control" id="apellidos" name="apellidos">                  
                                    </div>
                                </div>
                                <div class="row g-3">
                                    <div class="col-4">
                                        <label for="correo" class="form-label">Email cliente</label>
                                        <input type="email" class="form-control" id="correo" name="correo">
                                    </div>
                                    <div class="col-4">
                                        <label for="telefono" class="form-label">telefono</label>
                                        <input type="text" class="form-control" id="telefono" name="telefono">                  
                                    </div>
                                    <div class="col-4">
                                        <label for="CiudadOrigen" class="form-label">CiudadOrigen</label>
                                        <input type="text" class="form-control" id="CiudadOrigen" name="CiudadOrigen">                  
                                    </div>
                                    <div class="col-4">
                                        <label for="PaisOrigen" class="form-label">Pais Origen</label>
                                        <input type="text" class="form-control" id="PaisOrigen" name="PaisOrigen">                  
                                    </div>
                                    <div class="col-4">
                                        <label for="fechaNacimiento" class="form-label">Fecha Nacimiento</label>
                                        <input type="date" class="form-control" id="fechaNacimiento" name="fechaNacimiento">                  
                                    </div>
                                    <div class="container mt-4 text-center" >
                                        <input type="submit" data-accion="POST" class="btn btn-primary" value="Guardar Clientes">
                                    </div>
                                </div>
                            </form>                         
                    </div>
                </div>
            </div>
            </div>
        </div>        
        `
        this.saveData();
    }
    saveData = () =>{
        let myForm = document.querySelector("#frmData");
        myForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            opc[e.submitter.dataset.accion](data)    
        })
    }

}
customElements.define("customer-form",CustomerForm);