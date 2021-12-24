import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { personaInterface } from '../interfaces/person.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  

  private url='https://fir-project-45506-default-rtdb.firebaseio.com';

  constructor( private http:HttpClient) { }

  crearPersona( persona:personaInterface ){
    return this.http.post(`${ this.url }/persona.json`, persona)
    .pipe(
      map (( resp:any )=>{
        persona.id=resp.name;
        return persona;         
        })
    );
  }
  actualizarPersona ( persona:personaInterface ){
    const personaTemp ={
      ...persona
    };
    
    // delete personaTemp.id;

    

    return this.http.put(`${ this.url }/persona/${persona.id}.json`,personaTemp);


  }
}
