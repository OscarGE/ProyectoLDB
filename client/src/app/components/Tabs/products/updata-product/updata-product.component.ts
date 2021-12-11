import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Product } from 'src/app/models/Product';
import { ProductService } from '../../../../services/product_service/product.service';

@Component({
  selector: 'app-updata-product',
  templateUrl: './updata-product.component.html',
  styleUrls: ['./updata-product.component.css']
})
export class UpdataProductComponent implements OnInit {
  userId=""
  idProduct:any;//Variable que almacena el id del proveedor 
  productGet: any=[];
  form!: FormGroup; //Formulario reactivo 
  providersList:any=[];
  categoriesList:any=[];
  providersIdList:any=[];
  categoriesIdList:any=[];
  haveSuppliers=false
  editProduct!: Product;
  productsLits: any=[];
  constructor(private router: Router, private  route: ActivatedRoute,private formBuilder: FormBuilder, private productService: ProductService) { 
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
            this.form.controls['price'].setValue(this.productGet.price);
            this.form.controls['stock'].setValue(this.productGet.stock);
            this.form.controls['id_provider'].setValue(this.productGet.idProvider);
            this.form.controls['id_category'].setValue(this.productGet.idCategory);
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

    } else {
      location.replace('');
    }
  }

 private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required,Validators.pattern("^\\d+([,,.]\\d{1,2})?$")]],
      stock: ['', [Validators.required,Validators.max(9999),Validators.min(0)]],
      id_provider: ['', [Validators.required]],
      id_category : ['', [Validators.required]]
    });
    //Evaluación reactiva
  } 
  
  editproducts(event: Event) {
    event.preventDefault();
    Swal.fire({
      title: '¿Seguro que desea editar este producto?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffc107',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const value = this.form.value;
        this.editProduct = {
          id_user: parseInt(this.userId),
          name: value.name,
          description: value.description,
          price: value.price,
          stock: value.stock,
          id_provider: value.id_provider,
          id_category: value.id_category
        };
        this.productService.updateProduct(this.idProduct,this.editProduct)
        .subscribe({
          next: (v) => { 
            Swal.fire(
              'Los nuevos cambios se han efectuado en el producto',
              '',
              'success'
            ).then((result) => {
              location.reload();
            })
          },
          error: (e) => {console.error(e)},
          complete: () => console.info('complete') 
        })        
      }
    }) 
  }

}

