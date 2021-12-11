import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ProductService } from '../../../../services/product_service/product.service';

@Component({
  selector: 'app-see-product',
  templateUrl: './see-product.component.html',
  styleUrls: ['./see-product.component.css']
})
export class SeeProductComponent implements OnInit {
  idProduct:any;//Variable que almacena el id del producto 
  productGet: any=[];
  constructor(private router: Router, private  route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.idProduct = this.route.snapshot.paramMap.get('id');
    console.log(this.idProduct)
    this.productService.geProduct(this.idProduct)
    .subscribe({
        next: (v) =>  { 
          this.productGet=v
          console.log(this.productGet)
        },
        error: (e) => {console.log(e)},
        complete: () => console.info('complete')
      })
  }

}
