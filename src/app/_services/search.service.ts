import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable}  from 'rxjs/Rx';

@Injectable()

export class SearchService {

  url: string
  constructor(private http : Http) {
    this.url = 'http://localhost:3000/api/search?ml='
   }

   search_word(term){
     return this.http.get(this.url + term).map(
       res => {
         return res.json().map(item => {
           return item.pseudo
         })
       }
     )
   }
}
