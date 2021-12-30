import { Component, OnInit } from '@angular/core';
import { FormControl,Validators,FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


import { dataService } from 'src/app/services/data.service';
import { personaInterface } from '../../interfaces/person.interface';

import { Observable } from 'rxjs';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent implements OnInit {

  
  

form = new FormGroup({
    id:              new FormControl (''),
    nombre:          new FormControl ('',[Validators.required,Validators.minLength(2)]),
    apellidoPaterno: new FormControl ('',[Validators.required,Validators.minLength(2)]),
    apellidoMaterno: new FormControl ('',[Validators.required,Validators.minLength(2)]),
    direccion:       new FormControl ('',[Validators.required]),
    telefono:        new FormControl ('',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])
});


//  persona:personaInterface={
//   id:              this.form.value.id,
//   nombre:          this.form.value.nombre,
//   apellidoPaterno: this.form.value.apellidoPaterno,
//   apellidoMaterno: this.form.value.apellidoMaterno,
//   direccion:       this.form.value.direccion,
//   telefono:        this.form.value.telefono
// };

 

  constructor(private personaService:dataService,
              private  route: ActivatedRoute) { }

  ngOnInit(): void {
    
    const id= this.route.snapshot.paramMap.get('id');


    if (id !== 'nuevo'){
      this.personaService.getPersona( id )
      .subscribe((resp:any) =>
        {
          this.form.setValue({
            
            id:   id,
            nombre: resp.nombre,
            apellidoPaterno: resp.apellidoPaterno,
            apellidoMaterno: resp.apellidoMaterno,
            direccion: resp.direccion,
            telefono:resp.telefono

          })         
        });
    }
  }


  
  onSubmit( form:FormGroup ){



    // console.log('form',form.value);

    if(form.invalid){
      // Object.values(this.form.controls).forEach(control=>{
      // control.markAsTouched();
      console.log('Formulario invalido',form);
      Swal.fire({
        title: 'Formulario invalido',
        text: 'Verifique sus datos',
        icon:'warning'

      });
        return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable <any>;

    let persona:personaInterface={
      id:              form.value.id,
      nombre:          form.value.nombre,
      apellidoPaterno: form.value.apellidoPaterno,
      apellidoMaterno: form.value.apellidoMaterno,
      direccion:       form.value.direccion,
      telefono:        form.value.telefono
    };
      

        if (persona.id) {
          peticion=this.personaService.actualizarPersona(persona);

          

      // .subscribe(resp=>{
      // console.log('se actualizo correctamente',resp);
      // });          
  
        } else {
         peticion=this.personaService.crearPersona(persona);
      // .subscribe(resp=>{
      // form.value.id=persona.id;
      // console.log('se guardo correctamente',resp);
      // });    
        }
        
    
        peticion.subscribe( resp => {

          Swal.fire({
            title: persona.nombre,
            text: 'Se actualizó correctamente',
            icon:'success'
            
          }).then(resp=>{
            if ( resp.isConfirmed ){
              location.assign('/dashboard');
            }
          });
    
        });
    
    

  } 

 
}
