import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { AdvantageService } from './../../../../services/CRUD/LSPOKECALC/advantage.service';
import { Advantage } from './../../../../models/LSPOKECALC/Advantage';

@Component({
   selector: 'app-advantage',
   templateUrl: './advantage.component.html',
   styleUrls: ['./advantage.component.scss']
})
export class AdvantageComponent implements OnInit {
   advantages: Advantage[] = [];
   advantageSelected: Advantage = new Advantage();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private advantageDataService: AdvantageService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectAdvantage(advantage: Advantage) {
      this.advantageSelected = advantage;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getAdvantages();
   }

   getAdvantages() {
      this.advantages = [];
      this.advantageSelected = new Advantage();
      this.advantageDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.advantages = r.data as Advantage[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newAdvantage(content) {
      this.advantageSelected = new Advantage();
      this.openDialog(content);
   }

   editAdvantage(content) {
      if (typeof this.advantageSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteAdvantage() {
      if (typeof this.advantageSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.advantageDataService.delete(this.advantageSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getAdvantages();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.advantageDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Advantages.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.advantageDataService.get().then( r => {
         const backupData = r as Advantage[];
         let output = 'id;pokemon_type_id_owner;pokemon_type_id_enemy;factor\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.pokemon_type_id_owner + ';' + element.pokemon_type_id_enemy + ';' + element.factor + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Advantages.csv');
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
            this.advantageDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.advantageSelected.id === 'undefined') {
               this.advantageDataService.post(this.advantageSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getAdvantages();
               }).catch( e => console.log(e) );
            } else {
               this.advantageDataService.put(this.advantageSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getAdvantages();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}