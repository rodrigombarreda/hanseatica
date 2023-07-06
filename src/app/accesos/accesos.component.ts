import { Component ,OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccesosService } from 'src/app/service/accesos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var window:any

@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit{
  listAccesos: any[] = [];
  duplicar: boolean = false;
  formModal:any;
  formCliente: FormGroup;
  copiarClienteForm: FormGroup;
    constructor(private fb: FormBuilder,
      private toastr: ToastrService,
      private _AccesosService:AccesosService) {
        this.formCliente = this.fb.group({
          nombreCliente: ['',[Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
          paisCliente: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
          sistemaCliente: ['',[Validators.required, Validators.maxLength(15), Validators.minLength(1)]]
        })
        this.copiarClienteForm = this.fb.group({
          nombreClienteOriginal: [{value: '', disabled: true},[Validators.required, Validators.maxLength(20), Validators.minLength(1),]],
          nombreClienteNuevo: [{value: '', disabled: true},[Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
          copiaUsuarios: [],
          idClienteOriginal:[]
        })
    }
    ngOnInit(): void {
      this.obtenerAccesos();
      this.formModal = new window.bootstrap.Modal(
        document.getElementById('modalDuplicar')
      );
    }
    obtenerAccesos() {
      this._AccesosService.getAccesos().subscribe({
        next: (data) => {
          this.listAccesos=data;
      }, error:(error) => {
        console.log(error);
      }})
    }
    crearCliente(){
      this._AccesosService.createCliente(this.formCliente.get('nombreCliente')?.value,this.formCliente.get('paisCliente')?.value,this.formCliente.get('sistemaCliente')?.value).subscribe({
        next: (data) => {
          if (JSON.stringify(data).length===4){
            this.toastr.error('El cliente ya existe','Error')
          }else{
            this.toastr.success('El cliente fue registrado con exito!', 'Cliente registrado');
            this.obtenerAccesos();
          }      

      }, error:(error) => {
        this.toastr.error('Ocurrio un error','Error')
      }})
      }
      eliminarCLiente(id: number) {
        this._AccesosService.deleteCliente(id).subscribe({
          next: (data) => {
            this.toastr.success('El cliente fue eliminado con exito!', 'Cliente eliminado');
            this.obtenerAccesos();
        }, error:(error) => {
          this.toastr.error('No se pudo eliminar el cliente','Error')
        }})
        }
        DuplicarCliente(nombreOriginal: String, id:number) {
          this.formModal.show();
          
          this.copiarClienteForm.patchValue({
            nombreClienteOriginal: nombreOriginal,
            idClienteOriginal:id
          })
        }
        Cerrar() {
          this.duplicar=false;
        }
        duplicarClienteProceso(){
          console.log(this.copiarClienteForm.get('copiaUsuarios')?.value)
          this._AccesosService.duplicateCliente(this.copiarClienteForm.get('idClienteOriginal')?.value,this.copiarClienteForm.get('nombreClienteNuevo')?.value,this.copiarClienteForm.get('copiaUsuarios')?.value).subscribe({
            next: (data) => {
              if (JSON.stringify(data).length!=4){
                this.toastr.error('Error al duplicar cliente','Error')
              }else{
                this.toastr.success('El cliente fue duplicado con exito!', 'Cliente duplicado');
                this.formModal.hide();
                this.obtenerAccesos();
              }      
    
          }, error:(error) => {
            this.toastr.error('Ocurrio un error','Error')
          }})
          }
        }
    