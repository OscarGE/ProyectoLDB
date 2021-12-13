import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Product } from 'src/app/models/Product';
import { ProductService } from '../../../../services/product_service/product.service';
import { Sale } from 'src/app/models/Sale';
import { SalesService } from '../../../../services/sales_service/sales.service';
@Component({
  selector: 'app-sell-sales',
  templateUrl: './sell-sales.component.html',
  styleUrls: ['./sell-sales.component.css']
})
export class SellSalesComponent implements OnInit {
  userId=""
  idProduct:any;//Variable que almacena el id del proveedor 
  productGet: any=[];
  form!: FormGroup; //Formulario reactivo 
  providersList:any=[];
  categoriesList:any=[];
  providersIdList:any=[];
  categoriesIdList:any=[];
  customerList:any=[];
  haveSuppliers=false
  editProduct!: Product;
  newSale!: Sale;
  productsLits: any=[];
  iEexceed=false
  constructor(private router: Router, private  route: ActivatedRoute,private formBuilder: FormBuilder, private productService: ProductService, private salesService: SalesService) { 
    this.buildForm();
  }

  ngOnInit(): void {    
    if (localStorage.getItem('sesion')) {
      const sesion = localStorage.getItem('sesion'); 
      let value = " " + sesion + " ";
      this.userId=JSON.parse(value)["id"];
      this.idProduct = this.route.snapshot.paramMap.get('id');
      this.productService.geProduct(this.idProduct)
      .subscribe({
          next: (v) =>  { 
            this.productGet=v
            this.form.controls['name'].setValue(this.productGet.name);
            this.form.controls['description'].setValue(this.productGet.description);
            this.form.controls['price'].setValue("$ "+this.productGet.price);
            this.form.controls['stock'].setValue(this.productGet.stock);
            this.form.controls['id_provider'].setValue(this.productGet.nameProvider);
            this.form.controls['id_category'].setValue(this.productGet.category);
            this.form.controls['amount'].setValue("$ "+this.productGet.price);
            this.form.controls['quantity'].setValue(1);
          },
          error: (e) => {console.log(e)},
          complete: () => console.info('complete')
        })
      this.productService.categoriesList()
      .subscribe({
        next: (v) =>  { 
          for(var i=0; i<Object.keys(JSON.parse(JSON.stringify(v))).length; i++){
            this.categoriesList.push(JSON.parse(JSON.stringify(v))[i].category);
            this.categoriesIdList.push(JSON.parse(JSON.stringify(v))[i].id);
          }
        },
        error: (e) => {console.log(e)},
        complete: () => console.info('complete')
      })
      this.productService.providersList(this.userId)
      .subscribe({
        next: (v) =>  { 
          for(var i=0; i<Object.keys(JSON.parse(JSON.stringify(v))).length; i++){
            this.providersList.push(JSON.parse(JSON.stringify(v))[i].name);
            this.providersIdList.push(JSON.parse(JSON.stringify(v))[i].id);
            this.haveSuppliers=true
          }
        },
        error: (e) => {console.log(e)},
        complete: () => console.info('complete')
      })
      this.productService.getProducts(this.userId)
      .subscribe({
        next: (v) =>  { 
          this.productsLits=v
        },
        error: (e) => {console.log(e)},
        complete: () => console.info('complete')
      })
      this.salesService.getcustomerList(this.userId)
      .subscribe({
        next: (v) =>  { 
          this.customerList=v
          console.log(this.customerList)
        },
        error: (e) => {console.log(e)},
        complete: () => console.info('complete')
      })

    } else {
      location.replace('');
    }
  }

 private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required,Validators.max(9999),Validators.min(0)]],
      id_provider: ['', [Validators.required]],
      id_category : ['', [Validators.required]],
      amount: ['', [Validators.required]],
      quantity: ['', [Validators.required,Validators.max(9999),Validators.min(1)]],
      customer: ['',]
    });
    //Evaluación reactiva
    this.form.valueChanges
    .pipe(
      debounceTime(50)
    )
    .subscribe(value => {
      this.form.controls['amount'].setValue("$ "+(this.productGet.price*value.quantity).toFixed(2))
      if(value.quantity>value.stock){
        this.iEexceed=true
      }else{
        this.iEexceed=false
      }
    }) 
  } 
  
  sendSale(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    const theamount = (this.productGet.price*value.quantity).toFixed(2)
    this.newSale = {
      id_user:parseInt(this.userId),
      id_product:parseInt(this.productGet.id),
      id_provider:parseInt(this.productGet.idProvider),
      customer: value.customer,
      amount: theamount.toString(),
      quantity: value.quantity,
      price: this.productGet.price
    };
    console.log( this.newSale )
    this.salesService.saveSale(this.newSale)
    .subscribe({
      next: (v) => { 
        Swal.fire(
          'Venta registrada con éxito',
          '',
          'success'
        ).then((result) => {
          // location.reload();
          location.replace('../HappyDeal/sales');
        })
      },
      error: (e) => {console.error(e)},
      complete: () => console.info('complete') 
    }) 
  }

}


