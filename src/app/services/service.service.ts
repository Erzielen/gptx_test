import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { personaInterface } from '../interfaces/person.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  //Servicio SQL Firebase
  private url='https://fir-project-45506-default-rtdb.firebaseio.com';

  constructor( private http:HttpClient) { }
  
  //Funcion para crear una nueva persona
  crearPersona( persona:personaInterface ){
    return this.http.post(`${ this.url }/persona.json`, persona)
    .pipe(
      map (( resp:any )=>{
        persona.id=resp.name;
        return persona;         
        })
    );
  }
   //Funcion para  editar una  persona
  actualizarPersona ( persona:personaInterface ){
    const personaTemp ={
      ...persona
    };
    delete personaTemp.id;
    console.log('Persona temporal sin ID',personaTemp);
    return this.http.put(`${ this.url }/persona/${ persona.id }.json`,personaTemp);
  }
}
