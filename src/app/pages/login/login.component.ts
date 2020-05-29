import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
    }
  }
  
  login( form: NgForm ){
    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    });
    Swal.showLoading();

    this.auth.login( this.usuario ).subscribe( resp => {
      Swal.close();

      if ( this.recordarme ) {
        localStorage.setItem( 'email', this.usuario.email );
      }
      console.log(resp);
      this.router.navigateByUrl('/home');
    }, (err) => {
      Swal.fire({
        icon: 'error',
        text: err.error.error.message,
        title: 'Error al autenticar'
      });
    });
  }

}
