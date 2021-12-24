import { Component, OnInit } from '@angular/core';
import {  FormControl,Validators,FormGroup} from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { personaInterface } from '../../interfaces/person.interface';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent implements OnInit {
  

form = new FormGroup({
    id:              new FormControl ('',[Validators.required]),
    nombre:          new FormControl ('',[Validators.required]),
    apellidoPaterno: new FormControl ('',[Validators.required]),
    apellidoMaterno: new FormControl ('',[Validators.required]),
    direccion:       new FormControl ('',[Validators.required]),
    telefono:        new FormControl ('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)])
});

  constructor(private personaService:ServiceService) { }

  ngOnInit(): void {}
  
  onSubmit( ){
    console.log('form',this.form.value);

    if(this.form.invalid){
      Object.values(this.form.controls).forEach(control=>{
      control.markAsTouched();
      });
      return;
    
    }else{

      let persona:personaInterface={
            id:              this.form.value.id,
            nombre:          this.form.value.nombre,
            apellidoPaterno: this.form.value.apellidoPaterno,
            apellidoMaterno: this.form.value.apellidoMaterno,
            direccion:       this.form.value.direccion,
            telefono:        this.form.value.telefono
        }
        console.log('persona',persona);
    
      this.personaService.crearPersona(persona)
      .subscribe(resp=>{
      console.log('se actualizo correctamente',resp);
      });
    }
    

  } 

 
}
