import { Component, OnInit } from '@angular/core';
import { NgForm,FormControl,FormGroup,Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { personaInterface } from '../../interfaces/person.interface';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent implements OnInit {
  // form:FormGroup;
  

  public persona:personaInterface={
    id:              ' ',
    Nombre:          ' ',
    apellidoPaterno: ' ',
    apellidoMaterno: ' ',
    Direccion:       ' ',
    Telefono:        555555 
}




  constructor(private personaService:ServiceService) {  }

  ngOnInit(): void {
  }
  guardar( form: NgForm ){
    if(form.invalid){
      console.log('formulario no valido');
      return;
    }
    // console.log(form);
    // console.log(this.persona);

    if(this.persona.id){
      this.personaService.actualizarPersona(this.persona)
      .subscribe(resp=>{
       console.log(resp);

      });

    }else{
      this.personaService.crearPersona(this.persona)
      .subscribe(resp=>{
      console.log(resp);
      
      });
    }
    

  }

}
