import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }
  onSubmit( form: NgForm )  {
    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.registrar( this.usuario ).subscribe( resp => {
      Swal.close();

      if ( this.recordarme ){
        localStorage.setItem( 'email', this.usuario.email );
      }

      this.router.navigateByUrl('/login');
    }, ( err ) => {
      Swal.fire({
        icon: 'error',
        text: err.error.error.message
      });
    });
  }

}
