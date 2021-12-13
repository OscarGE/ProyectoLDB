import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from '../../../services/product_service/product.service';
import { SalesService } from '../../../services/sales_service/sales.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  userId=""
  productsList: any=[];
  saleList: any=[];
  constructor(private productService: ProductService, private salesService: SalesService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('sesion')) {
      const sesion = localStorage.getItem('sesion'); 
      let value = " " + sesion + " ";
      this.userId=JSON.parse(value)["id"];
      this.productService.getProductsStock(this.userId)
      .subscribe({
        next: (v) =>  { 
          this.productsList=v
        },
        error: (e) => {console.log(e)},
        complete: () => console.info('complete')
      })
      this.salesService.getSalesToday(this.userId)
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
