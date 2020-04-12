import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { NatureService } from './../../../../services/CRUD/LSPOKECALC/nature.service';
import { Nature } from './../../../../models/LSPOKECALC/Nature';

@Component({
   selector: 'app-nature',
   templateUrl: './nature.component.html',
   styleUrls: ['./nature.component.scss']
})
export class NatureComponent implements OnInit {
   natures: Nature[] = [];
   natureSelected: Nature = new Nature();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private natureDataService: NatureService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectNature(nature: Nature) {
      this.natureSelected = nature;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getNatures();
   }

   getNatures() {
      this.natures = [];
      this.natureSelected = new Nature();
      this.natureDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.natures = r.data as Nature[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newNature(content) {
      this.natureSelected = new Nature();
      this.openDialog(content);
   }

   editNature(content) {
      if (typeof this.natureSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteNature() {
      if (typeof this.natureSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.natureDataService.delete(this.natureSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getNatures();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.natureDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Natures.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.natureDataService.get().then( r => {
         const backupData = r as Nature[];
         let output = 'id;name\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.name + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Natures.csv');
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
            this.natureDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.natureSelected.id === 'undefined') {
               this.natureDataService.post(this.natureSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getNatures();
               }).catch( e => console.log(e) );
            } else {
               this.natureDataService.put(this.natureSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getNatures();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}