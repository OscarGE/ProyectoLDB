import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Provider } from 'src/app/models/Provider';
import { ProviderService } from '../../../../services/provider_service/provider.service';

@Component({
  selector: 'app-updata-suppliers',
  templateUrl: './updata-suppliers.component.html',
  styleUrls: ['./updata-suppliers.component.css']
})
export class UpdataSuppliersComponent implements OnInit {
  userId=""
  idProvider:any;//Variable que almacena el id del proveedor 
  providesGet: any=[];
  typeListGet:any=[];
  contactListGet:any=[];
  //Para el menú de opciones de País 
  countryList: string[] = ["Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"];
  //Para el menú de opciones de País 
  typeContactList: string[] = ["Teléfono", "e-mail", "Website", "Facebook", "Twitter", "Instagram"];
  canAddContact=false //Variable que deshabilita el botón de añadir contacto
  @ViewChild('type') type?:ElementRef;
  @ViewChild('contact') contact?:ElementRef;
  typeList:any=[];
  contactList:any=[];
  form!: FormGroup; //Formulario reactivo 
  editProvider!: Provider;
  existeName: boolean = false;
  constructor(private router: Router, private  route: ActivatedRoute, private formBuilder: FormBuilder,private providerService: ProviderService) { 
    this.buildForm();
  }

  ngOnInit(): void {
    if (localStorage.getItem('sesion')) {
      const sesion = localStorage.getItem('sesion'); 
      let value = " " + sesion + " ";
      this.userId=JSON.parse(value)["id"];
      this.idProvider = this.route.snapshot.paramMap.get('id');
      this.providerService.getProvider(this.idProvider)
      .subscribe({
          next: (v) =>  { 
            this.providesGet=v
            this.typeListGet=this.providesGet.type.split(",")
            this.contactListGet=this.providesGet.contact.split(",")
            this.form.controls['name'].setValue(this.providesGet.name);
            this.form.controls['description'].setValue(this.providesGet.description);
            this.form.controls['country'].setValue(this.providesGet.country);
            this.form.controls['state'].setValue(this.providesGet.state);
            this.form.controls['city'].setValue(this.providesGet.city);
            this.form.controls['postal'].setValue(this.providesGet.postal);
            this.form.controls['address'].setValue(this.providesGet.address);
            const typeArray: FormArray = this.form.get('typeList') as FormArray;
            const contactArray: FormArray = this.form.get('contactList') as FormArray;
            for(var i=0;i<this.contactListGet.length;i++){
              typeArray.push(new FormControl(this.typeListGet[i]));
              contactArray.push(new FormControl( this.contactListGet[i]));
            }
             
            this.typeList=this.typeListGet
            this.contactList=this.contactListGet
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
      country: ['', [Validators.required]],
      state: [, [Validators.required]],
      city: ['', [Validators.required]],
      postal: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      address: ['', [Validators.required]],
      type: ['',],
      contact: ['',],
      typeList: new FormArray([], [Validators.required]),
      contactList: new FormArray([], [Validators.required])
    });
    //Evaluación reactiva
    this.form.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      if(value.type=="" || value.contact==""){
        this.canAddContact=false
      }
      else{
        this.canAddContact=true
      }
      //Verificar si existen coincidencias en la base de datos
      if(value.name  && (value.name != this.providesGet.name)){
        this.editProvider = {
          id_user: parseInt(this.userId),
          name: value.name
        };
        this.providerService.verifyProvider(this.editProvider)
        .subscribe({
          next: (v) =>  { 
                if(JSON.parse(JSON.stringify(v)).message =='Existe'){
                  this.existeName=true;
                }else if(JSON.parse(JSON.stringify(v)).message=='No existe'){
                  this.existeName=false;
                }
            },
          error: (e) => {},
          complete: () => console.info('complete')
        })
      }
    })   
  }

  addContact(){
    const typeArray: FormArray = this.form.get('typeList') as FormArray;
    const contactArray: FormArray = this.form.get('contactList') as FormArray;
    typeArray.push(new FormControl(this.form.value.type));
    contactArray.push(new FormControl(this.form.value.contact)); 
    this.canAddContact=false;
    this.typeList.push(this.form.value.type)
    this.contactList.push(this.form.value.contact)
    this.form.get('type')?.setValue("");
    this.form.get('contact')?.setValue("");
    this.type!.nativeElement.value="";
    this.contact!.nativeElement.value="";
  }
  deleteContact(i:number){
    this.typeList.splice(i,1);
    this.contactList.splice(i,1);
    const typeArray: FormArray = this.form.get('typeList') as FormArray;
    const contactArray: FormArray = this.form.get('contactList') as FormArray;
    typeArray.removeAt(i);
    contactArray.removeAt(i);
  }
 
  editprovider(event: Event) {
    event.preventDefault();
    Swal.fire({
      title: '¿Seguro que desea editar a este proveedor?',
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
        this.editProvider = {
          id_user: parseInt(this.userId),
          name: value.name,
          description: value.description,
          country: value.country,
          state: value.state,
          city: value.city,
          postal: value.postal,
          address: value.address,
          type: value.typeList,
          contact: value.contactList
        };
        this.providerService.updateProvider(this.idProvider,this.editProvider)
        .subscribe({
          next: (v) => { 
            Swal.fire(
              'Los nuevos cambios se han efectuado en el proveedor',
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
