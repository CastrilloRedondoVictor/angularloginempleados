import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../models/Empleado';
import { EmpleadosaxiosService } from '../../services/empleadosaxios.service';

@Component({
  selector: 'app-subordinados',
  templateUrl: './subordinados.component.html',
  styleUrl: './subordinados.component.css'
})
export class SubordinadosComponent implements OnInit {

  public subordinados!: Empleado[];


  constructor(
    // private _empleadosService: EmpleadosService,
    private _empleadosService: EmpleadosaxiosService,
  ){}

  ngOnInit(): void {
    this._empleadosService.getSubordinados().subscribe( response => {
      this.subordinados = response
    })
  }
}
