import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { PokemonTypeService } from './../../../../services/CRUD/LSPOKECALC/pokemontype.service';
import { PokemonType } from './../../../../models/LSPOKECALC/PokemonType';

@Component({
   selector: 'app-pokemontype',
   templateUrl: './pokemontype.component.html',
   styleUrls: ['./pokemontype.component.scss']
})
export class PokemonTypeComponent implements OnInit {
   pokemon_types: PokemonType[] = [];
   pokemon_typeSelected: PokemonType = new PokemonType();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private pokemon_typeDataService: PokemonTypeService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectPokemonType(pokemon_type: PokemonType) {
      this.pokemon_typeSelected = pokemon_type;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getPokemonTypes();
   }

   getPokemonTypes() {
      this.pokemon_types = [];
      this.pokemon_typeSelected = new PokemonType();
      this.pokemon_typeDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.pokemon_types = r.data as PokemonType[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newPokemonType(content) {
      this.pokemon_typeSelected = new PokemonType();
      this.openDialog(content);
   }

   editPokemonType(content) {
      if (typeof this.pokemon_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deletePokemonType() {
      if (typeof this.pokemon_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.pokemon_typeDataService.delete(this.pokemon_typeSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getPokemonTypes();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.pokemon_typeDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_PokemonTypes.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.pokemon_typeDataService.get().then( r => {
         const backupData = r as PokemonType[];
         let output = 'id;name\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.name + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_PokemonTypes.csv');
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
            this.pokemon_typeDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.pokemon_typeSelected.id === 'undefined') {
               this.pokemon_typeDataService.post(this.pokemon_typeSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getPokemonTypes();
               }).catch( e => console.log(e) );
            } else {
               this.pokemon_typeDataService.put(this.pokemon_typeSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getPokemonTypes();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}