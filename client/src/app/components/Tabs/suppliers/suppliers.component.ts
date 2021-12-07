import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('sesion')) {
      //ejecuta sacar info del user 
    } else {
      location.replace('');
    }
  }

}
