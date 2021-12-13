import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/models/Sale';
import { SalesService } from '../../../services/sales_service/sales.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  userId=""
  saleList: any=[];
  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    if (localStorage.getItem('sesion')) {
      const sesion = localStorage.getItem('sesion'); 
      let value = " " + sesion + " ";
      this.userId=JSON.parse(value)["id"];
      this.salesService.getSales(this.userId)
      .subscribe({
        next: (v) =>  { 
          this.saleList = v
        },
        error: (e) => {console.log(e)},
        complete: () => console.info('complete')
      })
    } else {
      location.replace('');
    }
  }
}

