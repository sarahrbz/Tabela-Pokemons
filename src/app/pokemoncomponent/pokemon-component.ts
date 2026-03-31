import { PokemonService } from './../pokemon-service';
import { Pokemon } from './../pokemon';
import { Component, computed, OnInit, signal } from '@angular/core';


@Component({
  selector: 'app-pokemon-component',
  standalone: false,
  templateUrl: './pokemon-component.html',
  styleUrl: './pokemon-component.css',
})
export class PokemonComponent implements OnInit{
  pokemons = signal<Pokemon[]>([]); // todos os pokemons serão guardados aqui

  paginaAtual = signal(1);
  itensPorPagina = 10;

  pokemonsPaginados = computed(() => {
    const inicio = (this.paginaAtual() - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;

    return this.pokemons().slice(inicio, fim);
  });

  constructor(private service: PokemonService) {} //injetando o serviço getpokemons()

  ngOnInit(): void {
    this.service.getPokemons().subscribe(
      {
        next: json => this.pokemons.set(json)
      }
    )
  }
  totalPaginas = computed(() => {
  return Math.ceil(this.pokemons().length / this.itensPorPagina);
  });

  proximaPagina(){
    if (this.paginaAtual() < this.totalPaginas()) {
    this.paginaAtual.set(this.paginaAtual() + 1);
  }
  }

  paginaAnterior(){
    if(this.paginaAtual() > 1) {
      this.paginaAtual.set(this.paginaAtual() - 1);
    }
  }

}
