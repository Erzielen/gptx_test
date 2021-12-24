import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { personaInterface } from '../../interfaces/person.interface';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent implements OnInit {

  public persona:personaInterface={
    id:              '00001',
    Nombre:          'Alex Adan',
    apellidoPaterno: 'Couto',
    apellidoMaterno: 'Rodriguez',
    Direccion:       'Sauces 16 Getsemani',
    Telefono:         2227725358
}

 

  constructor(private personaService:ServiceService) { 
    
  
  }

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
