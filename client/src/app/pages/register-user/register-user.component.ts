import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { User } from 'src/app/models/User';
import { UserService } from '../../services/user_service/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  form!: FormGroup; //Formulario reactivo 
  newUser!: User;
  msjErr="";
  match: boolean = false; //Para encontrar coincidencias en las contraseñas
  existeEmail: boolean = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^\\S*$")]],
      password: ['', [Validators.required, Validators.pattern("^\\S*$")]],
      pass_conf: ['', [Validators.required]],
    });
    //Evaluación reactiva
    this.form.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      //Busca coincidencias en las contraseñas
      if(value.password !='' && value.pass_conf !=''){
        if((value.password != value.pass_conf)){
          this.match=true;
        }else{
          this.match=false;
        }
      }
      else{
        this.match=false;
      }
      //Verificar si existen coincidencias en la base de datos
      if(value.email){
        this.userService.verifyEmail(value.email)
        .subscribe({
          next: (v) =>  { 
                if(JSON.parse(JSON.stringify(v)).message =='Existe'){
                  this.existeEmail=true;
                }else if(JSON.parse(JSON.stringify(v)).message=='No existe'){
                  this.existeEmail=false;
                }
            },
          error: (e) => {},
          complete: () => console.info('complete')
        })
      }
    })

  }

  senduser(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.newUser = {
      email: value.email,
      password: value.password,
    };

    this.userService.saveUser(this.newUser)
      .subscribe({
        next: (v) => { 
          Swal.fire(
            'Cuenta creada con éxito',
            'gracias y bienvenido a HAPPY DEAL',
            'success'
          ).then((result) => {
            this.newUser = v;
            localStorage.setItem('sesion', JSON.stringify(this.newUser));
            location.replace('../HappyDeal');
          })
        },
        error: (e) => {console.error(e)},
        complete: () => console.info('complete') 
      })
  }

}
