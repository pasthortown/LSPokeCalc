import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { StatisticTypeService } from './../../../../services/CRUD/LSPOKECALC/statistictype.service';
import { StatisticType } from './../../../../models/LSPOKECALC/StatisticType';

@Component({
   selector: 'app-statistictype',
   templateUrl: './statistictype.component.html',
   styleUrls: ['./statistictype.component.scss']
})
export class StatisticTypeComponent implements OnInit {
   statistic_types: StatisticType[] = [];
   statistic_typeSelected: StatisticType = new StatisticType();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private statistic_typeDataService: StatisticTypeService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectStatisticType(statistic_type: StatisticType) {
      this.statistic_typeSelected = statistic_type;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getStatisticTypes();
   }

   getStatisticTypes() {
      this.statistic_types = [];
      this.statistic_typeSelected = new StatisticType();
      this.statistic_typeDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.statistic_types = r.data as StatisticType[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newStatisticType(content) {
      this.statistic_typeSelected = new StatisticType();
      this.openDialog(content);
   }

   editStatisticType(content) {
      if (typeof this.statistic_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteStatisticType() {
      if (typeof this.statistic_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.statistic_typeDataService.delete(this.statistic_typeSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getStatisticTypes();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.statistic_typeDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_StatisticTypes.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.statistic_typeDataService.get().then( r => {
         const backupData = r as StatisticType[];
         let output = 'id;name\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.name + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_StatisticTypes.csv');
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
            this.statistic_typeDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.statistic_typeSelected.id === 'undefined') {
               this.statistic_typeDataService.post(this.statistic_typeSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getStatisticTypes();
               }).catch( e => console.log(e) );
            } else {
               this.statistic_typeDataService.put(this.statistic_typeSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getStatisticTypes();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}