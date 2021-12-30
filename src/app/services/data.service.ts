import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map ,delay } from 'rxjs/operators';

import { personaInterface } from '../interfaces/person.interface';


@Injectable({
  providedIn: 'root'
})

export class dataService {
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

    //  delete personaTemp.id; 
    console.log('Persona sin ID',personaTemp);
    
    return this.http.put(`${ this.url }/persona/${ persona.id }.json`,personaTemp);
  }

  borrarPersona(id:string){
    return this.http.delete(`${this.url}/persona/${ id }.json`);
  }


  getPersonas():Observable <personaInterface[]>{

    return this.http.get<personaInterface[]>(`${ this.url }/persona.json`)
    .pipe(
      map(
         resp=> this.arreglo(resp),
         delay(1500)
      )
    );
  }
  
  getPersona(id:string | null){
    return this.http.get(`${this.url}/persona/${ id }.json`);
  }

   
  private arreglo(persObj: any){

    const personas:personaInterface[]=[];
    if(persObj === null) {
       return []; } 
    console.log('respuesta del get', persObj);


    Object.keys (persObj).forEach( key =>{

      const persona: personaInterface  = persObj [ key ];     
      persona.id=key; 
      personas.push(persona)
    });
    return personas;
  }

}
