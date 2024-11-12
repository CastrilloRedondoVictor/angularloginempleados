import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../models/Empleado';
import { Router } from '@angular/router';
import { EmpleadosaxiosService } from '../../services/empleadosaxios.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  public profile!: Empleado;


  //TRAERME EL SERVICIO Y RECUPERAR EMPLEADO
  constructor(
    // private _empleadosService: EmpleadosService,
    private _empleadosService: EmpleadosaxiosService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.getPerfil()
  }

  getPerfil(): void {
    this._empleadosService.getPerfil().subscribe(response => {
      this.profile = response
    })
  }

  logOut(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/login'])
  }

}
