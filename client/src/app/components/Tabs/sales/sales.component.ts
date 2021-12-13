import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from '../../../services/product_service/product.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  userId=""
  productsLits: any=[];
  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('sesion')) {
      const sesion = localStorage.getItem('sesion'); 
      let value = " " + sesion + " ";
      this.userId=JSON.parse(value)["id"];
      this.productService.getProductsStock(this.userId)
      .subscribe({
        next: (v) =>  { 
          this.productsLits=v
        },
        error: (e) => {console.log(e)},
        complete: () => console.info('complete')
      })
    } else {
      location.replace('');
    }
  }
}
