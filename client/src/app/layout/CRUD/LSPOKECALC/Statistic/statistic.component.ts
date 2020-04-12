import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { StatisticService } from './../../../../services/CRUD/LSPOKECALC/statistic.service';
import { Statistic } from './../../../../models/LSPOKECALC/Statistic';
import { StatisticTypeService } from './../../../../services/CRUD/LSPOKECALC/statistictype.service';
import { StatisticType } from './../../../../models/LSPOKECALC/StatisticType';


@Component({
   selector: 'app-statistic',
   templateUrl: './statistic.component.html',
   styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
   statistics: Statistic[] = [];
   statisticSelected: Statistic = new Statistic();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   statistic_types: StatisticType[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private statistic_typeDataService: StatisticTypeService,
               private statisticDataService: StatisticService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getStatisticType();
   }

   selectStatistic(statistic: Statistic) {
      this.statisticSelected = statistic;
   }

   getStatisticType() {
      this.statistic_types = [];
      this.statistic_typeDataService.get().then( r => {
         this.statistic_types = r as StatisticType[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getStatistics();
   }

   getStatistics() {
      this.statistics = [];
      this.statisticSelected = new Statistic();
      this.statisticSelected.statistic_type_id = 0;
      this.statisticDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.statistics = r.data as Statistic[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newStatistic(content) {
      this.statisticSelected = new Statistic();
      this.statisticSelected.statistic_type_id = 0;
      this.openDialog(content);
   }

   editStatistic(content) {
      if (typeof this.statisticSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteStatistic() {
      if (typeof this.statisticSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.statisticDataService.delete(this.statisticSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getStatistics();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.statisticDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Statistics.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.statisticDataService.get().then( r => {
         const backupData = r as Statistic[];
         let output = 'id;hp;attack;defense;special_attack;special_defense;speed;statistic_type_id\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.hp + ';' + element.attack + ';' + element.defense + ';' + element.special_attack + ';' + element.special_defense + ';' + element.speed + ';' + element.statistic_type_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Statistics.csv');
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
            this.statisticDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.statisticSelected.id === 'undefined') {
               this.statisticDataService.post(this.statisticSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getStatistics();
               }).catch( e => console.log(e) );
            } else {
               this.statisticDataService.put(this.statisticSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getStatistics();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}