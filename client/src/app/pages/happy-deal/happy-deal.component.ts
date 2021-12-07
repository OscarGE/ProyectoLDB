import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-happy-deal',
  templateUrl: './happy-deal.component.html',
  styleUrls: ['./happy-deal.component.css']
})
export class HappyDealComponent implements OnInit {

  user!: User;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    if (localStorage.getItem('sesion')) {
      //ejecuta sacar info del user 
    } else {
      location.replace('');
    }
  }



}
