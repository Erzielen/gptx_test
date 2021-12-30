import { Component, OnInit } from '@angular/core';
import { dataService } from '../../services/data.service';
import { personaInterface } from '../../interfaces/person.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})

export class DashboardComponent implements OnInit {
  cargando=false;
  personas:personaInterface[]=[];

  constructor( private personaService: dataService) { }

  ngOnInit(): void {
    this.cargando=true;

    this.personaService.getPersonas()
    .subscribe(resp=>{
      console.log(resp);
      this.personas=resp;
      this.cargando=false;
    });
  }
  
  borrarPersona(persona: personaInterface , i:number ){
    Swal.fire({
      title:'Esta Seguro?',
      text:`Estas seguro de borrar a ${persona.nombre}`,
      icon: 'warning',
      showConfirmButton:true,
      timer:1500,
      showCancelButton:true
  }).then( resp=>{
  if(resp.isConfirmed){
    // this.personas.slice(i,1);
    this.personaService.borrarPersona( persona.id ).subscribe(resp=>{
      this.personaService.getPersonas()
      window.location.reload();

    });
    // delay(5000)
    // window.location.reload();  
  }
  
    });
  }
}
