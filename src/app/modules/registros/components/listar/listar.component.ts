import { Component } from '@angular/core';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent {

  constructor() { }

  public elementos = [
    { id: 1, name: 'Elemento 1' },
    { id: 2, name: 'Elemento 2' },
    { id: 3, name: 'Elemento 3' },
    { id: 4, name: 'Elemento 4' },
    { id: 5, name: 'Elemento 5' },
    { id: 6, name: 'Elemento 6' },
    { id: 7, name: 'Elemento 7' },
    { id: 8, name: 'Elemento 8' },
    { id: 9, name: 'Elemento 9' },
    { id: 10, name: 'Elemento 10' },
  ];

}
