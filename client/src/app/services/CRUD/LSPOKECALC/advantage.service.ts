import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { Advantage } from './../../../models/LSPOKECALC/Advantage';

@Injectable({
   providedIn: 'root'
})
export class AdvantageService {

   url = environment.api_lspokecalc + 'advantage/';
   options = {headers: null};

   constructor(private http: HttpClient, private router: Router) {
      this.options.headers = new HttpHeaders({'api_token': sessionStorage.getItem('api_token')});
   }

   get(id?: number): Promise<any> {
      if (typeof id === 'undefined') {
         return this.http.get(this.url, this.options).toPromise()
         .then( r => {
            return r;
         }).catch( error => { this.handledError(error);  });
      }
      return this.http.get(this.url + '?id=' + id.toString(), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   get_paginate(size: number, page: number): Promise<any> {
      return this.http.get(this.url + 'paginate?size=' + size.toString() + '&page=' + page.toString(), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error);  });
   }

   delete(id: number): Promise<any> {
      return this.http.delete(this.url + '?id=' + id.toString(), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   getBackUp(): Promise<any> {
      return this.http.get(this.url + 'backup', this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   post(advantage: Advantage): Promise<any> {
      return this.http.post(this.url, JSON.stringify(advantage), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   put(advantage: Advantage): Promise<any> {
      return this.http.put(this.url, JSON.stringify(advantage), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   masiveLoad(data: any[]): Promise<any> {
      return this.http.post(this.url + 'masive_load', JSON.stringify({data: data}), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   handledError(error: any) {
      console.log(error);
      sessionStorage.clear();
      this.router.navigate(['/login']);
   }
}