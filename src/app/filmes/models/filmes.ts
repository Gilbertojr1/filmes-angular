import { Observable } from 'rxjs';

export interface Filme extends Observable<Filmes> {}

export interface Filmes {
  id: string;
  nome: string;
  data_lancamento?: Date;
  diretor: string;
  duracao: number;
  sinopse: string;
  estudio: object;
  categoria: object;
}

export interface FilmesAPI {
  payload: Filme;
}
