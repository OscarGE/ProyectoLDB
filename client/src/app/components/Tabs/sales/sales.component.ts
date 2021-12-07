import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor() {
    if (localStorage.getItem('sesion')) {
      //ejecuta sacar info del user 
    } else {
      location.replace('');
    }
  }

  ngOnInit(): void {

  }
}
