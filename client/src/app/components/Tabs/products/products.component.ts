import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Product } from 'src/app/models/Product';
import { ProductService } from '../../../services/product_service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  userId=""
  isformShow=false //Para determinar si se muestra o no el formulario
  form!: FormGroup; //Formulario reactivo 
  providersList:any=[];
  categoriesList:any=[];
  providersIdList:any=[];
  categoriesIdList:any=[];
  haveSuppliers=false
  newProduct!: Product;
  productsLits: any=[];
  constructor(private formBuilder: FormBuilder, private productService: ProductService) { 
    this.buildForm();
  }

  ngOnInit(): void {    
    if (localStorage.getItem('sesion')) {
      const sesion = localStorage.getItem('sesion'); 
      let value = " " + sesion + " ";
      this.userId=JSON.parse(value)["id"];
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
  
  showForm(){
    if(this.isformShow){
      this.isformShow=false
    }else{
      this.isformShow=true
    }
  }
  deleteProduct(id: string){
    Swal.fire({
      title: '¿Seguro que desea eliminar este producto?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id)
        .subscribe({
          next: (v) =>  { 
            Swal.fire(
              'Eliminado',
              'El producto ha sido eliminado del registro',
              'success'
            ).then(() => {
              location.reload();
            });     
          },
          error: (e) => {},
          complete: () => console.info('complete')
        })
        
      }
    }) 
  }
  sendproducts(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.newProduct = {
      id_user: parseInt(this.userId),
      name: value.name,
      description: value.description,
      price: value.price,
      stock: value.stock,
      id_provider: value.id_provider,
      id_category: value.id_category
    };
    this.productService.saveProduct(this.newProduct)
    .subscribe({
      next: (v) => { 
        Swal.fire(
          'Proveedor registrado con éxito',
          '',
          'success'
        ).then((result) => {
          this.isformShow=false
          location.reload();

        })
      },
      error: (e) => {console.error(e)},
      complete: () => console.info('complete') 
    })
  }

}
