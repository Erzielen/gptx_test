import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  termino:string='hola mundo';

  constructor() { }

  

  ngOnInit(): void {
  }
  search(){
    console.log(this.termino);
  }

}
