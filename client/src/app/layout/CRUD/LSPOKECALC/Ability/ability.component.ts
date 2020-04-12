import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { AbilityService } from './../../../../services/CRUD/LSPOKECALC/ability.service';
import { Ability } from './../../../../models/LSPOKECALC/Ability';

@Component({
   selector: 'app-ability',
   templateUrl: './ability.component.html',
   styleUrls: ['./ability.component.scss']
})
export class AbilityComponent implements OnInit {
   abilities: Ability[] = [];
   abilitySelected: Ability = new Ability();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private abilityDataService: AbilityService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectAbility(ability: Ability) {
      this.abilitySelected = ability;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getAbilities();
   }

   getAbilities() {
      this.abilities = [];
      this.abilitySelected = new Ability();
      this.abilityDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.abilities = r.data as Ability[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newAbility(content) {
      this.abilitySelected = new Ability();
      this.openDialog(content);
   }

   editAbility(content) {
      if (typeof this.abilitySelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteAbility() {
      if (typeof this.abilitySelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.abilityDataService.delete(this.abilitySelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getAbilities();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.abilityDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Abilities.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.abilityDataService.get().then( r => {
         const backupData = r as Ability[];
         let output = 'id;name;description\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.name + ';' + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Abilities.csv');
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
            this.abilityDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.abilitySelected.id === 'undefined') {
               this.abilityDataService.post(this.abilitySelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getAbilities();
               }).catch( e => console.log(e) );
            } else {
               this.abilityDataService.put(this.abilitySelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getAbilities();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}