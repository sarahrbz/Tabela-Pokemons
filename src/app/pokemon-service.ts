import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable, range, toArray } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> {
    return range(1, 168).pipe(
      mergeMap(id => this.http.get<Pokemon>(`${this.apiUrl}/${id}`)),
      toArray()
    );
  }
}
