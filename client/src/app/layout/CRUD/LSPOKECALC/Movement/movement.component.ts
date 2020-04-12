import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { MovementService } from './../../../../services/CRUD/LSPOKECALC/movement.service';
import { Movement } from './../../../../models/LSPOKECALC/Movement';

@Component({
   selector: 'app-movement',
   templateUrl: './movement.component.html',
   styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit {
   movements: Movement[] = [];
   movementSelected: Movement = new Movement();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private movementDataService: MovementService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectMovement(movement: Movement) {
      this.movementSelected = movement;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getMovements();
   }

   getMovements() {
      this.movements = [];
      this.movementSelected = new Movement();
      this.movementDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.movements = r.data as Movement[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newMovement(content) {
      this.movementSelected = new Movement();
      this.openDialog(content);
   }

   editMovement(content) {
      if (typeof this.movementSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteMovement() {
      if (typeof this.movementSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.movementDataService.delete(this.movementSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getMovements();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.movementDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Movements.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.movementDataService.get().then( r => {
         const backupData = r as Movement[];
         let output = 'id;name;effect;power;accurancy\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.name + ';' + element.effect + ';' + element.power + ';' + element.accurancy + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Movements.csv');
      }).catch( e => console.log(e) );
   }

   decodeUploadFile(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            const fileBytes = reader.result.toString().split(',')[1];
            const newData = JSON.parse(decodeURIComponent(escape(atob(fileBytes)))) as any[];
            this.movementDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.movementSelected.id === 'undefined') {
               this.movementDataService.post(this.movementSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getMovements();
               }).catch( e => console.log(e) );
            } else {
               this.movementDataService.put(this.movementSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getMovements();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}